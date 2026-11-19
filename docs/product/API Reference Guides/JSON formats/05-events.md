---
title: Events
description: The JSON of events and event lists
slug: /api/json/events
sidebar_position: 5
tags:
  - api
  - json
  - event
---

# Events

An event is a record of something that happened at a time: a trade, a settlement price for a contract, an outage, an order. Events belong to an event list on a master data object. You save them by saving the object with the events in a list property, or by posting a DataFrame to the [Event service](/docs/api/rest/service/event), and read them with the Event service.

| **Id** | **What it is** |
|-|-|
| `NGE.TRADES:FILLS` | The event list `FILLS` on the object `NGE.TRADES` |
| `NGE.TRADES:FILLS:T1001` | The event `T1001` in that list |

---

## Event

An event has a few fixed fields. Every other field is a property of the event, written at the top level, not inside a `properties` object.

| **Field** | **Type** | **Required** | **What it is** |
|-|-|-|-|
| `_type` | String | Yes | `VarEvent` |
| `_id` | String | Yes | The id of the event, unique within the event list |
| `eventtime` | DateTime | No | When the event was recorded, defaults to now |
| `eventstart` | DateTime | No | When the event starts, defaults to `eventtime` |
| `eventend` | DateTime | No | When the event ends, defaults to `eventtime` |
| `eventtype` | String | No | The [type](./master-data#type) that defines the event's properties, defaults to `#Event` |
| `timezone` | String | No | The timezone of the event times |
| `dsid` | String | No | The [dataset](./datasets-and-quality#dataset) the event belongs to. Stored as `_dsid` |
| `_source` | String | No | `common` to save the event in common data |
| (any name) | Any | No | A property of the event |

If events are used to build an [event curve](./curves#event-curve), each event also needs the tenor property the curve uses, usually `relative` (for example `M01`) or `absolute` (for example `2026M12`). See [Period codes](/docs/odsl/calendar/period-code) for the tenor codes.

The platform adds these fields when the event is saved:

| **Field** | **What it is** |
|-|-|
| `_id` | Replaced by the full id, `objectid:eventlist:eventid` |
| `eventid` | The id you sent |
| `eventlist` | The name of the event list |
| `event` | The event list id, `objectid:eventlist` |
| `_dataid`, `_objid`, `_objtype` | The id within the object, the object id and the object type |
| `status` | The quality [status](./overview#status) of the event, empty until it is checked |
| `_created`, `_timestamp` | When the event was created and last saved, with the [version fields](./overview#fields-that-start-with-an-underscore) |

Event types with `_mergeEvent` set merge a saved event into the existing one; otherwise the event is replaced.

### Saving events in an object

```json
{
  "_id": "NGE.GAS.ZTP",
  "_type": "#Object",
  "EVENTS": [
    {
      "_type": "VarEvent",
      "_id": "2026-11-18_M01",
      "dsid": "NGE.ZTP.SETTLE",
      "eventtime": "2026-11-18",
      "eventstart": "2026-12-01",
      "eventend": "2026-12-31",
      "absolute": "2026M12",
      "relative": "M01",
      "SETTLEMENT_PRICE": 31.425
    },
    {
      "_type": "VarEvent",
      "_id": "2026-11-18_M02",
      "dsid": "NGE.ZTP.SETTLE",
      "eventtime": "2026-11-18",
      "eventstart": "2027-01-01",
      "eventend": "2027-01-31",
      "absolute": "2027M01",
      "relative": "M02",
      "SETTLEMENT_PRICE": 32.010
    }
  ]
}
```

### Reading an event

```json
{
  "_id": "NGE.GAS.ZTP:EVENTS:2026-11-18_M01",
  "_type": "VarEvent",
  "eventid": "2026-11-18_M01",
  "eventlist": "EVENTS",
  "event": "NGE.GAS.ZTP:EVENTS",
  "eventtype": "#Event",
  "eventtime": "2026-11-18",
  "eventstart": "2026-12-01",
  "eventend": "2026-12-31",
  "_dsid": "NGE.ZTP.SETTLE",
  "absolute": "2026M12",
  "relative": "M01",
  "SETTLEMENT_PRICE": 31.425,
  "status": {},
  "_dataid": "EVENTS:2026-11-18_M01",
  "_objid": "NGE.GAS.ZTP",
  "_objtype": "#Object",
  "_version": 1,
  "_user": "loader@northgate-energy.com",
  "_timestamp": "2026-11-18T18:31:09.004"
}
```

---

## Event list

When an object is saved with a list of events, the object keeps a [reference](./master-data#reference) to the event list in that property, with the event type:

```json
"EVENTS": {
  "_type": "VarReference",
  "_service": "event",
  "_source": "private",
  "_oid": "NGE.GAS.ZTP:EVENTS",
  "_otype": "VarEvent",
  "eventtype": "#Event"
}
```

The platform also keeps a record of the list:

| **Field** | **Type** | **What it is** |
|-|-|-|
| `_id` | String | The name of the event list |
| `_type` | String | `VarEventList` |
| `eventtype` | String | The type of the events |
| `_source` | String | The source of the events |
| `name`, `description` | String | Taken from the events, if they have them |

---

## Events as a DataFrame

The Event service also accepts events as a DataFrame: a list of `columns` and a list of rows in `data`. Each row becomes an event with a property for each column.

```json
{
  "columns": ["_id", "eventtime", "product", "price", "volume"],
  "data": [
    ["T1001", "2026-11-18T09:15:00", "TTF", 42.15, 10],
    ["T1002", "2026-11-18T09:32:00", "TTF", 42.40, 5]
  ]
}
```

Post it to the event list id, for example `event/v1/private/NGE.TRADES:FILLS`. See the [Event service](/docs/api/rest/service/event#updating-events-with-a-dataframe).
