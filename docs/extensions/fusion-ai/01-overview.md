---
title: What is Fusion AI?
description: An introduction to Fusion AI, the OpenDataDSL AI assistant, and the Fusion AI extension in the portal
slug: /extensions/fusion-ai/overview
sidebar_position: 1
tags: [extension, fusion-ai, ai-assistant]
---

# What is Fusion AI?

**Fusion AI** is the OpenDataDSL AI assistant. You ask it questions in plain language and it answers from your own platform data: forward curves, timeseries, datasets, processes, reports and automations. It can also do work for you, such as writing and validating ODSL scripts, building SMART curves, creating reports and sending emails, always with your own access rights.

![Fusion AI Studio with a conversation](/img/extensions/fusion-ai/studio-conversation.png)

Fusion AI is used in three ways:

| Way | What it is | Where |
|-|-|-|
| **Chat** | Ask a question and get an answer, with tables, code and the tools Fusion used to find it | The **Studio** tab, or any AI tool connected through the [MCP server](/docs/product/mcp/overview) |
| **Agents** | A saved set of questions that runs on demand, on a schedule or from an automation | The **Agents** tab |
| **Playbooks** | A written, repeatable job that runs step by step, with checks and approvals, as a task | The **Playbooks** and **Tasks** tabs |

---

## How it fits together

![How Fusion AI fits together](/img/extensions/fusion-ai/architecture.png)

- **Intelligent routing**: each question goes to the assistant best able to answer it, with that assistant's tools. You can also pick the assistant yourself.
- **Assistants** are specialists. Six are built in (General, Analyst, Code, Curve, Integrate and Operations), and you can add your own with your company's knowledge, terminology and ways of working.
- **Tools** are how assistants read and change the platform: find curves, read data, validate scripts, create reports, raise alerts, send email. You can add **custom tools** that call your own scripts, systems and APIs.
- **The playbook runner** carries out a playbook one step at a time, on the assistant each step names and with only that step's tools.
- **Your access rights apply to everything.** Fusion reads and writes only what the person using it could read and write themselves.

---

## The Fusion AI extension

The **Fusion AI** extension adds a **Fusion AI** entry to the **Information** section of the portal, with these tabs:

| Tab | What you do there | Page |
|-|-|-|
| **Studio** | Chat with Fusion, with your conversation history in a sidebar | [Studio](/docs/extensions/fusion-ai/studio) |
| **Agents** | Save sets of questions as agents, schedule them, or run them from automations | [Agents](/docs/extensions/fusion-ai/agents) |
| **Assistants** | See the built-in assistants and create your own | [Assistants](/docs/extensions/fusion-ai/assistants) |
| **Tools** | Register custom tools backed by your own scripts | [Custom tools](/docs/extensions/fusion-ai/tools) |
| **Playbooks** | Browse the playbook library, and write your own playbooks | [Playbooks](/docs/extensions/fusion-ai/playbooks/overview) |
| **Tasks** | Fill in and run playbook tasks, and approve runs | [Running playbook tasks](/docs/extensions/fusion-ai/playbooks/running) |
| **Architecture** | The diagram above | |

It also installs five insights, listed with your other insights:

| Insight | Shows | Page |
|-|-|-|
| **Fusion AI Agent Logs** | Every Fusion conversation in full, with the tools used and any warnings | [Insights](/docs/extensions/fusion-ai/insights#agent-logs) |
| **Fusion AI Feedback** | The thumbs up and thumbs down your users give, with their comments | [Insights](/docs/extensions/fusion-ai/insights#feedback) |
| **Fusion AI Playbook Runs** | Playbook runs, success rates, failures and tokens per run | [Insights](/docs/extensions/fusion-ai/insights#playbook-runs) |
| **Fusion AI Token Usage** | Tokens used by user, day and conversation | [Insights](/docs/extensions/fusion-ai/insights#token-usage) |
| **Fusion AI Billing** | Monthly billing, and your budget, limit and notifications | [Billing, budgets and limits](/docs/extensions/fusion-ai/billing) |

---

## Before you start

Fusion AI is a premium feature. It needs an AI API key configured for your tenant. Until it is, the Studio shows **Fusion AI is not enabled**; speak to your system administrator or to OpenDataDSL support. See [Administration](/docs/extensions/fusion-ai/administration) for the settings and policies that control who can use each part of Fusion AI.

---

## Next steps

- [Studio](/docs/extensions/fusion-ai/studio): ask your first question
- [What are AI Playbooks?](/docs/extensions/fusion-ai/playbooks/overview): repeatable, governed AI workflows
- [MCP server](/docs/product/mcp/overview): use Fusion AI's tools from Claude, ChatGPT and other AI tools
