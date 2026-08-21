---
title: Computed Curves and Time Series
description: EventCurve, EventTimeSeries, SmartCurve, and SmartTimeSeries in the Python SDK
slug: /sdk/python/computed-curves-and-timeseries
sidebar_position: 4
tags:
- python
- sdk
- types
- curves
- timeseries
---

Alongside `Curve`/`TimeSeries` (which carry their own explicit values), `odsl.types` has four builders for fields the server computes for you instead:

* `EventCurve`/`EventTimeSeries` derive their values from an event group -- the same kind of events `Event`/`events_dataframe()` write (see [Writing Events](./events.md)) -- reading one property off each event as the value (and, for a curve, another as the tenor/maturity code). Neither carries an explicit `data`/`contracts` field -- the server rejects one being present at all, even empty (`[8003] Invalid update ... Cannot contain data/contracts`), since the whole point is that it's derived, not supplied.
* `SmartCurve`/`SmartTimeSeries` derive their values from a formula expression against another curve/time series as `BASE`, optionally with a script layered on top. The base curve/time series id and the expression are both required arguments -- the server rejects either being missing the same way.

:::caution
The base id passed to `SmartCurve`/`SmartTimeSeries` has to be the referenced field's full `OBJECTID:FIELDNAME` reference id -- the same id `odsl.get('data', source, id)` would read it back with -- not just the field name on its own. `'CURVE'` alone resolves to nothing and the smart curve/time series won't compute; it needs to be `'AAA.PYTHON-EXAMPLE:CURVE'`.
:::

All four attach to an object as a field exactly like `Curve`/`TimeSeries` do:

```python
# EventCurve: built from 'tenor'/'price' properties on events under FORWARDS
event_curve = (
    types.EventCurve('AAA.PYTHON-EXAMPLE:FORWARDS', 'price', 'tenor', '#REOMHENG', id='EVENT_CURVE')
    .set_currency('EUR')
)

# SmartCurve: the object's own CURVE field, scaled by a formula -- note the
# base id is 'AAA.PYTHON-EXAMPLE:CURVE', not just 'CURVE'
smart_curve = types.SmartCurve('AAA.PYTHON-EXAMPLE:CURVE', 'BASE * 1.1', id='SMART_CURVE')

obj = odsl.get('object', 'private', 'AAA.PYTHON-EXAMPLE')
obj['EVENT_CURVE'] = event_curve.data
obj['SMART_CURVE'] = smart_curve.data
odsl.update('object', 'private', obj)
```

`EventTimeSeries` and `SmartTimeSeries` work the same way:

```python
event_timeseries = (
    types.EventTimeSeries('AAA.PYTHON-EXAMPLE:READINGS', 'value', id='EVENT_TIMESERIES', calendar='DAILY', start='2026-08-20')
    .set_name('Time series built from READINGS events')
)

smart_timeseries = (
    types.SmartTimeSeries('AAA.PYTHON-EXAMPLE:TIMESERIES', 'BASE * 2', id='SMART_TIMESERIES', calendar='DAILY')
    .set_name('Smart time series: TIMESERIES doubled')
)
```

See [`smart-types-example.py`](https://github.com/OpenDataDSL/odsl-python-sdk/blob/master/examples/smart-types-example.py) for the full walkthrough, and each class's docstring in [`odsl/types.py`](https://github.com/OpenDataDSL/odsl-python-sdk/blob/master/odsl/types.py) for the rest of their setters.
