---
title: Overview
description: What the Fusion AI MCP server is, what it lets you do, and how it's secured
slug: /product/mcp/overview
sidebar_position: 1
tags: [fusion-ai, mcp, integration, ai-assistant]
---

# Fusion AI MCP Server

OpenDataDSL exposes Fusion AI as a standard [Model Context Protocol](https://modelcontextprotocol.io) (MCP) server. This lets you talk to your own OpenDataDSL environment - your data, curves, processes, reports, alerts and more - from any MCP-compatible AI client, including Claude and ChatGPT, using plain language instead of the REST API or the ODSL scripting language directly.

The server is hosted for you; there is nothing to install or run yourself. You point your AI client at a single URL:

```
https://ai.api.opendatadsl.com/runtime/webhooks/mcp/sse
```

and sign in with your normal Microsoft/Entra ID account the first time you use it.

## What you get

Once connected, the assistant can call a set of tools directly against your tenant on your behalf:

- **Discover and retrieve data** - find datasets, curves and timeseries by commodity, source or location, and pull actual values.
- **Build Smart Curves and Smart Timeseries** - describe what you want in plain language and Fusion AI creates it for you.
- **Inspect processes, scripts and workflows** - find configuration, check execution history, and read logs.
- **Monitor the platform** - alerts, audit records, dataset deliveries, corrections, and (for admins) application logs.
- **Collaborate** - look up colleagues, send email, and save a response as a shared report.

See [Available Tools](/docs/product/mcp/tools) for the full list, and [Sample Questions](/docs/product/mcp/sample-questions) for ideas to get started.

## How it's secured

The MCP server never sees or stores your password. Every tool call is made under **your own OpenDataDSL identity** - the same permissions, the same tenant, the same data access rules that apply when you use the Portal or REST API directly. See [Signing In](/docs/product/mcp/signing-in) for how the login flow works.

## Prerequisites

- An OpenDataDSL account with a Microsoft/Entra ID identity (the same one you use to sign in to the Portal).
- An MCP-compatible client - see [Connecting Claude](/docs/product/mcp/connect-claude) or [Connecting ChatGPT](/docs/product/mcp/connect-chatgpt).

## Where to go next

| I want to... | Go to |
|---|---|
| Add the server to Claude Desktop | [Connecting Claude](/docs/product/mcp/connect-claude) |
| Add the server to ChatGPT | [Connecting ChatGPT](/docs/product/mcp/connect-chatgpt) |
| Understand how sign-in works | [Signing In](/docs/product/mcp/signing-in) |
| See what the assistant can actually do | [Available Tools](/docs/product/mcp/tools) |
| Get some ideas for questions to ask | [Sample Questions](/docs/product/mcp/sample-questions) |
