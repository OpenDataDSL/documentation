---
title: The Webhook plug-in
description: Posts curves and timeseries as JSON to a webhook or HTTP endpoint
slug: /extensions/integration/plugins/webhook
sidebar_position: 6
catalog_title: Webhook
catalog_image: /img/extensions/integration/webhook-card.png
plugin_id: odsl.integration_webhook
plugin_sends: [Curves, Timeseries, JSON]
tags: [extension, integration, plug-in, generic, webhook, http, rest]
---

# The Webhook plug-in

The Webhook Integration extension (`odsl.integration_webhook`) posts curves and timeseries as JSON to any HTTP endpoint: a webhook, an Azure Function or Logic App, Power Automate, or your own API.

---

## What it needs

Once installed, the plug-in's codes, settings and secrets are listed on the **Plug-in** tab of the Integrations screen when **Webhook** is chosen under **System**.

![The Plug-in tab for Webhook with its identity, group settings and secrets](/img/extensions/integration/webhook-plugin.png)

| Kind | Name | What it is |
|-|-|-|
| Identity | `webhook_code` | The code the receiving system knows the curve or timeseries by. Left empty, the data id is sent, such as `NGE.GAS.TTF:MID`. |
| Group setting | **URL** (`url`) | The address the JSON is posted to. |
| Group setting | **Token header** (`tokenHeader`) | `Authorization` unless you change it. The header the token secret is sent in, when it is set. |
| Group setting | **Messages** (`layout`) | `item` or `group`, `group` unless you change it. `item`: one message or file per curve or timeseries; `group`: one for the whole run. |
| Group setting | **Most items in one message** (`maxItems`) | `100` unless you change it. With one message per group, a bigger group is sent in several messages, each with `part` and `parts`. |
| Group setting | **Send** (`send`) | Ticked unless you change it. Untick for a dry run: everything is built and counted, nothing is sent. |
| Secret, kept in `integration_webhook_token` | **Token** (`token`) | Sent in the token header, for example Bearer and the token; leave it unset when the endpoint needs none. |

Set the secret values in the **Secrets** part of the **Plug-in** tab (see [Getting started](/docs/extensions/integration/getting-started#2-set-the-secrets)). A group can use its own secret records instead, named on its **Settings** tab, for example to send to a second account.

---

## How it sends

With **Messages** set to `group` (the default), a run posts the whole group in one request, split into several when it has more items than **Most items in one message**. With `item`, each curve or timeseries is one request.

Each request is a `POST` with `content-type: application/json`. When the **Token** secret is set, it is sent in the **Token header**, `Authorization` unless you change it, so a token secret of `Bearer abc123` gives `Authorization: Bearer abc123`.

An answer with a status other than 2xx is a failure, with the status in the message. With one request per group, every item of the group is then marked failed with that message.

What each message or file holds, the CSV columns and the file names are the same for every generic plug-in: see [What the generic plug-ins send](/docs/extensions/integration/plugins/generic-content).

---

## Examples

Northgate Energy posts its curves to a Power Automate flow:

| Setting | Value |
|-|-|
| **URL** | The flow's HTTP trigger URL |
| **Messages** | `group` |

The flow gets `{"system": "Webhook", "group": "NGE_CURVES", "ondate": "2026-11-03", "part": 1, "parts": 1, "count": 2, "items": [...]}`.

---

## One plug-in, several destinations

Each group sending to Webhook has its own settings, so groups can already send to different endpoints. To keep destinations apart, with their own secrets, report and groups, select **Copy to a new system** on the **Plug-in** tab (see [Copying a system](/docs/extensions/integration/custom-systems#copying-a-system)). The copy uses this plug-in's ODSL, so it gets its updates.

---

## Next

- [All plug-ins](/docs/extensions/integration/plugins): every system with a ready-made plug-in.
- [What the generic plug-ins send](/docs/extensions/integration/plugins/generic-content): the messages, rows and file names.
- [Integration reference](/docs/extensions/integration/reference): where everything is kept, and troubleshooting.
