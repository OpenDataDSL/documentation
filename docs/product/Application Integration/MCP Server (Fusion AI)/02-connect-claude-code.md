---
title: Connecting Claude Code
description: Add the Fusion AI MCP server to Claude Code, for yourself or for a whole repository
slug: /product/mcp/connect-claude-code
sidebar_position: 2.5
tags: [fusion-ai, mcp, claude, claude-code, integration]
---

# Connecting Claude Code to the Fusion AI MCP Server

[Claude Code](https://code.claude.com) is Anthropic's coding assistant for the terminal, IDEs and desktop. Connected to Fusion AI, it can look up your data, curves, types, scripts and processes while it works on your code, and validate and save ODSL scripts to your tenant.

:::tip The OpenDataDSL plugin for Claude
If you're building ODSL scripts, insights or extensions, install the **OpenDataDSL** plugin instead of adding the server by hand. It includes this server and adds skills that teach Claude the ODSL language and the house style. In a Claude Code session, run `/plugin`, find **OpenDataDSL** on the **Discover** tab and install it. See [Build with Claude](/docs/extensions/building/claude). The manual set-up below is for when you want only the server.
:::

Claude Code talks to the hosted MCP endpoint directly using the Streamable HTTP transport. There is nothing extra to install, and no OAuth settings or headers are needed.

## Add the server for yourself

Run this in a terminal:

```bash
claude mcp add --transport http --scope user odsl-fusion-ai https://ai.api.opendatadsl.com/runtime/webhooks/mcp
```

`--scope user` makes Fusion AI available in every project on your machine. Leave it out to add the server only for the project in your current folder.

## Add the server for a whole repository

To share the server with everyone working in a repository, add it with `--scope project`:

```bash
claude mcp add --transport http --scope project odsl-fusion-ai https://ai.api.opendatadsl.com/runtime/webhooks/mcp
```

This writes a `.mcp.json` file at the root of the repository. You can also create the file yourself:

```json
{
  "mcpServers": {
    "odsl-fusion-ai": {
      "type": "http",
      "url": "https://ai.api.opendatadsl.com/runtime/webhooks/mcp"
    }
  }
}
```

Commit `.mcp.json` like any other file. It contains no credentials, because each person signs in as themselves (see below). The first time a colleague opens the repository in Claude Code, they're asked to approve the project's MCP servers.

## Check the connection

Start Claude Code and run `/mcp`. **odsl-fusion-ai** should be listed as connected, with its tools. You can also check from a terminal with:

```bash
claude mcp list
```

## Sign in

Ask something that needs your data, for example *"Who am I in OpenDataDSL?"*. The first time, Claude calls `login_start` and shows you a code and a link. Open the link, enter the code and sign in with your normal Microsoft/Entra ID account, then tell Claude you're done. See [Signing In](/docs/product/mcp/signing-in) for the full flow.

Each Claude Code session signs in separately. If you start a new session, Claude asks you to sign in again the first time it needs your data.

## Tool permissions

By default Claude Code asks before it uses each tool. To stop it asking for Fusion AI tools, choose **Yes, and don't ask again** when prompted, or add the server to the `allow` list in your Claude Code settings (`.claude/settings.json` for a repository, or `~/.claude/settings.json` for yourself):

```json
{
  "permissions": {
    "allow": ["mcp__odsl-fusion-ai"]
  }
}
```

Tools that change things in your tenant, such as `save_script`, `run_process` or `send_email`, always run as you, so only allow them if you're happy for Claude to use them without asking.

## Troubleshooting

- **The server shows as failed in `/mcp`:** check the URL ends in `/mcp`, not `/mcp/sse`, and that `--transport http` was used. Remove the entry with `claude mcp remove odsl-fusion-ai` and add it again.
- **The server doesn't appear in a repository:** project servers from `.mcp.json` need approving the first time you open the repository. Run `/mcp` to see and approve them.
- **Tool calls fail with an authentication error after signing in:** the sign-in session can expire. Just ask Claude to sign you in again and it will call `login_start` again.
- **Login code says it's expired:** device codes are only valid for 15 minutes. Just ask again and a fresh code and link will be issued.
