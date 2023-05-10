---
slug: /tutorials/gettingstarted1camel
title: Subscribing to Data-Feeds - Part 3
description: Integration using Apache Camel
sidebar_position: 4
tags:
  - tutorial
  - subscription
  - getting-started
  - camel
  - kafka
  - java
---

## Introduction

This tutorial is the 2nd part of a tutorial on subscribing to data and integrating that data into another system.

In this part, we will write a client side Java application to listen for those messages and push them to a [Kafka](https://kafka.apache.org) topic

## Prerequisites

### User requirements

This tutorial assumes some familiarity with coding in c# in Microsoft Visual Studio and OpenDataDSL in Visual Studio Code.

### System requirements

You will need to have the following:

* Completed [Part 1](/docs/tutorials/gettingstarted1)
* An account with OpenDataDSL    
* Microsoft VS Code with the [OpenDataDSL extension](/docs/user/vscode)    
* An installed version of Kafka
* An installed version of Git
* An installed version of Apacha Maven

### Recap
In [Part 1](/docs/tutorials/gettingstarted1) we:
* Created a queue which will hold the OpenDataDSL subscription messages
* Created a subscription to some data
* Manually triggered the subscription to place some data in the queue 

## The Java Camel Project
In this tutorial, we clone an existing small project from GitHub and change some configuration.
This is a java project, but there is no coding to do, it is using configuration only.
 
### Clone the GitHub project
In an empty directory, run the following to clone the GitHub repository to your local machine:

```
git clone https://github.com/OpenDataDSL/odsl-camel-kafka.git
```

### Configure the project
Open the directory in VS Code so we can start making some configuration changes.

There are 3 configuration items that need to be made.

#### application.yml
Replace the azure.connection with your queue connection string 

```yml
azure:
  connection: Endpoint=sb://sb-odsl.servicebus.windows.net/;
```

Replace the kafka.connection with your Kafka broker connection string
```yml
kafka:
  connection: localhost:29092
```

#### routing.xml
Replace the word `company` with your assigned company tenant id

```xml
        <from uri="azureServiceBus:prod/company/tutorial" />
```

#### Kafka Configuration
You will also need to add a topic to Kafka called ecb_fx, or else change the routing to the name of the topic you want to send the messages to in the routing.xml file

```xml
        <to uri="kafka:ecb_fx" />
```


### Running
Once all the configuration is complete, you can run this project with:

```
mvn spring-boot:run
```

You should then see some messages read from your queue and sent to the Kafka topic.

## Anatomy of the Project
Although this is a java project, there is only 1 java class - Application.java:

```java
@Configuration
@ImportResource("classpath:applicationContext.xml")
@SpringBootApplication()
public class Application {
    public Application() {
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

This is a Java Spring Boot application and this is the main class that is run. 
The entire application is configured in the application.yml file:

```yaml
logging:
  level:
    org.springframework: INFO
    com.opendatadsl: DEBUG

azure:
  connection: Endpoint=sb://sb-odsl.servicebus.windows.net/;
  
kafka:
  connection: localhost:29092

camel:
  springboot:
    xml-routes: classpath:camel/*.xml
```
In the yml file, we set some logging levels, connection strings for Azure and Kafka and configure the camel routing files.

This configuration is used with the Spring application context which comes from a file called applicationContext.xml.
In here we configure the Azure Service Bus and Kafka beans that are used in the Camel routing.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!-- Azure Service Bus-->
    <bean id="azureServiceBusConfig" class="org.apache.camel.component.azure.servicebus.ServiceBusConfiguration">
        <property name="connectionString" value="${azure.connection}" />
    </bean>
    <bean id="azureServiceBus" class="org.apache.camel.component.azure.servicebus.ServiceBusComponent">
        <property name="configuration" ref="azureServiceBusConfig" />
    </bean>

    <!-- Kafka -->
    <bean id="kafkaConfig" class="org.apache.camel.component.kafka.KafkaConfiguration">
        <property name="brokers" value="${kafka.connection}" />
    </bean>
    <bean id="kafka" class="org.apache.camel.component.kafka.KafkaComponent">
        <property name="configuration" ref="kafkaConfig" />
    </bean>
</beans>
```

The final piece of configuration is the camel routing file which defines how we route our messages:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<routes id="odsl-camel-kafka" xmlns="http://camel.apache.org/schema/spring">

    <route id="handle-messages">
        <from uri="azureServiceBus:prod/company/tutorial" />
        <log message="${body}" />
        <to uri="kafka:ecb_fx" />
    </route>

</routes>
```

The `handle-messages` route does the following:
* Reads messages from our azureServiceBus configured bean from the named queue
* Logs a message to the console with the message body in JSON
* Send the message to the ecb_fx topic on the Kafka server

## Customising
You can use and modify this code freely under the [MIT License](https://github.com/OpenDataDSL/odsl-sql-loader/blob/main/LICENSE).

You can use any of the [Apache Camel components](https://https://camel.apache.org/components) to send this message to any supported endpoint.
