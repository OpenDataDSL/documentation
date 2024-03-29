---
slug: /tutorials/gettingstarted1sql
title: Subscribing to Data-Feeds - Part 2
description: Feed to SQL Server
sidebar_position: 3
tags:
  - tutorial
  - subscription
  - getting-started
  - sql
---

## Introduction

This tutorial is the 2nd part of a tutorial on subscribing to data and integrating that data into another system.

In this part, we will write a client side C# application to listen for those messages and load the data into a local SQL Server

## Prerequisites

### User requirements

This tutorial assumes some familiarity with coding in c# in Microsoft Visual Studio and OpenDataDSL in Visual Studio Code.

### System requirements

You will need to have the following:

* Completed [Part 1](/docs/tutorials/gettingstarted1)
* An account with OpenDataDSL    
* Microsoft Visual Studio    
* Microsoft VS Code with the [OpenDataDSL extension](/docs/user/vscode)    
* Microsoft SQL Server (any edition)

### Recap
In [Part 1](/docs/tutorials/gettingstarted1) we:
* Created a queue which will hold the OpenDataDSL subscription messages
* Created a subscription to some data
* Manually triggered the subscription to place some data in the queue 

## Create the SQL Server data loader

This next step requires us to write a console application in C# using Visual Studio which performs the following tasks:

*   Connects to our local SQL Server database    
*   Listens for messages on our queue    
*   Transforms the message data into SQL statements and loads the data
    

### Create the SQL table

We need to create a table in our SQL Server database where we are going to place the data, for this we are creating a simple table with just 4 columns:

*   base - The base currency    
*   currency - The exchange currency    
*   index - The date index for the exchange currency rate    
*   value - The currency exchange rate
    

We need to create a constraint on the base, currency and index columns to ensure we only have 1 value for a day.

The other things we are adding:

*   A custom table value type for passing the entire set of data to the stored procedure    
*   A stored procedure to handle the inserting or updating of data.
    

Here are the SQL commands we can use to create our database (ODSL) and table (FX), run this in SQL Server Management Studio:

```sql
USE [master]
GO

CREATE DATABASE [ODSL]
GO

USE [ODSL]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[FX](
[base] varchar(3) NOT NULL,
[currency] varchar(3) NOT NULL,
[index] datetime NOT NULL,
[value] decimal(15,6) NOT NULL,
CONSTRAINT [CurrencyPairDate] UNIQUE NONCLUSTERED
(
  [base], [currency], [index]
))
GO

CREATE TYPE FXRates AS TABLE (
[base] varchar(3),
[currency] varchar(3),
[index] datetime,
[value] decimal(15,6)
)
GO

CREATE PROCEDURE dbo.InsertOrUpdateFXRates
       @Rates FXRates READONLY
AS BEGIN
	DECLARE
		@Base varchar(3),
		@Currency varchar(3),
		@Index datetime,
		@Value decimal(15,6)
		
	DECLARE
		FXValues CURSOR FOR SELECT [base],[currency],[index],[value] from @Rates

	OPEN FXValues
	WHILE 1 = 1
	BEGIN
		FETCH NEXT FROM FXValues INTO @Base, @Currency, @Index, @Value
		IF @@FETCH_STATUS = -1 BREAK;

		IF NOT EXISTS (SELECT * FROM dbo.FX WHERE [base] = @Base AND [currency] = @Currency AND [index] = @Index)
		   INSERT INTO dbo.FX([base], [currency], [index], [value])
		   VALUES (@Base, @Currency, @Index, @Value)
		ELSE
		   UPDATE dbo.FX
		   SET [value] = @Value
		   WHERE [base] = @Base AND [currency] = @Currency AND [index] = @Index
	END
	CLOSE FXValues
	DEALLOCATE FXValues
END
GO
```

### Create the C# project

Open Microsoft Visual Studio and create a new .NET Core Console Application

![](/attachments/335511553/335609895.png)

I’ve called my project odsl-sql-loader, but feel free to choose any name you like

![](/attachments/335511553/335609901.png)

I’ve selected .NET Core 5.0 as the target

![](/attachments/335511553/335544364.png)

### Add configuration properties

Once the project is created, we want to add a location to store our configuration properties that will be used to configure the data loader.

Add a JSON file called **appsettings.json** to the root of the project

![](/attachments/335511553/335609915.png)

In this file we need to add the following:
```json
{
  "connectionStrings": {
    "sqlserver": "Server=localhost;Database=ODSL;Trusted_Connection=True;",
    "serviceBus": "Endpoint=sb://sb-odsl.servicebus.windows.net/ -- rest omitted ---"
  },
  "queueName": "prod/com_example/tutorial"
}
```

:::note
You will need to copy the connection settings from your queue configuration information above and check that the SQL server connection matches your local name. The queueName will also need to match your tenant information and queue name
:::

:::note
In order to run the application in Visual Studio, you will need to ensure that the appsettings.json file is copied to the output directory, this can be done by setting a property on the file as shown below
:::

![](/attachments/335511553/338362430.png)

### Configure the data loader

In order to use the configuration information we need to add the following packages using NuGet:

![](/attachments/335511553/335511595.png)

Change our program.cs to the following to read the configuration file:

```CS
using Microsoft.Extensions.Configuration;
using System;
using System.IO;
using System.Threading.Tasks;

namespace odsl_sql_loader
{
    class Program
    {
        private IConfiguration Configuration;

        static async Task Main()
        {
            Program p = new Program();
            p.Init();            
        }
        void Init()
        {
            // Build configuration
            Configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetParent(AppContext.BaseDirectory).FullName)
                .AddJsonFile("appsettings.json", false)
                .Build();
        }
    }
}
```

:::note
You will see a warning about using async in the Main method, ignore this as we will eventually use it
:::

### Create the SQL destination class

We now need to add a new class to our project call **SQLDestination.cs**, this will process the message and load the data into SQL Server.

In order to write to SQL Server, we need to add the following package using NuGet:

![](/attachments/335511553/338427943.png)

Replace the code in **SQLDestination.cs** with the following code:

```cs
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using System;
using System.Data;

namespace odsl_sql_loader
{
    public class SQLDestination
    {
        IConfiguration configuration;
        public SQLDestination(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public void WriteMessage(String message)
        {
            using (SqlConnection connection = new SqlConnection(configuration["connectionStrings:sqlserver"]))
            {
                connection.Open();
                using (SqlCommand command = connection.CreateCommand())
                {
                    command.CommandText = "dbo.InsertOrUpdateFXRates";
                    command.CommandType = CommandType.StoredProcedure;
                    SqlParameter parameter = command.Parameters
                                      .AddWithValue("@Rates", CreateDataTable(message));
                    parameter.SqlDbType = SqlDbType.Structured;
                    parameter.TypeName = "dbo.FXRates";

                    command.ExecuteNonQuery();
                }
            }
        }

        public DataTable CreateDataTable(String message)
        {
            DataTable table = new DataTable();
            table.Columns.Add("base", typeof(String));
            table.Columns.Add("currency", typeof(String));
            table.Columns.Add("index", typeof(DateTime));
            table.Columns.Add("value", typeof(Decimal));

            dynamic data = JObject.Parse(message);
            foreach (dynamic ccy in data.status)
            {
                string fxbase = "EUR";
                string fxccy = ccy.Name;
                foreach (dynamic values in ccy.Value.tenors)
                {
                    DateTime fxindex = values.time;
                    Decimal fxvalue = values.value;
                    table.Rows.Add(fxbase, fxccy, fxindex, fxvalue);
                }
            }
            return table;
        }
    }
}
```

### Create the queue source class

We now need to add a new class to our project called **QueueSource.cs**, this will listen for new messages on our sql queue and process them.

In order to read from the queue, we need to add the following package using NuGet:

![](/attachments/335511553/335544380.png)

Replace the code in **QueueSource.cs** with the following code:

```cs
using Azure.Messaging.ServiceBus;
using Microsoft.Extensions.Configuration;
using System;
using System.Threading.Tasks;

namespace odsl_sql_loader
{
    public class QueueSource
    {
        private IConfiguration Configuration;
        private SQLDestination SQL;
        public QueueSource(IConfiguration Configuration)
        {
            this.Configuration = Configuration;
            SQL = new SQLDestination(Configuration);
        }
        public async Task ReceiveMessagesAsync()
        {
            await using (ServiceBusClient client = new ServiceBusClient(Configuration["connectionStrings:serviceBus"]))
            {
                // create a processor that we can use to process the messages
                ServiceBusProcessor processor = client.CreateProcessor(Configuration["queueName"], new ServiceBusProcessorOptions());

                // add handler to process messages
                processor.ProcessMessageAsync += MessageHandler;

                // add handler to process any errors
                processor.ProcessErrorAsync += ErrorHandler;

                // start processing 
                await processor.StartProcessingAsync();

                Console.WriteLine("Press any key to end the processing");
                Console.ReadKey();

                // stop processing 
                Console.WriteLine("nStopping the receiver...");
                await processor.StopProcessingAsync();
                Console.WriteLine("Stopped receiving messages");
            }
        }

        // handle received messages
        async Task MessageHandler(ProcessMessageEventArgs args)
        {
            string body = args.Message.Body.ToString();
            try
            {
                SQL.WriteMessage(body);

                // complete the message, message is deleted from the queue. 
                await args.CompleteMessageAsync(args.Message);
            }
            catch (Exception e)
            {
                // Message failed to load, so move it to the dead letter queue
                await args.DeadLetterMessageAsync(args.Message, e.Message);
            }
        }

        // handle any errors when receiving messages
        Task ErrorHandler(ProcessErrorEventArgs args)
        {
            Console.WriteLine(args.Exception.ToString());
            return Task.CompletedTask;
        }
    }
}
```

### Start the listener

This final thing we need to do in the code is to start the queue listener in **program.cs**.

Change **program.cs** to the following:

```cs
using Microsoft.Extensions.Configuration;
using System;
using System.IO;
using System.Threading.Tasks;

namespace odsl_sql_loader
{
    class Program
    {
        private IConfiguration Configuration;

        static async Task Main()
        {
            Program p = new Program();
            p.Init();
            await p.StartListening();
        }
        void Init()
        {
            // Build configuration
            Configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetParent(AppContext.BaseDirectory).FullName)
                .AddJsonFile("appsettings.json", false)
                .Build();
        }

        async Task StartListening()
        {
            QueueSource queueSource = new QueueSource(Configuration);
            await queueSource.ReceiveMessagesAsync();
        }
    }
}
```

Run the console application now so it can start listening for messages.

### Manually trigger the subscription

The final step to test that everything works is to manually trigger the subscription. We can do this in OpenDataDSL code using the **trigger** command. Pick a date that you know has some input data, e.g. 9th June 2021, and run the following line of code:

```js
trigger SQL_DATA_ECB_FX for 2021-06-09
```

This should create a message that will be sent to the **sql** queue which will be picked up by the console application and the data will be loaded into your local SQL Server.

Check to see that the data has been loaded by running the following command in SQL Server Management Studio:
```sql
SELECT [base]
      ,[currency]
      ,[index]
      ,[value]
  FROM [ODSL].[dbo].[FX]
```

You should see 3 rows of data similar to the following:

![](/attachments/335511553/338460853.png)

This concludes the tutorial, you can use and modify this code freely under the [MIT License](https://github.com/OpenDataDSL/odsl-sql-loader/blob/main/LICENSE).

