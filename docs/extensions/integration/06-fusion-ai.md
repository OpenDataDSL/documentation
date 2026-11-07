---
title: Using Fusion AI
description: Describe a downstream system to Fusion AI, answer the questions it asks, and apply its proposal to create a custom system or change an existing one
slug: /extensions/integration/fusion-ai
sidebar_position: 6
tags: [extension, integration, fusion ai, custom system, odsl]
---

# Using Fusion AI

Fusion AI can design a custom system with you: you say what the system is and how it takes data, it asks you about anything it cannot decide for you, and it proposes the codes, settings, secrets and ODSL. Nothing is saved until you apply its proposal, and you can keep talking to change it first.

Northgate wants its **Northgate Lakehouse** to get the day's curves and timeseries each morning, through an ingest API that takes JSON.

---

## Designing a new system

Select **New system**, then **Design a Custom ODSL system with Fusion AI** (or **Design with Fusion AI** on **Describe it to Fusion AI** on the home page). Type what the system is and how it takes data, and select **Send** (or press Ctrl+Enter).

When Fusion AI needs a decision that is yours to make, it asks a question with a few choices, under a short note on what led to it.

![Fusion AI asking how the data should reach the lakehouse, with the choices One message per group and One message per item](/img/extensions/integration/fusion-question.png)

Select a choice to answer. When you may pick more than one, tick them and select **Send**. **Or type your own answer** puts the cursor in the text box for an answer of your own. An answered question shows what you chose.

![A question with several choices ticked, ready to send](/img/extensions/integration/fusion-multiselect.png)

When it has what it needs, Fusion AI sums up the system and proposes it.

![Fusion AI's proposal for Northgate Lakehouse: its id, description, identity, group settings, the required Ingest API key secret and a 95 line runner script, with Create this system](/img/extensions/integration/fusion-proposal.png)

The proposal shows the system's id, description, what it sends, its identities, group settings, data properties and secrets (with the secret record each one is kept in, `*` for required), the length of its ODSL and any notes. Fusion AI names the secrets the system needs but never asks for their values: you set them yourself once the system is created. **Show the definition** and **Show the ODSL** in Fusion AI's answer show them in full.

The screen checks the proposal before you apply it: the names and types, the choices of each choice setting, that the ODSL imports the integration engine, has the three hooks and hands over to the engine with the system's id, and that it reads secrets with `intSecret` and only the secrets the system has. Anything wrong is listed in amber on the proposal; ask Fusion AI to fix it, or apply it anyway with a second click.

Select **Create this system**. The ODSL is checked for syntax errors first. If it has any, they are listed with **Ask Fusion AI to fix them**, which sends them back to Fusion AI, or you can apply it with the errors. The system is then created and opens on its **System setup** tab, with Fusion AI's notes at the top. Set the values of its secrets under **Secret values** (see [Custom systems](/docs/extensions/integration/custom-systems#3-set-the-secret-values)), then attach groups to it.

---

## Changing a system

On a custom system's **System setup** tab, select **Change with Fusion AI**, and say what should change. Fusion AI is given the system's current codes, settings and ODSL, and asks what it needs to know.

![Fusion AI asking where the book of each lakehouse row should come from](/img/extensions/integration/fusion-change.png)

Its proposal holds the whole changed system. **Apply the changes** saves it the same way, keeping the system's code, with the reason `Changed with Fusion AI` on the script's new version, which you can compare with the earlier one in the Script Manager. A later answer replaces an earlier proposal, so only the latest one can be applied.

---

## Good to know

| Topic | What happens |
|-|-|
| History | The conversation is saved in the Fusion AI chat history, category `integration`. |
| What Fusion AI is told | How the integration engine calls the hooks, the ODSL rules on the [Custom systems](/docs/extensions/integration/custom-systems#good-to-know-when-writing-the-odsl) page, and the REST API template as an example. |
| Tokens | Conversations count towards your Fusion AI usage like any other (see [Fusion AI billing](/docs/extensions/fusion-ai/billing)). |
| Testing | Fusion AI does not run the new ODSL. Set the group to a test environment or a dry run where the system has one, and use **Run now** before scheduling it. |

---

## Next

[Plug-ins](/docs/extensions/integration/plugins): the systems with a ready-made plug-in, such as Molecule.
