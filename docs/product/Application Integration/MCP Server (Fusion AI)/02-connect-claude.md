---
title: Connecting Claude
description: Add the Fusion AI MCP server to Claude Desktop or Claude.ai
slug: /product/mcp/connect-claude
sidebar_position: 2
tags: [fusion-ai, mcp, claude, integration]
---

# Connecting Claude to the Fusion AI MCP Server

:::tip The OpenDataDSL plugin for Claude
The easiest way to connect Claude is to add the **OpenDataDSL** plugin from **Customize > Plugins** in Claude. It includes this server and adds skills for writing ODSL scripts, insights and extensions, and it works in Claude, Claude Cowork and Claude Code. See [Build with Claude](/docs/extensions/building/claude). The manual set-up below is for when you want only the server.
:::

## Claude Desktop: add a custom connector (recommended)

The quickest way to connect is to add Fusion AI as a **custom connector**. There is no config file to edit and nothing to install, and once it's added the connector is available everywhere you use Claude with the same account: Claude Desktop, Claude.ai in the browser, Cowork and the mobile apps.

Custom connectors are available on Free, Pro, Max, Team and Enterprise plans (Free plans are limited to one custom connector).

### Pro, Max and Free plans

1. In Claude Desktop, open **Customize > Connectors** (in a browser this is [claude.ai/customize/connectors](https://claude.ai/customize/connectors)).
2. Click **+**, then **Add custom connector**.
3. Enter the details:
   - **Name:** `OpenDataDSL Fusion AI`
   - **Remote MCP server URL:** `https://ai.api.opendatadsl.com/runtime/webhooks/mcp`
4. Click **Continue**. Leave the authentication settings as Claude detects them: no OAuth client ID, secret or request headers are needed, because you sign in from the chat (see step 6).
5. Click **Add**.
6. Open a new chat, make sure the connector is switched on in the **+ > Connectors** menu next to the message box, and ask something that needs your data, for example *"Who am I in OpenDataDSL?"*. The first time, Claude calls `login_start` and gives you a code and a link. Open the link, enter the code and sign in with your normal Microsoft/Entra ID account. See [Signing In](/docs/product/mcp/signing-in) for the full flow.

### Team and Enterprise plans

On Team and Enterprise plans only an Owner (or, on Enterprise, a member whose role allows managing the organization's connectors) can add a custom connector. It's done once for the whole organization:

1. An Owner opens **Organization settings > Connectors** ([claude.ai/admin-settings/connectors](https://claude.ai/admin-settings/connectors)).
2. Click **Add**, hover over **Custom** and select **Web**.
3. Enter the name `OpenDataDSL Fusion AI` and the URL `https://ai.api.opendatadsl.com/runtime/webhooks/mcp`, click **Continue**, keep the detected authentication settings and click **Add**.

Each member then opens **Customize > Connectors**, finds **OpenDataDSL Fusion AI** in the list (it carries a **Custom** label), clicks **Connect**, and signs in from the chat as in step 6 above. Every member signs in as themselves, so each person only sees the data their own OpenDataDSL account can access.

:::note Where the connection comes from
A custom connector is brokered through your Claude account, so calls to the Fusion AI server come from Anthropic's cloud rather than from your own computer. That works with the hosted OpenDataDSL server as-is. If your organization restricts inbound traffic by IP address, use the config-file method below instead, which connects from your own machine.
:::

## Claude Desktop: config file (local bridge)

As an alternative, Claude Desktop's configuration file lets you add remote MCP servers using a small local bridge process ([`mcp-remote`](https://www.npmjs.com/package/mcp-remote)), which relays traffic between Claude and the hosted server. Use this if you'd rather the connection run from your own machine, or if custom connectors aren't available to you. Config-file servers only work in Claude Desktop, not in Claude.ai or cloud Cowork sessions.

### 1. Locate your configuration file

| Platform | Path |
|---|---|
| Windows | `%APPDATA%\Claude\claude_desktop_config.json` |
| macOS | `~/Library/Application Support/Claude/claude_desktop_config.json` |

If the file doesn't exist yet, create it. You can open the folder directly from Claude Desktop via **Settings → Developer → Edit Config**.

### 2. Add the Fusion AI server

**Windows:**

```json
{
  "mcpServers": {
    "odsl-fusion-ai": {
      "command": "cmd",
      "args": [
        "/c",
        "npx",
        "-y",
        "mcp-remote",
        "https://ai.api.opendatadsl.com/runtime/webhooks/mcp"
      ]
    }
  }
}
```

**macOS / Linux** (no `cmd /c` wrapper is needed outside Windows):

```json
{
  "mcpServers": {
    "odsl-fusion-ai": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://ai.api.opendatadsl.com/runtime/webhooks/mcp"
      ]
    }
  }
}
```

If you already have other `mcpServers` entries configured, just add `"odsl-fusion-ai"` as an additional key rather than replacing the file.

You'll need [Node.js](https://nodejs.org) installed so that `npx` is available on your `PATH` - Claude Desktop launches this command itself, so there's nothing to run manually beyond having Node installed once.

### 3. Restart Claude Desktop

Fully quit and reopen Claude Desktop (not just close the window) for it to pick up the new configuration.

### 4. Verify the connection

Open a new chat and check the tools/connectors icon (usually a hammer or plug icon near the message box) - you should see **odsl-fusion-ai** listed with its tools. If it's not there, see [Troubleshooting](#troubleshooting) below.

### 5. Sign in

Ask Claude something that needs your data, e.g. *"What ICE data do we have for Natural Gas?"*. The first time, Claude will call `login_start` and give you a code and a link - see [Signing In](/docs/product/mcp/signing-in) for the full flow.

## Troubleshooting

- **Custom connector added but no tools appear** - check the connector is switched on for the chat in the **+ > Connectors** menu, and that the URL ends in `/runtime/webhooks/mcp`.
- **"Add custom connector" is missing (Team/Enterprise)** - only Owners can add custom connectors for an organization; ask an Owner to add it, then connect to it from **Customize > Connectors**.
- **Server doesn't appear in the tools list** - double check the JSON is valid (no trailing commas, matching braces) and that you fully restarted the app.
- **`npx` / `command not found` errors** - confirm Node.js is installed and `npx` works from a regular terminal (`npx --version`).
- **Tool calls fail with an authentication error even after signing in** - the sign-in session can expire; just ask Claude to sign you in again and it will call `login_start` again.
