---
title: Signing In
description: How the device sign-in flow works for the Fusion AI MCP server
slug: /product/mcp/signing-in
sidebar_position: 4
tags: [fusion-ai, mcp, authentication, entra, login]
---

# Signing In

Every tool call to the Fusion AI MCP server runs under **your own OpenDataDSL identity** - the same account, the same tenant, and the same permissions you have when you use the Portal or REST API directly. There is no shared or service account behind the assistant.

## Why it works this way

An MCP tool call doesn't carry the kind of request headers a normal web request would, so the server can't automatically pick up a browser session or a cookie the way the Portal does. Instead, sign-in happens once per session through two tools built for exactly this:

- **`login_start`** - begins an Entra ID **device authorization** sign-in (the same standard flow used by things like `az login` or signing a smart TV into a streaming service).
- **`login_complete`** - checks whether you've finished signing in, and returns a session reference to use for everything else.

You never type a password, an API key, or a token into the chat itself.

## The flow, step by step

```
You ask a question  →  login_start  →  code + link shown to you
        ↓
You open the link, sign in normally (SSO, MFA, Conditional Access - all of it)
        ↓
login_complete  →  session_id  →  used automatically for every further tool call
```

1. **You ask the assistant something that needs data**, e.g. *"What Brent curves do we have?"*.
2. The assistant calls **`login_start`**, which contacts Entra ID and gets back a short-lived **user code** and a **verification URL** (e.g. `https://login.microsoft.com/device`, code `ABC123XYZ`).
3. **You open that URL in your own browser** and enter the code. From here it's a completely normal Microsoft sign-in - your organization's real SSO, MFA and Conditional Access policies all apply exactly as they would signing into the Portal.
4. Once you've completed sign-in, the assistant calls **`login_complete`** with the flow ID from step 2. While you're still completing sign-in, this returns a `pending` status and the assistant will simply try again a few seconds later.
5. Once you're done, `login_complete` returns a **`session_id`** (e.g. `session:c961483a-...`). The assistant uses this automatically as the credential for every other tool call in the conversation - you don't need to paste it anywhere yourself.

The device code expires after **15 minutes** if you don't complete sign-in - if that happens, just ask again and a fresh code and link are issued.

## What the session_id actually is

It's an opaque reference to a real Entra ID access token that the server holds server-side against that reference - the token itself is never exposed to the AI client or model. If the underlying token expires while your conversation is still going, the server transparently refreshes it behind the scenes using the associated refresh token, so a single sign-in generally lasts you a full working session.

If a session does fully expire (for example, after a long period of inactivity or if the refresh token itself is no longer valid), any tool call using it will fail with an "unknown or expired session" error - at that point, just ask the assistant to sign you in again.

## Other ways to authenticate

The `access_token` argument every tool takes also accepts:

- **An Entra ID access token** you already hold (scope `api://opendatadsl/.default`), sent as-is or prefixed `Bearer `.
- **An ODSL API key** as `email:apikey` - useful for scripted or non-interactive setups where an interactive browser sign-in isn't practical. This is the exception where a credential is handled directly rather than via `login_start`/`login_complete`, so treat API keys with the same care as any other credential and avoid pasting them into a shared chat.

For day-to-day interactive use in Claude or ChatGPT, the device sign-in flow above is the recommended approach - it means no ODSL credential ever has to be typed or pasted into the conversation at all.
