---
title: Alerts in Python
description: Find, read, raise, comment on, hand over and close alerts from Python with the odsl package
slug: /extensions/alerts/python
sidebar_position: 5
tags: [extension, alerts, python, sdk]
---

# Alerts in Python

The [Python SDK](/docs/sdk/python/getting-started) (`pip install odsl`) reads alerts with `list` and `get`, and changes or raises them with `update`. The same rules apply as in the portal: you can change your own alerts, and only comment on shared ones.

```python
import json
from odsl import sdk

odsl = sdk.ODSL()
odsl.login()
```

:::note Data environment
The SDK works with your alerts in the production data environment. To work in another environment, use the REST API with the `x-odsl-environment` header, as in [Using requests](#using-requests) below.
:::

---

## Find alerts

`list` takes the usual query parameters. Filters and sorts are JSON:

```python
alerts = odsl.list('alert', 'private', {
    '_filter': json.dumps({'status': 'open', 'severity': {'$in': ['critical', 'high']}}),
    '_sort': json.dumps({'created.at': -1}),
    '_limit': 50
})
for a in alerts:
    print(a['_id'], a['severity'], a['agent'], a['title'])
```

Use `'common'` or `'public'` instead of `'private'` for shared alerts, for example the open alerts about one dataset:

```python
shared = odsl.list('alert', 'common', {
    '_filter': json.dumps({'status': 'open', 'subject.id': 'EEX.PWR.DE'})
})
```

---

## Read an alert

```python
a = odsl.get('alert', 'private', 'ALR-2026-000401')
print(a['title'], a['status'], a['agent'])
for e in a['timeline']:
    print(e['type'], e.get('by'), e.get('text', ''))

s = odsl.get('alert', 'common', 'ALC-2026-000407')
```

---

## Comment, change and close

`update` sends the alert's `_id` and the fields to change. Send only what changes, plus the `_version` you read so that the change is refused if someone else changed the alert meanwhile:

```python
a = odsl.get('alert', 'private', 'ALR-2026-000402')

# Comment
odsl.update('alert', 'private', {'_id': a['_id'], '_version': a['_version'],
    'comment': 'The broker file is in our SFTP folder but did not load'})

# Hand to OpenDataDSL with a comment (read again: the comment made a new version)
a = odsl.get('alert', 'private', 'ALR-2026-000402')
odsl.update('alert', 'private', {'_id': a['_id'], '_version': a['_version'],
    'agent': 'opendatadsl', 'comment': 'Can you check the loader?'})

# Close
a = odsl.get('alert', 'private', 'ALR-2026-000402')
odsl.update('alert', 'private', {'_id': a['_id'], '_version': a['_version'],
    'status': 'closed', 'resolution': 'Loader fixed by OpenDataDSL; file reloaded at 10:15'})
```

The fields you can change are `status`, `resolution`, `agent`, `severity`, `comment`, `title`, `description`, `assignee` and `tags` (see [Alerts in ODSL](/docs/extensions/alerts/odsl#change-an-alert)). Without `_version`, the change is made to the alert as it is now.

A comment on a shared alert works the same way. The `ALC-` or `ALP-` id says where the alert is; the comment is only seen by your team and OpenDataDSL:

```python
odsl.update('alert', 'common', {'_id': 'ALC-2026-000407',
    'comment': 'Our month-end report waits for this file'})
```

:::caution
`update` prints the HTTP status and returns nothing. A refused change prints the reason (from the `x-odsl-error` header), for example `has been changed by someone else, reload it and try again`. Check the printed status, or use [requests](#using-requests) when a script must know whether the change was made.
:::

---

## Raise an alert

Send an alert without an `_id`:

```python
odsl.update('alert', 'private', {
    'title': 'NGE.BROKER.NBP prices look stale since Monday',
    'message': 'The broker NBP Day-ahead and Month+1 have not changed for three days',
    'severity': 'high',
    'issue': 'quality',
    'agent': 'opendatadsl',
    'subject': {'service': 'dataset', 'id': 'NGE.BROKER.NBP'},
    'key': 'northgate/stale/NGE.BROKER.NBP'
})

# Find it by its key
found = odsl.list('alert', 'private', {'_filter': json.dumps(
    {'key': 'northgate/stale/NGE.BROKER.NBP', 'status': 'open'})})
print(found[0]['_id'], found[0]['occurrences'])
```

The fields are those of [Raise an alert](/docs/extensions/alerts/odsl#raise-an-alert) in ODSL. Raising again with the key of an open alert counts another occurrence instead of creating a new alert.

---

## Using requests

For anything the SDK methods do not cover (the new alert or changed alert in the response, edit or delete a comment, another data environment), call the [REST API](/docs/extensions/alerts/rest-api) with `requests` and the SDK's sign-in:

```python
import requests

base = odsl.url + 'alert/v1/'
headers = dict(odsl.credentials)
headers['x-odsl-environment'] = 'test1'     # leave out for production

# Raise and get the new alert back
r = requests.post(base + 'private', headers=headers, json={
    'title': 'Test curve build failed', 'severity': 'low', 'agent': 'client'})
r.raise_for_status()
alert = r.json()
print(alert['_id'])

# Comment
r = requests.post(base + 'private/' + alert['_id'] + '/comment', headers=headers,
    json={'text': 'Rerun after the calendar fix'})

# Close
r = requests.patch(base + 'private/' + alert['_id'], headers=headers,
    json={'status': 'closed', 'resolution': 'Calendar fixed', '_version': r.json()['_version']})
if not r.ok:
    print(r.status_code, r.headers.get('x-odsl-error'))
```

---

## Next

[Alerts REST API](/docs/extensions/alerts/rest-api)
