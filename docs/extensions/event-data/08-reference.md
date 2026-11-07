---
title: Event Data reference
description: How event lists, events and event curve, timeseries and options definitions are stored, the platform calls the extension makes, Home page tasks and troubleshooting
slug: /extensions/event-data/reference
sidebar_position: 8
tags: [extension, event data, reference, events, event curve, event timeseries, event options]
---

# Event Data reference

---

## Where things are kept

| What | Where | Id |
|-|-|-|
| Master data records | Object service, private or public | `NGE.POWER.DE` |
| Event lists | Data service, private or public, `_type` `VarEventList`; `_source` says where the events are (private, common or public) | `NGE.POWER.DE:BROKER_QUOTES` |
| Events | Event service, private, public or common | `NGE.POWER.DE:BROKER_QUOTES:20261105_BRK1_2026M12` |
| Event curves | Data service, `_type` `VarEventCurve` | `NGE.POWER.DE:BROKER_CURVE` |
| Event timeseries | Data service, `_type` `VarEventTimeSeries` | `NGE.WIND.DE:NORDSEE_WEST_DAILY` |
| Event options | Data service, `_type` `VarEventOptions` | `NGE.GAS.TTF:EFO_OPTIONS` |

A definition is kept as a property of its master data record, like any other curve or timeseries, and the platform builds it from the events when it is read.

---

## Definitions

An event curve as saved by the extension:

```json
{
  "_id": "NGE.POWER.DE",
  "BROKER_CURVE": {
    "_id": "BROKER_CURVE",
    "_type": "VarEventCurve",
    "event": "NGE.POWER.DE:BROKER_QUOTES",
    "name": "German power broker curve",
    "property": "mid",
    "tenor": "absolute",
    "calendar": "#REOMHENG",
    "currency": "EUR",
    "units": "MWh"
  }
}
```

| Field | Curve | Timeseries | Options | Meaning |
|-|-|-|-|-|
| `event` | yes | yes | yes | The event list id. |
| `source` | yes | yes | yes | `common` when the list's events are in common. |
| `property` | yes | yes | | The value field. |
| `tenor` | yes | | yes | The tenor field. |
| `calendar` | yes | yes | | The expiry calendar (curve) or the calendar (timeseries). |
| `holidayCalendar` | yes | | yes | The publishing days. |
| `index` | | yes | | `start`, `end`, `time` or a date field. |
| `valueTransformation` | yes | | | An ODSL expression on `value`. |
| `strike`, `callPut`, `callValue`, `putValue`, `value`, `columns` | | | yes | The option fields, the main value and the columns. |
| `filter` | yes | yes | yes | A JSON filter on the events, as text. |
| `timezone`, `currency`, `units`, `name`, `description` | yes | yes | yes | |

The same definitions in ODSL: [EventCurve](/docs/odsl/variable/eventcurve), [EventTimeSeries](/docs/odsl/variable/eventtimeseries) and [EventOptions](/docs/odsl/variable/eventoptions).

---

## Imported events

Each CSV row is saved as an event of the list, through the object service, 500 at a time:

```json
{
  "_id": "NGE.WIND.DE",
  "OUTPUT": [
    {"_type": "VarEvent", "_id": "20261101000000_Nordsee_West",
     "eventtime": {"$date": "2026-10-31T23:00:00.000Z"}, "timezone": "Europe/Berlin",
     "eventtype": "#Event", "site": "Nordsee West", "mw": 212.4, "availability": 98.5}
  ]
}
```

The list is created with the first events when it does not exist. A dataset id is sent as `dsid` and stored as `_dsid`. See [Events](/docs/odsl/dm/events) for more about events on the platform.

---

## Platform calls

| What | Call |
|-|-|
| Lists by master data | `GET data/v1/private` (or `public`) with `_filter` on `_type` `VarEventList` (and `_source` `common` for **Common**) and `_objfilter` on the records |
| Lists by their events | `GET event/v1/{source}` with `_aggregate`: a `$match` on the list id, `_dsid`, fields and dates, grouped by list |
| A list's events | `GET event/v1/{source}` with `_filter` on `event`, `_sort`, `_skip` and `_limit` |
| Definitions of a list | `GET data/v1/private` and `public` with `_filter` on the type and `event` |
| Save a definition or import events | `POST object/v1/private` with the record id and the property |
| Delete a definition | `DELETE data/v1/private/ID/*`, then the property is removed from the record |
| What you may do with a list's events | `GET policy/v1?_function=rights&service=event&key=LIST&source=SOURCE` |
| Delete an event | `DELETE event/v1/SOURCE/OBJ:LIST:EVENTID/*` (every version) |
| Built curve or options | `GET data/v1/private/ID` (ondates), then `ID:ONDATE` |
| Built timeseries | `GET data/v1/private/ID?_range=last(100)` |
| Tenor history | `GET data/v1/private/ID:TENOR?_range=last(250)` |

The REST services are described in [Event service](/docs/api/rest/service/event).

---

## Opened from a Home page task

The extension adds three tasks to the [Home page](/docs/extensions/home/overview): **Import events from a CSV file**, **Find and chart events** and **Build a curve or timeseries from events**. A task can open Event Data ready for the job with these view properties:

| Property | Value | Effect |
|-|-|-|
| `ACTION` | `import` | Highlights the drop area (a browser cannot open a file chooser by itself). |
| `TAB` | `events` | Finds lists by their events. |
| `SOURCE` | `private`, `common` or `public` | Where to look. |
| `TEXT` | text | The search text. |
| `DSID` | a dataset id | Finds the lists with events of that dataset. |
| `LIST` | an event list id | Opens the list. |

---

## Access

| Action | Needs |
|-|-|
| Use the screens | The feature policy `extension.odsl.event_data`. |
| See events | Read access to the events; common events only for the datasets your company is licensed for. |
| Import events and save definitions | Permission to update the master data record. |
| Delete events | The delete action on the event service in a security policy that covers the events. Common events can normally only be read. |

---

## Troubleshooting

| What you see | Why, and what to do |
|-|-|
| A common list opens with no events | Your company is not licensed for that dataset, or the dates exclude every event. |
| **No events between ...** in a preview | Clear **Events from** to read the latest events, or check the filter. |
| **None of the events has a number in ...** | The value field holds text: choose another field. |
| A preview with no tenors or options | Check the tenor, strike and call or put fields. |
| **The filter must be a JSON object** | Write the filter as JSON with quoted names, for example `{"site": "Nordsee West"}`. |
| A save or import fails | The message after **Request failed** is the platform's reason, for example a missing permission on the record. |
| Imported rows replace each other | The event ids are the same: tick more columns under **Event id**. |
| No tick boxes on the Events tab | You may not delete this list's events, or they are common events. |
| Some events were not deleted | Your delete rights do not cover them; the message gives the platform's reason. |
