---
title: Creating Smart Curves with Fusion AI
sidebar_position: 6
tags: [smart-curves, fusion-ai, automation, deployment]
---

# Creating Smart Curves with Fusion AI

Fusion AI can create Smart Curves directly on the platform on your behalf — no ODSL scripting required. You describe the curve you need in plain language, Fusion AI confirms the details, and then creates it for you using its built-in Smart Curve tool.

## The Full Curve Creation Workflow

```
Describe your curve → Fusion AI confirms details → Creates the curve directly → Ready to use
```

You stay in control at every stage — Fusion AI explains what it will create and waits for your approval before making any changes.

---

## Step 1: Describe Your Curve

Start by telling Fusion AI what curve you need. Be as specific or as high-level as you like — it will ask clarifying questions if it needs more detail.

> **You:** I need a daily power forward curve for the UK, blending EEX and broker data. EEX should take priority. Rebuild it automatically whenever the EEX settlement data arrives.

> **Fusion AI:** I'll create a Smart Curve with the following configuration:
> - **Base:** EEX UK power monthly settlement (`EEX.UK_POWER_M:SETTLE`)
> - **Blend:** EEX priority over broker (`ICAP_BROKER.UK_POWER_M:MID`)
> - **Build:** Bootstrap then interpolate to daily using cubic spline
> - **Caching:** `OnDependencies` — rebuilds automatically when EEX data updates
>
> Shall I go ahead and create it?

---

## Step 2: Confirm and Create

Once you confirm, Fusion AI creates the Smart Curve directly on the platform — no script to run, no code to copy.

> **You:** Yes, go ahead.

> **Fusion AI:** ✅ Done. The Smart Curve `UK_POWER_OBJECT:CURVE` has been created and is active in your environment. It will rebuild automatically whenever `EEX.UK_POWER_M:SETTLE` updates.

:::tip
You can ask Fusion AI to explain any part of its proposed configuration before you confirm. For example: *"Why cubic spline rather than linear interpolation?"* or *"What happens if the broker data is missing?"*
:::

---

## Step 3: Refine Through Conversation

You can ask Fusion AI to update an existing curve at any time, just by describing the change:

> **You:** Can you change the caching to rebuild on a schedule instead — every weekday at 18:00?

> **Fusion AI:** Updated `UK_POWER_OBJECT:CURVE` — caching is now set to `OnSchedule` with a cron of `0 18 * * MON-FRI`.

> **You:** Also change the broker source to `MAREX.UK_POWER_M:MID`.

> **Fusion AI:** Done — the VAR1 input has been updated to `MAREX.UK_POWER_M:MID`.

:::note
Each change is applied directly to the platform. You can ask Fusion AI to describe the current configuration of any curve at any time to confirm the state.
:::

---

## Asking Fusion AI About Existing Curves

Fusion AI can interrogate and explain curves already in your environment:

> **You:** Why hasn't the NBP gas curve rebuilt today?

> **Fusion AI:** The curve is configured with `OnDependencies` caching. Checking the dependency status — `ICE.NBP_M:SETTLE` has updated today but `ICE.NBP_Q:SETTLE` has not yet arrived. The curve will rebuild automatically once the quarterly settlement data lands.

> **You:** Can you change it so it only depends on the monthly settlement?

> **Fusion AI:** Updated — `ICE.NBP_Q:SETTLE` has been removed as a named variable input. The curve will now rebuild on `ICE.NBP_M:SETTLE` updates only. Note that the build expression will need to be adjusted too — shall I update it to bootstrap from the monthly series only?

---

## Common Fusion AI Curve Requests

| Request | What Fusion AI does |
|---|---|
| *"Build a spark spread curve for CCGT plants in Germany"* | Creates a spread curve with power minus gas multiplied by heat rate |
| *"Create a Brent crude forward curve from ICE futures"* | Creates a bootstrapped monthly curve from ICE Brent contract settlements |
| *"Apply a seasonal shape to our base gas curve"* | Creates a shaped curve using your existing seasonal profile data |
| *"Blend our internal model prices with exchange data for the far curve"* | Creates a priority blend switching from exchange to model at a specified tenor |
| *"Change the NBP curve to rebuild every hour during the trading day"* | Updates caching to `OnSchedule` with the appropriate cron expression |

---

## Tips for Getting the Best Results

:::tip
**Name your data sources.** Fusion AI works best when you specify the exact feed you want — exchange name, broker name, or master data ID. If you're unsure of the exact ID, describe it and Fusion AI will search your environment.
:::

:::tip
**Start simple, then iterate.** Define the core build logic first, then ask Fusion AI to add caching configuration, additional inputs, or expression changes in follow-up messages.
:::

:::note
**Fusion AI knows your environment.** It has access to the data and curves already in your environment, so it can suggest the right source IDs and warn you if a referenced dataset doesn't exist.
:::

---

## Summary

| Capability | Supported via Fusion AI |
|---|---|
| Create Smart Curves directly from natural language | ✅ |
| Configure caching and scheduling | ✅ |
| Update existing curve configuration | ✅ |
| Explain and diagnose existing curves | ✅ |
| Refine curves through iterative conversation | ✅ |
