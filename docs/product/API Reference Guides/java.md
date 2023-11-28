---
title: Java SDK
description: Instructions on installing and using the java SDK for OpenDataDSL
slug: /sdk/java
tags:
  - java
  - sdk
  - messaging
  - realtime
---

## Installation

You can install the ODSL Java SDK using maven, include the following in the dependencies section of your pom.xml file:

```xml
<dependency>
    <groupId>com.walkfares</groupId>
    <artifactId>odsl-sdk</artifactId>
    <version>${opendsl.version}</version>
</dependency>
```

:::note
You can either set a property for the version in the properties section or directly set the version in the dependency block
:::

## Connecting
To connect and log in to OpenDataDSL, use the login() command from the SDK, e.g.

```java
package com.opendatadsl.examples;

import com.walkfares.odsl.var.Var;

import sdk.ODSL;

public class ConnectExample {
    public static void main(String[] args) {
        ODSL odsl = new ODSL();
        odsl.login();
    }
	
}
```

## Reading Data
To read data from OpenDataDSL, use the get() command from the SDK with the syntax:

```js
Var v = odsl.get({service}, {source}, {id});
```

### Reading master data
To read some master data from the object service:

```java
VarDynamicObject vdo = (VarDynamicObject) odsl.get("object", "private", "ICE.EL.NLB");
System.out.println(vdo.getProperties());
```

### Reading a timeseries

```java
VarTimeSeries ts = (VarTimeSeries) odsl.get("data", "private", "ICE.EL.NLB:SETTLE:M01");
System.out.println(ts.getValues());
```

### Reading a curve

```java
VarCurve vc = (VarCurve) odsl.get("data", "private", "ICE.EL.NLB:SETTLE:2023-10-20");
System.out.println(vc);
```

## Writing Data
To write data to OpenDataDSL, use the update() command from the SDK with the syntax:

```js
odsl.update({service}, {source}, Object);
```

### Updating a curve

```java
VarExpiryCalendar expcal = odsl.getContext().getExpiryCalendarCache().get("#RDCEM");
VarCurveDate ondate = new VarCurveDate(UTCDate.of(2023, 10, 26), expcal);
VarCurve curve = new VarCurve("C", ondate);

curve.add("M01", "12.1");
curve.add("M02", "12.2");
curve.add("M03", "12.3");
curve.add("M04", "12.4");
curve.add("M05", "12.5");
curve.add("M06", "12.6");

VarDynamicObject AAA = new VarDynamicObject("AAA");
AAA.add(curve);
odsl.update("object", "private", AAA);
```

## Listening for messages
You can create a message consumer and error processor to consume messages from an OpenDataDSL message queue.

### The message consumer

```java
package com.opendatadsl.messaging;

import java.util.function.Consumer;
import com.azure.messaging.servicebus.ServiceBusReceivedMessage;
import com.azure.messaging.servicebus.ServiceBusReceivedMessageContext;

public class MessageProcessor implements Consumer<ServiceBusReceivedMessageContext> {

	@Override
	public void accept(ServiceBusReceivedMessageContext context) {
		ServiceBusReceivedMessage message = context.getMessage();
		System.out.println(message.getBody().toString());
		// Handle message body here
	}
}
```

### The error processor

```java
package com.opendatadsl.messaging;

import java.util.function.Consumer;
import com.azure.messaging.servicebus.ServiceBusErrorContext;

public class ErrorProcessor implements Consumer<ServiceBusErrorContext> {

	@Override
	public void accept(ServiceBusErrorContext context) {
		System.err.println("Error occurred while receiving message: " + context.getException());
	}
}
```

### The main message handler

```java
package com.opendatadsl.messaging;

import sdk.ODSL;
import sdk.Messaging;

public class Main {
    public static void main(String[] args) {
        ODSL odsl = new ODSL();
        odsl.login();

        Messaging messaging = odsl.messaging();
        
        // Read from the named queue and pass in your MessageProcessor and ErrorProcessor
        messaging.receiveAndDelete("default", new MessageProcessor(), new ErrorProcessor());
    }
}
```

## Realtime Data

You can create a realtime data consumer to consume realtime messages from OpenDataDSL.

### Simple RTD message consumer

```java
package com.opendatadsl.realtime;

import java.util.function.Consumer;

public class RTDProcessor implements Consumer<Object> {
	@Override
	public void accept(Object t) {
		System.out.println(t.toString());
	}	
}
```

### The main message handler

```java
package com.opendatadsl.realtime;

import sdk.ODSL;
import sdk.RTD;

public class MasterDataExample {
    public static void main(String[] args) {
        ODSL odsl = new ODSL();
        odsl.login();

        RTD rtd = odsl.RTD();
        rtd.connect();
        rtd.addMessageHandler("OnObjectUpdate", new RTDProcessor());
        rtd.subscribe("object", "AAA");
    }
}

```

### A curve management example

```java
package com.opendatadsl.realtime;

import sdk.ODSL;
import sdk.RTD;

public class CurveManagementExample {
	    public static void main(String[] args) {
        ODSL odsl = new ODSL();
        odsl.login();

		RTD rtd = odsl.RTD();
		rtd.connect();
		rtd.addMessageHandler("OnCurveMessage", new RTDProcessor());
		
		// Subscribe to the curve management messages for an ondate
		rtd.subscribe("curve", "2023-11-27");
    }
}
```