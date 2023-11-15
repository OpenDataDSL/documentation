---
slug: /sdk/matlab
---
MATLAB SDK
=================

## Windows Installation

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

```var = get(service, source, id);```

e.g. to the timeseries for the EUR/GBP FX rate from ABN Amro

```fx = get('data', 'public', '#ABN_FX.EURGBP:SPOT');```

