---
title: Python SDK
description: Instructions on installing and using the Python SDK for OpenDataDSL
slug: /sdk/python
tags:
- python
- sdk
---

The python SDK for the OpenDataDSL data management platform

## Installation
You can install the ODSL Python SDK from [PyPI](https://pypi.org/project/odsl/):

    python -m pip install odsl

## About
This python SDK for OpenDataDSL has the following features:

* Find any data in OpenDataDSL using the ```list``` command
* Retrieve any data using the ```get``` command
* Update any data (if you have permission) using the ```update``` command
* Communicate with the process execution API to give real-time updates

Check out our [demo repository](https://github.com/OpenDataDSL/odsl-python-sdk-demo) for examples of real-world usage.

## Platform SDK

### Logging in and getting started

```python
from odsl import sdk

odsl = sdk.ODSL()
odsl.login()
```

### Finding master data

```python
objects = odsl.list('object', source='public', {'source':'ECB'})
print(objects[0])
```

### Getting master data

```python
obj = odsl.get('object', 'public', '#ECB')
print(obj['description'])
```

### Getting a timeseries
```python
ts = odsl.get('data', 'public', '#ABN_FX.EURUSD:SPOT', {'_range':'from(2024-07-01)'})
print(ts)
```

### Updating some private master data
```python
var = {
    '_id': 'AAA.PYTHON',
    'name': 'Python Example'
}
odsl.update('object', 'private', var)
```

### Reading and updating some private master data
```python
po = odsl.get('object', 'private', 'AAA.PYTHON')
po['description'] = 'Updated from Python'
odsl.update('object', 'private', po)
```

## Process SDK
The process sdk for python allows a python process to communicate with the platform to give real-time updates and logging information.

When running python code as a process execution in the OpenDataDSL platform, you have a ```PROCESS``` variable available to communicate with.

### startProcess
This signals that the process has started, if running using odslrun.py, this will have already been done for you.

#### Usage
```python
await PROCESS.startProcess()
```

### endProcess
This signals that the process is complete, if running using odslrun.py, this will be done for you after running your script.

#### Usage
```python
await PROCESS.endProcess(status, message)
```

* status - can be one of success, warning, fatal

### startPhase
This signals the start of a new phase of the process execution, this can be used to segregate actions and logging into discrete sections or phases.
If running using odslrun.py, a ```MAIN``` phase will have been started and it will end the ```MAIN``` phase after your script completes.

#### Usage
```python
await PROCESS.startPhase(name)
```

### endPhase
This signals that the current phase is complete, if running using odslrun.py, this will end the ```MAIN``` phase for you after running your script.

#### Usage
```python
await PROCESS.endPhase(status, message)
```

* status - can be one of success, warning, fatal

### logMessage
This logs a message in the current phase

#### Usage
```python
await PROCESS.logMessage(level, message)
```

* level - can be one of DEBUG, INFO, WARNING, SEVERE
