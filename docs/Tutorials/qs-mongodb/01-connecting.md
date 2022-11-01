---
title: Connecting to MongoDB
sidebar_position: 1
slug: /tutorials/qs/mongodb/connecting
tags:
- quickstart
- mongodb
---
import {QuickStartModule} from '/src/components/Discovery.js';

<QuickStartModule text="This quickstart module shows you how to create connections to your MongoDB databases." />

## Connection Types

There are 2 types of MongoDB connections in OpenDataDSL:
* The **private** connection - this is used as the default location and also stores your configuration information
* Named connections - these are connections to MongoDB servers and clusters to access existing data

### Private connection

#### Community version
The community version private connection defaults to ```mongodb://localhost:27017```

To change this:
* Go to the ODSL settings in VSCode (press **ctrl,** or select File -> Preferences -> Settings)
* Type **odsl** in the search box
* Change the MongoDB connection string in the setting odsl.c.mongodb

![ODSL Settings](img_2.png)

:::caution No MongoDB Connection Setting?
Check you have the **ODSL Community Version** installed
:::

#### Commercial versions
All the commercial versions private connection default to your own managed MongoDB database in our secure MongoDB cluster.

To change this, run the following code in an odsl file (see [here](/docs/tutorials/running-code) for information on how to run code in odsl files).

```js
tenant = Object()
tenant.mongodb = "<your connection string>"
save ${tenant:tenant}
```

### Named connections
:::note
Both the Community and Commercial versions allow named connections and are configured in the same way.
:::

You can create named connections by adding the MongoDB connection string to your tenant information.

You can do this by running the following code in an odsl file (see [here](/docs/tutorials/running-code) for information on how to run code in odsl files).

```js
tenant = Object()
tenant.connections = Object()

```

You then need to add your connection information to a property with the name you want the connection to me known as, e.g. something like this:

```js
tenant.connections.mycluster = "mongodb:// ' rest of url '
```

#### Save your tenant
After you have added your connection information, you need to save it:

```js

// Save our tenant connection info
save ${tenant:tenant}
```

You have 2 choices with user credentials

* You can opt to add them to the url so that all users of the connection have the same rights
* You can provide the credentials separately per user

#### With user credentials in the url

```js
tenant.connections.m101 = "mongodb+srv://user:password@xxxxx.mongodb.net/admin?authSource=admin&ssl=true"
```

#### Without credentials in the url

```js
tenant.connections.m101 = "mongodb+srv://xxxxx.mongodb.net/admin?authSource=admin&ssl=true"
```

Each user would then need to add their credentials for this connection as follows:

```js
me = ${user:"me"}
me.connections.m101.username = "username"
me.connections.m101.password = "password"
save ${user:me}
```

:::info
Only support for the default SCRAM authentication in the 'admin' database is supported at the moment 
:::


:::info
You need to create a named database connection called m101 to a MongoDB cluster containing the MongoDB Sample Dataset for the rest of this quickstart tutorial.
Click [here](/docs/tutorials/qs/mongodb/connecting#named-connections) for information on how to do this
:::

