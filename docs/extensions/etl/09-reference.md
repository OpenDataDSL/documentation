---
title: Reference
description: Where data loaders and everything they deploy are kept, the settings a process passes to its workflow, the run report fields, the extension's contents, and troubleshooting
slug: /extensions/etl/reference
sidebar_position: 9
tags: [extension, data loaders, etl, reference, troubleshooting]
---

# Reference

---

## Where everything is kept

| What | Service and source | Id |
|-|-|-|
| A loader's design (with its sample) | object, custom collection `etl_loaders` | the code, e.g. `BROKER_GAS_SETTLEMENTS` |
| Workflow | workflow, private | `etl_<code>` |
| Process | process | `ETL_<CODE>` (service `ETL`) |
| Run report configuration | reportconfig, private | `ETL_<CODE>` (Fixed, category `ETL`) |
| Run reports | report, private | `ETL_<CODE>:<date>` |
| Custom extract action | action, private | `etl_extract_<code>` |
| Standard actions | action, private | `etl_extract`, `etl_transform`, `etl_load`, `etl_report` |
| Preview script | script, private | `etl\sampler`, made on first use |
| Secret values | secret | `etl_<code>_<name>` by default |
| Event timeseries, curves and options | data, private (on the record) | `RECORD:ID`, e.g. `NGE.BROKERS:SETTLE_TTF_FRONT` |
| Events | event | `RECORD:LIST:EVENTID` |
| Alerts | alert | key `etl/<code>`, category `etl` |

---

## The settings the process passes to the workflow

The process input is `loader` (and `ondate` for a run for a date). The broker settlements loader, shortened:

```json
{
  "code": "BROKER_GAS_SETTLEMENTS",
  "name": "Broker gas settlements",
  "source": {"kind": "csv", "url": "https://files.northgate-energy.example/brokers/settlements/{date:yyyyMMdd}.csv",
    "separator": ";", "headerpos": "1", "datapos": "0",
    "dates": [{"token": "{date:yyyyMMdd}", "which": "date", "format": "yyyyMMdd"}]},
  "columns": ["TradeDate", "Hub", "Product", "Contract", "Bid", "Ask", "Settle", "VolumeMWh", "Currency", "Broker"],
  "filters": [{"column": "Hub", "op": "notequals", "value": "TOTAL"}],
  "mapping": [
    {"target": "eventtime", "kind": "column", "column": "TradeDate", "dataType": "date", "format": "dd/MM/yyyy", "required": true},
    {"target": "contract", "kind": "column", "column": "Contract", "dataType": "text", "values": [{"from": "Dec-26", "to": "2026M12"}]},
    {"target": "settle", "kind": "column", "column": "Settle", "dataType": "number", "decimal": "comma", "nulls": "n/a"}
  ],
  "event": {"type": "BrokerSettlement", "timezone": "UTC"},
  "eventid": "{eventtime}_{Hub}_{Contract}_{Broker}",
  "dsid": "NGE.BROKER.{Hub}",
  "target": {"object": "NGE.BROKERS", "list": "SETTLEMENTS"},
  "alerts": {"raise": true, "severity": "high"},
  "failOnProblems": false
}
```

| Field | Notes |
|-|-|
| `source` | `kind` csv, json, xml, excel or odsl; `url`; csv `separator` (a regular expression for comma, semicolon, tab, pipe or spaces), `headerpos`, `datapos`; json and xml `path`; csv, json, xml and html `headers`; excel `sheet`, `headerRow`; html `selector`, `headerRow`; `dates`, the URL's placeholders. |
| `source.variables` | `names` and `sets` (a list of values for each set, as text). |
| `source.secrets` | `name` and `secret` (the secret record). Never the value. |
| `columns` | Every column the mapping, conditions and templates use. |
| `filters` | `column`, `op` (notempty, empty, equals, notequals, contains, notcontains), `value`. |
| `mapping` | `target`, `kind` (column, constant, template, ondate), `column`, `value`, `dataType` (text, number, integer, boolean, date, datetime), `format`, `decimal`, `scale`, `nulls`, `required`, `values`. |
| `eventid`, `dsid` | Templates with column names in braces; the event id also takes `{eventtime}` (yyyyMMddHHmmss), `{date}` and `{row}`. |
| `target` | `object` and `list` for one record. For a record for each value of a field: `mode` `split`, `list` and `split`: `field`, `id` (the record id template), `type`, `update` (`missing` or `always`), `fields` (`name` and `value`, a template of mapped fields) and `markers` (the field names the templates use). |

---

## Run report fields

Each stored report has `loader`, `name`, `target`, `last` (the latest run) and `runs`. A run has `key` (its time, HHmmss), `status`, `started`, `finished`, `ondate`, `url`, `extracted`, `events`, `saved`, `skipped`, `problemCount`, `problems`, `stage` (extract, transform or load) and `message`; for a split loader also `records` and `created`.

---

## Extension contents

| Kind | Id |
|-|-|
| Extension | `odsl.etl` (Data Loaders) |
| View | **Operations**, **Data Loaders** (feature `odsl.etl.manage`, policy `extension.odsl.etl`) |
| Insight | `odsl.etl.runs` (Data Loader Runs) |
| Actions | `etl_extract`, `etl_transform`, `etl_load`, `etl_report` |
| Home page tasks | `odsl.etl.new-loader`, `odsl.etl.check-loaders`, `odsl.etl.runs` |

---

## Troubleshooting

| What you see | What to do |
|-|-|
| **The ETL actions ... are not in this environment** | Install the extension again, or run its `upload-actions.odsl` script in the environment. |
| **Could not read ... FileNotFoundException** | No file at that URL for that date: check the date placeholders and the **Date to load**. |
| **The source has no rows** | Check the separator, header line, records path or sheet. |
| A column is text when it should be a number | Set the decimal separator, and list texts such as `n/a` as empty values. |
| **is not a date in the format** | Change the field's date format; for `2026-11-06T17:30:00Z` use ISO. |
| **ids are made by more than one sample row** | Add columns to the event id, or the last of those rows replaces the others. |
| **The secret ... could not be read** | Set its value on the Extract step (**Set the value**), or check the secret record name. |
| **uses ..., which is not a variable or a secret** | Add the variable or secret, or correct the name in the URL or headers. |
| **No table rows found at ...** | The page has changed: choose the table again. |
| **This platform does not have the ETL service (etl/v1) deployed yet** | The platform version in use has no `etl` service route, so the page cannot be shown. Type the table selector, or ask your administrator to update the platform. |
| **changed** in the list | The loader was changed after it was deployed: select **Deploy again**. |
