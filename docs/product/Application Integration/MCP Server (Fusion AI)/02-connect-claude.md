---
title: Connecting Claude
description: Add the Fusion AI MCP server to Claude Desktop or Claude.ai
slug: /product/mcp/connect-claude
sidebar_position: 2
tags: [fusion-ai, mcp, claude, integration]
---

# Connecting Claude to the Fusion AI MCP Server

## Claude Desktop

Claude Desktop's configuration file lets you add remote MCP servers using a small local bridge process ([`mcp-remote`](https://www.npmjs.com/package/mcp-remote)), which relays traffic between Claude and the hosted server. This is the recommended and confirmed-working setup.

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
        "https://ai.api.opendatadsl.com/runtime/webhooks/mcp/sse"
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
        "https://ai.api.opendatadsl.com/runtime/webhooks/mcp/sse"
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

## Claude.ai / native remote connectors

Some Claude plans support adding remote MCP servers directly from **Settings → Connectors → Add custom connector**, without the `mcp-remote` bridge, since the server already speaks the remote MCP (SSE) protocol natively. If that option is available to you, you can add:

- **Name:** OpenDataDSL Fusion AI
- **URL:** `https://ai.api.opendatadsl.com/runtime/webhooks/mcp/sse`

and skip the config file entirely. The `mcp-remote`-based config above is the one that's been confirmed to work end-to-end and is the recommended fallback if a native connector option isn't available on your plan.

## Troubleshooting

- **Server doesn't appear in the tools list** - double check the JSON is valid (no trailing commas, matching braces) and that you fully restarted the app.
- **`npx` / `command not found` errors** - confirm Node.js is installed and `npx` works from a regular terminal (`npx --version`).
- **Tool calls fail with an authentication error even after signing in** - the sign-in session can expire; just ask Claude to sign you in again and it will call `login_start` again.
