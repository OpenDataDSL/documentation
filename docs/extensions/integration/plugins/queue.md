---
title: The Message queue plug-in
description: Sends curves, timeseries and options as JSON messages to one of your company's platform queues (Azure Service Bus), for any system that reads the queue
slug: /extensions/integration/plugins/queue
sidebar_position: 2
catalog_title: Message queue
catalog_image: /img/extensions/integration/queue-card.png
plugin_id: odsl.integration_queue
plugin_sends: [Curves, Timeseries]
tags: [extension, integration, plug-in, generic, queue, service bus]
---

# The Message queue plug-in

The Message Queue Integration extension (`odsl.integration_queue`) sends curves, timeseries and options as JSON messages to one of your company's queues on the platform, the Azure Service Bus queues used with `send ... to`. Any system that reads the queue, with the queue's connection string, gets the data as it is sent.

---

## What it needs

Once installed, the plug-in's codes, settings and secrets are listed on the **Plug-in** tab of the Integrations screen when **Message queue** is chosen under **System**.

![The Plug-in tab for Message queue with its identity, group settings and secrets](/img/extensions/integration/queue-plugin.png)

| Kind | Name | What it is |
|-|-|-|
| Identity | `queue_code` | The code the receiving system knows the data by. Left empty, the data id is sent, such as `NGE.GAS.TTF:MID`. |
| Group setting | **Queue** (`queue`) | The name of one of your company's queues on the platform; the receiving system reads it with the queue's connection string. |
| Group setting | **Messages** (`layout`) | `item` or `group`, `item` unless you change it. `item`: one message or file per data item; `group`: one for the whole run. |
| Group setting | **Most items in one message** (`maxItems`) | `100` unless you change it. With one message per group, a bigger group is sent in several messages, each with `part` and `parts`. |
| Group setting | **Transformer** (`transformer`) | Optional: the name of a mustache script (`#` for a public one) to transform the data with. Its text is sent instead of the JSON or CSV. See [Transforming with a Mustache template](/docs/extensions/integration/plugins/generic-content#transforming-with-a-mustache-template). |
| Group setting | **Content type** (`contentType`) | With a transformer: the content type of its text, such as `text/csv` or `application/xml`, `text/plain` unless you change it. |
| Group setting | **Send** (`send`) | Ticked unless you change it. Untick for a dry run: everything is built and counted, nothing is sent. |

---

## How it sends

With **Messages** set to `item` (the default), each curve or timeseries is one message, sent as soon as it is read. With `group`, the whole group is one message with every item in it; a group with more items than **Most items in one message** is sent as several messages, each with `part` and `parts`.

The platform gives each message the id of the run (its `_id`), so the receiving system can tell which messages came from the same run.

What each message or file holds, the CSV columns and the file names are the same for every generic plug-in: see [What the generic plug-ins send](/docs/extensions/integration/plugins/generic-content).

:::note
The queue must be one of your company's queues on the platform. Queues in your own Azure subscription, and Azure Event Hubs, are not supported yet: sending to them needs a signature the plug-ins cannot make. Use the [Webhook plug-in](/docs/extensions/integration/plugins/webhook) with a receiving endpoint, or the [Azure Event Grid plug-in](/docs/extensions/integration/plugins/eventgrid), instead.
:::

---

## Examples

Northgate Energy sends its gas curves to a queue its risk system reads:

| Setting | Value |
|-|-|
| **Queue** | `nge_risk_marks` |
| **Messages** | `item` |

Each run sends one message per curve, such as `{"id": "NGE.GAS.TTF:MID", "code": "Q.TTF", "kind": "curve", "ondate": "2026-11-03", "values": [{"tenor": "M01", "start": "2026-12-01", "value": 32.15}, ...]}`.

---

## One plug-in, several destinations

Each group sending to Message queue has its own settings, so groups can already send to different queues. To keep destinations apart, with their own secrets, report and groups, select **Copy to a new system** on the **Plug-in** tab (see [Copying a system](/docs/extensions/integration/custom-systems#copying-a-system)). The copy uses this plug-in's ODSL, so it gets its updates.

---

## Next

- [All plug-ins](/docs/extensions/integration/plugins): every system with a ready-made plug-in.
- [What the generic plug-ins send](/docs/extensions/integration/plugins/generic-content): the messages, rows and file names.
- [Integration reference](/docs/extensions/integration/reference): where everything is kept, and troubleshooting.
