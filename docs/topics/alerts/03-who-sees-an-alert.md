---
title: Who sees an alert
description: Your own alerts and shared alerts about common and public data, data environments, followed datasets, comments only your team sees, and who can change what
slug: /topics/alerts/who-sees-an-alert
sidebar_position: 3
tags: [topics, alerts, shared data, permissions, security]
---

# Who sees an alert

Every alert is either one of **your alerts**, about your own data, or a **shared alert** about the common and public data that many companies use.

---

## Your alerts and shared alerts

| Kind | Ids | Who sees it | Who changes it |
|-|-|-|-|
| Your alerts | `ALR-` | Your company and OpenDataDSL | Your company and OpenDataDSL |
| Shared alerts about common data | `ALC-` | Everyone who uses the data | OpenDataDSL. You can add comments that only your company and OpenDataDSL see |
| Shared alerts about public data | `ALP-` | Everyone | As common data |

When an exchange publishes a settlement file late, OpenDataDSL raises and manages one shared alert for everyone who uses that data, instead of every company raising its own.

---

## Data environments

Your alerts belong to the data environment they were raised in (production, test1 and so on). You see the alerts of the environment you are working in; switch environment in the portal to see another's.

---

## Followed datasets

The common and public datasets your company has added to its own datasets are the datasets you **follow**. The Alerts screen shows, by default, your own alerts and the shared alerts about the datasets you follow, so you see the shared problems that affect you without the ones that do not.

---

## Comments on shared alerts

Your team can comment on a shared alert to say how the problem affects you, or to ask OpenDataDSL something. Those comments are kept apart from the shared alert: only your company and OpenDataDSL see them, never other companies. The same goes for your problems recorded on a shared [root cause](/docs/topics/alerts/root-causes-and-traces).

---

## Who can do what

| Action | Who |
|-|-|
| Read your alerts | Your company's users, in the data environment they are working in |
| Raise, comment on, hand over, change the priority of, close and reopen your alerts | Your company's users |
| Edit or delete a comment | Its author, an administrator of your company, or OpenDataDSL |
| Delete an alert | An administrator of your company |
| Change a shared alert (other than comments) | OpenDataDSL only |
| Work on every company's alerts | OpenDataDSL support |

The [Alerts extension](/docs/extensions/alerts/overview) installs the security policies that let your users read and work on alerts. Without them, users see no alerts. The platform still applies the limits above whatever the policies allow. See [Who can do what](/docs/extensions/alerts/reference#who-can-do-what) in the Alerts reference.

---

## Next

[Root causes and traces](/docs/topics/alerts/root-causes-and-traces)
