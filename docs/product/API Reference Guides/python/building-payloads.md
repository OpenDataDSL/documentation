---
title: Building Payloads with odsl.types
description: Fluent builder classes for objects, curves, and time series in the Python SDK
slug: /sdk/python/building-payloads
sidebar_position: 2
tags:
- python
- sdk
- types
---

Writing the raw JSON for a curve, time series, or event by hand means matching the server's wire format exactly -- including a few fields that are named differently on the wire than you'd expect. The `odsl.types` module provides fluent builder classes for the common shapes instead, so you don't have to look those up each time.

Every setter on every builder below returns the builder itself, so a curve, time series, or object can be built as one chained expression.

## The builders

| Class | Server type | What it's for |
| --- | --- | --- |
| `Object` | `VarSimpleObject` | A plain master data object |
| `Curve` | `VarCurve` | A forward curve with explicit contract values |
| `TimeSeries` | `VarTimeSeries` | A time series with explicit observation values |
| `Event` | `VarEvent` | A single timestamped event (write with `events_dataframe`, see [Writing Events](./events.md)) |
| `EventCurve` | `VarEventCurve` | A curve derived from a group of events (see [Computed Curves and Time Series](./computed-curves-and-timeseries.md)) |
| `EventTimeSeries` | `VarEventTimeSeries` | A time series derived from a group of events (see [Computed Curves and Time Series](./computed-curves-and-timeseries.md)) |
| `SmartCurve` | `VarSmartCurve` | A curve computed from a formula against another curve (see [Computed Curves and Time Series](./computed-curves-and-timeseries.md)) |
| `SmartTimeSeries` | `VarSmartTimeSeries` | A time series computed from a formula against another time series (see [Computed Curves and Time Series](./computed-curves-and-timeseries.md)) |
| `Report` | `VarReportConfiguration` | A report definition, written to the `reportconfig` service (see [Defining Reports](./reports.md)) |

:::info
The classes' docstrings in [`odsl/types.py`](https://github.com/OpenDataDSL/odsl-python-sdk/blob/master/odsl/types.py) are the canonical reference for every setter and which wire key it writes -- this page and the pages linked above cover the common cases.
:::

## A plain object

```python
from odsl import sdk, types

odsl = sdk.ODSL()
odsl.setStage('dev')
odsl.loginWithSecret(tenant_id, client_id, secret)

obj = types.Object('AAA.PYTHON-EXAMPLE').set('name', 'Python Example')
odsl.update('object', 'private', obj.data)
```

## A forward curve, attached to that object

```python
curve = (
    types.Curve('2026-08-20', '#REOMHENG', id='CURVE')
    .set_name('Example curve')
    .set_currency('EUR')
    .add('M01', 1.4)
    .add('M02', 2.2)
    .add('M03', 3.3)
)
obj = odsl.get('object', 'private', 'AAA.PYTHON-EXAMPLE')
obj['CURVE'] = curve.data
odsl.update('object', 'private', obj)
```

## A time series, attached the same way

```python
timeseries = (
    types.TimeSeries(id='TIMESERIES', calendar='DAILY', start='2026-08-01')
    .set_units('MWh')
    .add('2026-08-01', 10.5)
    .add('2026-08-02', 11.2)
)
obj['TIMESERIES'] = timeseries.data
odsl.update('object', 'private', obj)
```

See [`object-example.py`](https://github.com/OpenDataDSL/odsl-python-sdk/blob/master/examples/object-example.py), [`curve-example.py`](https://github.com/OpenDataDSL/odsl-python-sdk/blob/master/examples/curve-example.py), and [`full-example.py`](https://github.com/OpenDataDSL/odsl-python-sdk/blob/master/examples/full-example.py) for these in full, and [`manual-payload-example.py`](https://github.com/OpenDataDSL/odsl-python-sdk/blob/master/examples/manual-payload-example.py) for the same object/curve update written out as raw dicts, if you'd rather not depend on `odsl.types` at all.
