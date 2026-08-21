---
title: Writing Events
description: Appending timestamped events to an object using the Python SDK
slug: /sdk/python/events
sidebar_position: 3
tags:
- python
- sdk
- events
---

Events are appended to a named array field on an existing object -- e.g. a `READING` field on `AAA.PYTHON-EXAMPLE`, addressed as `AAA.PYTHON-EXAMPLE:READING`.

:::info
Unlike `object`/`data` writes, the `event` service's write endpoint expects a small table (the same shape as `pandas.DataFrame.to_json(orient="split")`), not a single event's JSON directly. `odsl.types.events_dataframe()` builds that for you from one or more `Event` builders, whether you're writing a single event or a batch.
:::

## Writing events

```python
from odsl import sdk, types

odsl = sdk.ODSL()
odsl.setStage('dev')
odsl.loginWithSecret(tenant_id, client_id, secret)

event_key = 'AAA.PYTHON-EXAMPLE:READING'
events = [
    types.Event(event_key, 'READING-1', '2026-08-20T00:00:00Z').set_property('value', 41.2),
    types.Event(event_key, 'READING-2', '2026-08-20T00:15:00Z').set_property('value', 42.8),
]
odsl.update('event', 'private', types.events_dataframe(events))
```

## Reading events back

```python
# Reading a key back returns every event under it
readings = odsl.get('event', 'private', event_key)
```

## Addressing events

`event` must be in `OBJECTID:EVENTID` form -- exactly one colon, splitting into the id of an existing private object and a field name. Writing an event actually appends it to an array field (named by the `EVENTID` half) on that object; `OBJECTID:EVENTID` is also the `key` you `get()`/filter by when reading events back. This is unrelated to `eventid` (the second constructor argument), which is just that specific event's own unique id within the array.

Custom properties on an event are flat top-level keys (set via `set_property`), not nested under a `properties` key -- this is what you're filtering on with queries like:

```python
odsl.list('event', 'public', {'_filter': '{"MID_PRICE": {"$gt": 50}}'})
```

The reserved top-level keys the server treats specially -- avoid these as custom property names -- are: `eventid`, `eventtype`, `event`, `eventlist`, `eventtime`, `eventstart`, `eventend`, `timezone`, and `status`.

:::note
`Event` always sets `eventtype` to `'#Event'` by default (call `set_eventtype` to override it). The server reads `eventtype` unconditionally when parsing a write, so a payload without it fails with `[5005] Update Error: Document does not contain key eventtype` instead of falling back to a default, despite what its own docs suggest -- the SDK works around this for you, but it's worth knowing about if you're building the payload by hand instead.
:::

See [`full-example.py`](https://github.com/OpenDataDSL/odsl-python-sdk/blob/master/examples/full-example.py) for this in the context of a full object/curve/time-series/event walkthrough, and the `Event`/`events_dataframe` docstrings in [`odsl/types.py`](https://github.com/OpenDataDSL/odsl-python-sdk/blob/master/odsl/types.py) for further detail.
