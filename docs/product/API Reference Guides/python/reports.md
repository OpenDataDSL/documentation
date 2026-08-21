---
title: Defining Reports
description: Creating scheduled report definitions with the Python SDK
slug: /sdk/python/reports
sidebar_position: 5
tags:
- python
- sdk
- reports
---

Unlike everything in [Building Payloads with odsl.types](./building-payloads.md), a report definition isn't a field attached to an object -- `types.Report` builds a `reportconfig` record and is written to its own service:

```python
from odsl import sdk, types

odsl = sdk.ODSL()
odsl.setStage('dev')
odsl.loginWithSecret(tenant_id, client_id, secret)

report = (
    types.Report('AAA.PYTHON-REPORT', name='Python Example Report')
    .set_script('#MyReportScript')
    .set_category('Examples')
    .set_cron('0 6 * * MON *')
)
odsl.update('reportconfig', 'private', report.data)
```

This creates the report's *definition* -- what produces it, and on what schedule -- not a generated result; see [`report-example.py`](https://github.com/OpenDataDSL/odsl-python-sdk-demo/blob/main/report-example.py) and `Report`'s docstring in [`odsl/types.py`](https://github.com/OpenDataDSL/odsl-python-sdk/blob/master/odsl/types.py) for more.

## The cron format

:::caution
`set_cron` does **not** take standard 5-field unix cron. The server requires 6 or 7 space-separated fields -- `minute hour dom month dow year [tz]` -- i.e. unix cron plus a required year field, and an optional trailing timezone. A 5-field expression like `'0 6 * * MON'` is missing the year and is rejected.
:::

Each field accepts a number, `*` (any), a list (`1,2,3`), a range (`1-5`), an increment (`*/15`), and, for day-of-week, a day name (`MON`..`SUN`); `year` additionally accepts `*` for "every year" (it doesn't have to be a fixed year), and must otherwise be between 2020 and 2999. `tz`, if given, must be one of `'UTC'` (default), `'EU1'`, `'EU2'`.

For example, 6am every Monday, every year:

```python
report.set_cron('0 6 * * MON *')
```

`set_cron` raises a `ValueError` if the expression doesn't have 6 or 7 fields, so a mistake here (like leaving out the year) is caught immediately rather than only showing up later.

## Scheduling

`set_cron` enables the schedule by default (`enabled=True`), unlike the server's own default of disabled -- since calling `set_cron` at all implies you want the schedule active. Pass `enabled=False`, or call `set_enabled(False)` separately, to save a cron schedule without turning it on yet.
