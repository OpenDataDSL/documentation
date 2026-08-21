---
title: Getting Started
description: Instructions on installing and using the Python SDK for OpenDataDSL
slug: /sdk/python/getting-started
sidebar_position: 1
tags:
- python
- sdk
---

The Python SDK for the OpenDataDSL data management platform.

## Installation

You can install the ODSL Python SDK from [PyPI](https://pypi.org/project/odsl/):

    python -m pip install odsl

You can upgrade an existing install using:

    python -m pip install odsl --upgrade

## About

This Python SDK for OpenDataDSL has the following features:

* Find any data in OpenDataDSL using the `list` method
* Retrieve any data using the `get` method
* Update any data (if you have permission) using the `update` method
* Communicate with the process execution API to give real-time updates
* Build well-formed payloads for objects, curves, time series, computed/derived data, events, and report definitions with the `odsl.types` helpers, instead of hand-writing the JSON shapes yourself -- see [Building Payloads with odsl.types](./building-payloads.md)

Check out our [demo repository](https://github.com/OpenDataDSL/odsl-python-sdk-demo) for runnable examples of real-world usage.

## Platform SDK

### Logging in and getting started

```python
from odsl import sdk

odsl = sdk.ODSL()
odsl.login()
```

`login()` triggers an interactive Microsoft sign-in the first time, then reuses a cached token on subsequent runs. It's the right choice for scripts a person runs themselves.

### Logging in using a client secret

For unattended/service-to-service use (scheduled jobs, CI, servers), authenticate as an application instead:

```python
from odsl import sdk

odsl = sdk.ODSL()
odsl.loginWithSecret(tenant_id, client_id, secret)
```

### Logging in using an API key

```python
from odsl import sdk

odsl = sdk.ODSL()
odsl.loginWithAPIKey(userid, apikey)
```

### Pointing at a different environment

By default the SDK talks to the production API. To target the dev environment instead (useful while testing):

```python
odsl = sdk.ODSL()
odsl.setStage('dev')          # or 'local' for http://localhost:7071
odsl.loginWithSecret(tenant_id, client_id, secret)
```

### Finding master data

```python
objects = odsl.list('object', source='public', params={'source': 'ECB'})
print(objects[0])
```

`list` also accepts query params like `_filter`, `_sort`, `_limit`, `_skip`, and `_aggregate` for more targeted searches.

### Getting master data

```python
obj = odsl.get('object', 'public', '#ECB')
print(obj['description'])
```

### Getting a time series

```python
ts = odsl.get('data', 'public', '#ABN_FX.EURUSD:SPOT', {'_range': 'from(2024-07-01)'})
print(ts)
```

### Getting a forward curve

```python
id = '#AEMO.EL.AU.NEM.NSW1.FORECAST:DEMAND:2024-07-15'
curve = odsl.get('data', 'public', id)
for c in curve['contracts']:
    print(c['tenor'] + ' - ' + str(c['value']))
```

### Creating and updating private master data

`update` is used for both creates and updates: if the `_id` you send doesn't exist yet it's created, otherwise it's overwritten with whatever fields you send. Read the record back first if you want to change one field without clobbering the rest:

```python
# Create
obj = {
    '_id': 'AAA.PYTHON',
    'name': 'Python Example',
}
odsl.update('object', 'private', obj)

# Update, preserving the fields already on the object
obj = odsl.get('object', 'private', 'AAA.PYTHON')
obj['description'] = 'Updated from Python'
odsl.update('object', 'private', obj)
```

:::info
`update` doesn't raise an exception or return a value when the write fails -- it just prints the HTTP status code (and the server's error detail, see below). If a script's later reads or updates start failing unexpectedly, check whether an earlier `update` call actually succeeded.
:::

### Reading the server's error detail

If a call fails, the SDK prints the server's `x-odsl-error` response header automatically (e.g. `ODSL error 400: [5005] Update Error: ...`) to help explain what went wrong, in addition to whatever `get`/`update` themselves return -- worth checking whenever a script behaves unexpectedly.

## What's next

* [Building Payloads with odsl.types](./building-payloads.md) -- fluent builders for objects, curves, and time series instead of hand-written JSON
* [Writing Events](./events.md) -- appending timestamped events to an object
* [Computed Curves and Time Series](./computed-curves-and-timeseries.md) -- curves and time series the server derives for you, from events or a formula
* [Defining Reports](./reports.md) -- scheduling a report definition

## Process SDK

The process SDK for Python allows a Python process to communicate with the platform to give real-time updates and logging information.

When running Python code as a process execution in the OpenDataDSL platform, you have a `PROCESS` variable available to communicate with.

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
If running using odslrun.py, a `MAIN` phase will have been started and it will end the `MAIN` phase after your script completes.

#### Usage
```python
await PROCESS.startPhase(name)
```

### endPhase

This signals that the current phase is complete, if running using odslrun.py, this will end the `MAIN` phase for you after running your script.

#### Usage
```python
await PROCESS.endPhase(status, message)
```

* status - can be one of success, warning, fatal

### logMessage

This logs a message in the current phase.

#### Usage
```python
await PROCESS.logMessage(level, message)
```

* level - can be one of DEBUG, INFO, WARNING, SEVERE
