---
title: Connecting ChatGPT
description: Add the Fusion AI MCP server to ChatGPT as a custom connector
slug: /product/mcp/connect-chatgpt
sidebar_position: 3
tags: [fusion-ai, mcp, chatgpt, integration]
---

# Connecting ChatGPT to the Fusion AI MCP Server

ChatGPT can connect to remote MCP servers as a **custom connector**. This is available on plans that support developer/custom connectors (Plus, Pro, Team, Enterprise/Business tiers) - availability and exact menu names can vary as OpenAI rolls the feature out, so use this as a guide rather than a pixel-perfect walkthrough.

:::note
Unlike the Claude Desktop config file, ChatGPT does not need a local `mcp-remote` bridge - it talks to the hosted SSE endpoint directly.
:::

### 1. Turn on developer mode / custom connectors

In ChatGPT, go to **Settings → Connectors**. If you don't see an option to add a custom connector, look under **Settings → Connectors → Advanced settings** (sometimes labelled **Developer mode**) and enable it - custom connectors are hidden behind this toggle on most plans.

### 2. Create the connector

From **Settings → Connectors**, choose **Create** (or **Add custom connector**) and fill in:

| Field | Value |
|---|---|
| Name | OpenDataDSL Fusion AI |
| Description | Fusion AI tools for the OpenDataDSL platform |
| MCP Server URL | `https://ai.api.opendatadsl.com/runtime/webhooks/mcp/sse` |
| Authentication | **No authentication** |

Choose **No authentication** here because the server handles sign-in itself, through the `login_start` / `login_complete` tools described in [Signing In](/docs/product/mcp/signing-in), rather than through an OAuth handshake at connector setup time.

You may see a warning that this is a third-party/unverified connector - this is expected for an internal company tool; confirm you trust it to continue.

### 3. Enable it in a chat

Start a new chat, open the **tools / connectors picker** (usually the `+` button next to the message box), and turn on **OpenDataDSL Fusion AI**. Depending on your ChatGPT version, custom connector tools may only be available in specific modes (e.g. with "Developer Mode" or an agent/deep-research mode enabled) - if you don't see the tools appear, check that the connector is switched on for that chat.

### 4. Sign in

Ask a question that needs your data, e.g. *"What ICE data do we have for Natural Gas?"*. ChatGPT will call `login_start` and return a code and link for you to complete sign-in with your Microsoft/Entra account - see [Signing In](/docs/product/mcp/signing-in).

## Troubleshooting

- **Can't find "custom connectors"** - it's usually nested under an "Advanced" or "Developer mode" toggle in Connector settings; this varies by ChatGPT plan.
- **Connector added but no tools show up in chat** - check the tools/connectors picker for the current chat; connectors are usually enabled per-chat, not globally.
- **Login code says it's expired** - device codes are only valid for 15 minutes; just ask again and a fresh code/link will be issued.
