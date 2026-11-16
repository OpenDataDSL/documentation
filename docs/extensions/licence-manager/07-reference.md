---
title: Reference
description: Where Data Licences keeps its records, the renewal rules, the reminder process, permissions, extension contents and troubleshooting
slug: /extensions/licence-manager/reference
sidebar_position: 7
tags: [extension, data licences, reference]
---

# Reference

## Where things are kept

| What | Service | Id |
|-|-|-|
| Licences | Object service, private collection `data_licence` | The licence code, such as `ICE-ENDEX` |
| Feeds that need no licence | Object service, private collection `data_licence` | `SETTINGS` |
| Costs | Object service, private collection `data_licence_cost` | The licence code |
| The daily check | Process service | `LICENCE_REMINDERS` |
| Reminders | Alert service, private alerts | Alert ids such as `ALR-2026-1204`, key `licence/<code>/<issue>/<deadline>` |

---

## A licence

```json
{
  "_id": "ICE-ENDEX",
  "code": "ICE-ENDEX",
  "kind": "licence",
  "name": "ICE Endex end of day",
  "vendor": "ICE",
  "contractRef": "ICE-NG-2024-118",
  "licensee": "Northgate Energy Trading Ltd",
  "type": "end-of-day",
  "status": "active",
  "owner": "priya.shah@northgate-energy.com",
  "start": "2024-02-01",
  "end": "2027-01-31",
  "autoRenew": true,
  "renewalMonths": 12,
  "noticeDays": 60,
  "reminders": true,
  "feeds": ["ICE.NDEX"],
  "usage": {"display": true, "nonDisplay": true, "derived": true},
  "users": 12,
  "authorisation": {"status": "confirmed", "date": "2024-02-05", "reference": "ICE-SF-77310"},
  "documents": [{"label": "Signed order form 2024", "url": "https://northgate.sharepoint.com/sites/marketdata/ICE-order-2024.pdf"}],
  "changes": [{"at": "2026-02-03T10:02:00Z", "by": "priya.shah@northgate-energy.com", "text": "Changed permitted users 10 -> 12"}]
}
```

| Field | Notes |
|-|-|
| `status` | `draft`, `active`, `cancelled` (notice given) or `ended` |
| `type` | `end-of-day`, `delayed`, `real-time`, `historical`, `enterprise` or `other` |
| `signed`, `start`, `end` | Dates as `yyyy-MM-dd` |
| `autoRenew`, `renewalMonths`, `noticeDays`, `remindDays`, `reminders` | The term and renewal; `remindDays` empty uses the process default, `reminders: false` turns reminders off |
| `feeds` | Provider (`ICE`) or provider and feed (`ICE.NDEX`) |
| `usage` | `display`, `nonDisplay`, `derived`, `redistribution`, `historical` |
| `users`, `namedUsers`, `sites`, `permittedUse` | Usage records |
| `vendorContact` | `name`, `email`, `phone` |
| `authorisation` | `status` (`not-needed`, `requested`, `confirmed`), `date`, `reference` |
| `documents` | Links: `label`, `url` |
| `changes` | The history, newest first, at most 50 |
| `created`, `createdBy`, `updated`, `updatedBy` | Set when saved |

Costs have the same `_id` and the fields `licence`, `currency`, `annualFee`, `billing`, `nextInvoice`, `uplift`, `poNumber`, `costCentre`, `notes`, `updated` and `updatedBy`.

---

## The rules

| Rule | Detail |
|-|-|
| Never due | Drafts, ended licences, licences with reminders off and licences with no term end |
| Rolling on | A licence that renews automatically (and has no notice given) whose term end has passed rolls on by its renewal term (12 months when empty) until the term end is today or later |
| Deadline | The term end minus the notice period when it renews automatically and has a notice period; otherwise the term end |
| Due | From the deadline minus the reminder days (the licence's, else the process default, else 90) up to the deadline |
| Expired | A licence that does not renew automatically, still **Active** after its term end |
| Severity | High within 14 days and when expired, medium within 45 days, low otherwise |

---

## The reminder process

| Setting | Value |
|-|-|
| Name | `LICENCE_REMINDERS` |
| Service | `Licences` |
| Script | `odsl-extensions\extensions\licence_manager\odsl.licence_manager.reminders` |
| Schedule | From the Reminders tab, for example `0 7 * * * * EU1` (every day at 07:00 UK time) |
| Input | `remindDays` (default reminder days), `agent` (`client` or `opendatadsl`) |

Run it for another day with a run body such as `{"today": "2027-01-10"}`, for example to see which reminders a date would raise. The process is not part of the extension's resources: it is created the first time you save the Reminders tab.

---

## Permissions

| Policy | What it allows |
|-|-|
| `extension.odsl.licence_manager` | The Data Licences screen |
| `DataLicences` | Reading, creating, changing and deleting licences (`object/data_licence`) |
| `DataLicenceCosts` | Reading and changing costs (`object/data_licence_cost`) |

The Feed coverage tab reads the datasets you follow (the dataset service), the reminders need access to the alert service (the Alerts extension installs it), and the Reminders tab creates and runs a process (the process service).

---

## Extension contents

| Type | Id |
|-|-|
| Extension | `odsl.licence_manager`, menu **Manage > Data Licences** |
| Feature | `odsl.licence_manager.manage` |
| Policies | `extension.odsl.licence_manager`, `DataLicences`, `DataLicenceCosts` |
| Scripts | `odsl.licence_manager.manage`, `odsl.licence_manager.common`, `odsl.licence_manager.reminders` |
| Home page tasks | `odsl.licence_manager.review`, `odsl.licence_manager.new`, `odsl.licence_manager.coverage` |

---

## Troubleshooting

| What you see | Why, and what to do |
|-|-|
| *The licences could not be read ... DataLicences security policy* | You are not a member of the `DataLicences` policy. Ask an administrator to add you |
| No Costs tab | You are not a member of `DataLicenceCosts`, so costs are hidden from you |
| **Feeds without a licence** shows - | Your followed datasets could not be read |
| A reminder did not close after a renewal | Reminders close at the next daily check. Use **Run the check now** on the Reminders tab to close it at once |
| No reminders at all | Check the Reminders tab: the check must be on, and the licence must have **Send reminders** ticked and a term end |
| The Home page task shows no count | The task counts open private alerts of category `licence`; the Home and Alerts extensions must be installed |
