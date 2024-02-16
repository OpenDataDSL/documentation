---
title: MATLAB SDK
description: Instructions on installing and using the MATLAB SDK for OpenDataDSL
slug: /sdk/matlab
tags:
- matlab
- sdk
---

## Windows Installation

:::info
The OpenDataDSL MATLAB SDK requires a java SDK version of at least 11 - here are instructions from [MathWorks on how to upgrade your version of java.](https://uk.mathworks.com/matlabcentral/answers/130359-how-do-i-change-the-java-virtual-machine-jvm-that-matlab-is-using-on-windows)
:::

Follow these instructions to install the matlab client and configure it in MATLAB

1. Download the [matlab-client zip](https://odsldownloads.z6.web.core.windows.net/sdk/matlab/matlab-client.zip) file
2. Unzip the installation to a directory on your local drive
3. Edit or create the file %USER_HOME%\AppData\Roaming\MathWorks\MATLAB\R2023b\javaclasspath.txt
4. Add an entry in there that points to the odsl-sdk.jar file in the lib directory of the unzipped matlab-client

Example ( if you extracted the zip to c:\ ):

```c:\matlab-client\lib\odsl-sdk.jar```

5. Start or restart MATLAB

## Getting started

### Connecting
To connect to OpenDataDSL, you need to create an instance of the ```sdk.ODSL``` class and then call ```login()``` as follows:

```js
% Connect
ODSL=sdk.ODSL();
ODSL.login();
```

### Getting data
To read from any of the ODSL services, you need to use the ```get``` method on the ODSL sdk with the following syntax:

```var = odsl.get(service, source, id);```

e.g. to the timeseries for the EUR/GBP FX rate from ABN Amro

```fx = odsl.get('data', 'public', '#ABN_FX.EURGBP:SPOT');```

### Updating data
To write to any of the ODSL services, you need to use the ```update``` method on the ODSL sdk with the following syntax:

```odsl.update(service, source, Var, [options]);```

e.g. to update some Master Data using the object service:

```js
AAA = VarDynamicObject('AAA');
odsl.update('object', 'private', AAA);
```


## Building curves
We have added support for building curves externally using any language.
Curves can be built either as:
* Event triggered using Smart Curves
* Manual or time triggered using Standard Curves


### Event triggered curves
Event triggered curves are Smart Curves that send a message to the external system to build the curve.

:::info
When you create a SMART curve that will be built externally, you need to set the caching type as **External**
:::

The message is recommended to be a Batch variable with the following elements:
* The Smart Curve configuration
* The ondate as a String
* Each curve input

#### An example ODSL curve function
```js
function triggerMatlab(BASE)
	inputs = Batch()
	inputs.add(#CURVE)
	inputs.add(#ONDATE)
	inputs.add(BASE)
	send inputs to "matlab"
	triggerMatlab = Message(406, "Triggered MATLAB curve build")	
end
```

#### Example ODSL function with multiple inputs
```js
function triggerMatlab(BASE, OTHER)
	inputs = Batch()
	inputs.add(#CURVE)
	inputs.add(#ONDATE)
	inputs.add(BASE)
	inputs.add(OTHER)
	send inputs to "matlab"
	triggerMatlab = Message(406, "Triggered MATLAB curve build")	
end
```

### Example MATLAB script
The following example waits for a new message, builds a curve and sends it to ODSL.

#### Connect to ODSL
```js
import sdk.*;
import com.walkfares.odsl.var.curve.*;

% Connect
odsl = ODSL();
odsl.setStage("dev");
odsl.login();
```

#### Wait for a message and create a curve shell
```js
% Wait for a message
messaging = odsl.messaging();
build = messaging.waitForCurveBuildMessage('matlab');

% Start Building
curve = build.createCurve();
logger = build.getLogger();
logger.info("Starting Curve Build");
```

#### Get input data
```js
% Get our input BASE curve
base = build.get("BASE");
```

#### Perform curve building logic
```js
% Curve Building Logic
% Use the input data and add contracts to the curve using
% curve.add(tenor, value);
% e.g. curve.add("M01", 25.1);

% Example Curve Building Logic - Add 10% to all the values in the BASE curve
for i=0:base.getContracts().size()-1
    vc = base.getContracts().get(i);
    newval = vc.getDoubleValue() * 1.1;
    vc.setDoubleValue(newval);
    curve.add(vc);
end
```

#### Save the curve and log information to ODSL
```js
% save the curve
logger.info("Saving Curve");
disp(['Saving Curve: ', char(build.getFullCurveId())]);
build.saveCurveAndComplete(curve, 'Built in MATLAB');
```