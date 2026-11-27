---
title: Connecting Microsoft Copilot
description: Add the Fusion AI MCP server to a Copilot Studio agent, Microsoft 365 Copilot or GitHub Copilot
slug: /product/mcp/connect-copilot
sidebar_position: 3.2
tags: [fusion-ai, mcp, copilot, copilot-studio, github-copilot, integration]
---

# Connecting Microsoft Copilot to the Fusion AI MCP Server

"Copilot" covers a few different Microsoft products, and they connect to MCP servers in different ways:

| I use... | Go to |
|---|---|
| Microsoft 365 Copilot, Copilot in Teams, or agents built in Copilot Studio | [Copilot Studio](#copilot-studio) |
| GitHub Copilot in Visual Studio Code or the Copilot CLI | [GitHub Copilot](#github-copilot) |

Both talk to the hosted MCP endpoint directly using the Streamable HTTP transport, so always use the address ending in `/mcp`:

```
https://ai.api.opendatadsl.com/runtime/webhooks/mcp
```

Do not use the older `/mcp/sse` address: Copilot Studio no longer supports the SSE transport.

## Copilot Studio

Microsoft 365 Copilot and Teams reach MCP servers through an **agent** built in Microsoft Copilot Studio. You add Fusion AI to the agent as a tool once, then publish the agent so your colleagues can use it in Teams and Microsoft 365 Copilot.

### Before you start

- You need access to Copilot Studio in your Power Platform environment, and permission to create or edit agents.
- The agent must use **generative orchestration** (the default for new agents). MCP tools are not available to agents using classic topic-based orchestration.
- Your Power Platform admin's data policies (DLP) must allow custom connectors. Copilot Studio creates a custom connector behind the scenes when you add an MCP server.

### 1. Open or create an agent

Sign in to [Copilot Studio](https://copilotstudio.microsoft.com), then open an existing agent or create a new one, for example *OpenDataDSL Assistant*.

### 2. Add the MCP server

1. Go to the agent's **Tools** page.
2. Select **Add a tool**, then **New tool**.
3. Under **Create new**, select **Model Context Protocol**. The MCP onboarding wizard opens.
4. Fill in the fields:

| Field | Value |
|---|---|
| Server name | OpenDataDSL Fusion AI |
| Server description | Finds and retrieves energy and commodity market data, curves, timeseries, processes, reports and alerts from the user's OpenDataDSL tenant. |
| Server URL | `https://ai.api.opendatadsl.com/runtime/webhooks/mcp` |
| Authentication | **None** |

The server description matters: the agent reads it to decide when to call Fusion AI, so keep it specific to OpenDataDSL data.

Choose **None** for authentication. The server handles sign-in itself, through the `login_start` and `login_complete` tools described in [Signing In](/docs/product/mcp/signing-in), so no OAuth settings or API key are needed here.

5. Select **Create**.
6. In the **Add tool** dialog, select **Create a new connection**, then **Add to agent**.

Copilot Studio connects to the server and lists the Fusion AI tools. You can switch individual tools off on the **Tools** page if you want the agent to use only some of them.

### 3. Test the agent

In the **Test** pane, ask something that needs your data, for example *"Who am I in OpenDataDSL?"*. The agent calls `login_start` and shows you a code and a link. Open the link, enter the code and sign in with your normal Microsoft/Entra ID account, then tell the agent you've signed in. See [Signing In](/docs/product/mcp/signing-in) for the full flow.

### 4. Publish to Teams and Microsoft 365 Copilot

When you're happy with the agent, **Publish** it, then make it available in Teams and Microsoft 365 Copilot from the agent's **Channels** page. Depending on your organization's settings, an admin may need to approve the agent in the Microsoft 365 admin center before colleagues can find it.

Every person who uses the agent signs in as themselves the first time they ask for data, so each person only sees the data their own OpenDataDSL account can access. The agent never shares one person's sign-in with another.

## GitHub Copilot

GitHub Copilot can use Fusion AI in **Agent** mode in Visual Studio Code, and in the Copilot CLI. This is most useful for developers writing ODSL scripts, extensions or integrations against the platform.

If you use Copilot through a GitHub organization on a Copilot Business or Enterprise plan, an organization admin must enable the **MCP servers in Copilot** policy first.

### Visual Studio Code

The quickest way is from the Command Palette:

1. Run **MCP: Add Server**.
2. Choose **HTTP**.
3. Enter the URL `https://ai.api.opendatadsl.com/runtime/webhooks/mcp`.
4. Enter the server ID `odsl-fusion-ai`, and choose whether to add it to your user profile (all workspaces) or just this workspace.

Or add it to an `mcp.json` file yourself, either `.vscode/mcp.json` in your workspace or the `mcp.json` in your user profile:

```json
{
  "servers": {
    "odsl-fusion-ai": {
      "type": "http",
      "url": "https://ai.api.opendatadsl.com/runtime/webhooks/mcp"
    }
  }
}
```

No headers or OAuth settings are needed. Open Copilot Chat, switch to **Agent** mode, check that the Fusion AI tools are ticked in the tools picker, and ask something that needs your data. Copilot calls `login_start` and shows you a code and link to sign in, as described in [Signing In](/docs/product/mcp/signing-in).

### Copilot CLI

```bash
copilot mcp add --transport http odsl-fusion-ai https://ai.api.opendatadsl.com/runtime/webhooks/mcp
```

## Troubleshooting

- **Copilot Studio can't connect to the server:** check the URL ends in `/mcp` (not `/mcp/sse`) and authentication is set to **None**.
- **"Model Context Protocol" isn't offered in Copilot Studio:** check the agent uses generative orchestration, and ask your Power Platform admin whether data policies block custom connectors in your environment.
- **Colleagues can't find the agent in Teams or Microsoft 365 Copilot:** check it has been published to that channel, and whether it is waiting for admin approval.
- **GitHub Copilot doesn't show the tools:** make sure Chat is in **Agent** mode and the server is running (run **MCP: List Servers**). On Business or Enterprise plans, check the **MCP servers in Copilot** policy is enabled.
- **Login code says it's expired:** device codes are only valid for 15 minutes. Just ask again and a fresh code and link will be issued.
