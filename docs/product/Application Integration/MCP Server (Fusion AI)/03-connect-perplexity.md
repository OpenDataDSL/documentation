---
title: Connecting Perplexity
description: Add the Fusion AI MCP server to Perplexity as a custom remote connector
slug: /product/mcp/connect-perplexity
sidebar_position: 3.1
tags: [fusion-ai, mcp, perplexity, integration]
---

# Connecting Perplexity to the Fusion AI MCP Server

Perplexity can connect to remote MCP servers as a **custom remote connector**. Custom connectors are available on Perplexity's paid plans (Pro, Max and Enterprise). Perplexity moves its menus around fairly often, so treat the menu names below as a guide.

:::note
Perplexity talks to the hosted MCP endpoint directly. There is nothing to install and no config file to edit.
:::

## Personal accounts (Pro and Max)

### 1. Open the connector settings

In Perplexity, open **Plugins** in the sidebar. If you don't see it, use **Customize > Connectors** instead.

### 2. Add the connector

Click **Add custom > Connector > Add MCP connector** (on some versions this is a **+ Custom connector** button), choose **Remote**, and fill in:

| Field | Value |
|---|---|
| Name | OpenDataDSL Fusion AI |
| MCP Server URL | `https://ai.api.opendatadsl.com/runtime/webhooks/mcp` |
| Description | Fusion AI tools for the OpenDataDSL platform |
| Authentication | **None** |
| Transport | **Streamable HTTP** |

Choose **None** for authentication. The server handles sign-in itself, through the `login_start` and `login_complete` tools described in [Signing In](/docs/product/mcp/signing-in), rather than through an OAuth handshake when the connector is added. Do not enter an OAuth client ID, secret or API key.

Make sure the URL ends in `/mcp`, not `/mcp/sse`. The `/sse` address is the older SSE transport, and pairing it with the Streamable HTTP setting will fail validation.

### 3. Confirm and add

Tick the box confirming you understand the risks of custom connectors, then click **Add**. The connector appears on your **Plugins** page. Click its card to enable it.

### 4. Sign in

Start a new thread, make sure **OpenDataDSL Fusion AI** is switched on in the sources or connectors menu next to the message box, and ask something that needs your data, for example *"Who am I in OpenDataDSL?"*. The first time, Perplexity calls `login_start` and shows you a code and a link. Open the link, enter the code and sign in with your normal Microsoft/Entra ID account. See [Signing In](/docs/product/mcp/signing-in) for the full flow.

## Enterprise organizations

On Perplexity Enterprise, members can only add custom connectors if an admin allows it. An admin has two options, both under **Enterprise settings > Connectors** (the **Connector permissions** section):

- **Let members add it themselves:** turn on **Allow members to add custom connectors** (it is off by default). Each member then follows the personal steps above.
- **Add it once for everyone:** use **Add organization-wide remote connectors** (or **+ Custom connector**) with the same values as the table above, then share it with the organization from the **Permissions** screen. Organization-wide connectors can take a little while to appear for members.

Either way, every member signs in as themselves from the chat, so each person only sees the data their own OpenDataDSL account can access.

## Troubleshooting

- **No option to add a custom connector:** custom connectors need a paid plan. On Enterprise, ask your Perplexity admin to allow members to add custom connectors, or to add Fusion AI for the whole organization.
- **"Validation failed" when adding the connector:** check the URL is exactly `https://ai.api.opendatadsl.com/runtime/webhooks/mcp`, the transport is **Streamable HTTP** and authentication is **None**.
- **Connector added but Perplexity doesn't use it:** check the connector is switched on for the current thread, then ask a question that clearly needs OpenDataDSL data.
- **Login code says it's expired:** device codes are only valid for 15 minutes. Just ask again and a fresh code and link will be issued.
