---
title: Sample Questions
description: Example prompts to try with the Fusion AI MCP server
slug: /product/mcp/sample-questions
sidebar_position: 6
tags: [fusion-ai, mcp, examples]
---

# Sample Questions

A few starting points for what you can ask, once you're [signed in](/docs/product/mcp/signing-in). These are illustrative - you don't need to match the wording exactly, and the assistant will ask follow-up questions if it needs more detail.

## Exploring available data

- *"What data have we got for ICE?"*
- *"What Natural Gas data do we have for the Netherlands?"*
- *"What timeseries and curves are available for TTF?"*
- *"Do we have any datasets that have recently had corrections from the vendor?"*

## Retrieving curves and timeseries

- *"What's the latest Brent crude curve?"*
- *"Show me the M01 tenor of the TTF curve for the last 30 days."*
- *"Get the UK power settlement timeseries for 2025."*
- *"Has today's NBP curve built yet, and if not, why?"*

## Building Smart Curves and Smart Timeseries

- *"Create a spark spread curve for CCGT plants in Germany."*
- *"Build a Brent crude forward curve bootstrapped from ICE futures."*
- *"Blend our internal model prices with EEX data for the far curve, with EEX taking priority."*
- *"Apply a seasonal shape to our base gas curve."*
- *"Change the NBP curve to rebuild every hour during the trading day."*

## Calendars and dates

- *"What are the expiry dates for the ICE Brent calendar this year?"*
- *"How many business days are there in Q2 2026 for the UK power calendar?"*
- *"What holidays fall in the German power calendar in December?"*

## Processes, scripts and automation

- *"What processes are scheduled to run overnight?"*
- *"Why did last night's ETL process fail - can you get me the log?"*
- *"Set up an automation that notifies our Slack target whenever the EEX dataset updates."*
- *"Validate this ODSL script for me before I save it."*

## Monitoring and governance

- *"Are there any open critical alerts in the last 24 hours?"*
- *"Raise a data quality alert for the ICE.NDEX.NLB dataset."*
- *"Show me the audit trail for changes made to the UK_POWER curve this week."*
- *"Has the EEX dataset delivery been on time this week?"*

## Reports and collaboration

- *"Save that last answer as a report my team can see."*
- *"Who else on the team has access to the platform?"*
- *"Email a summary of today's Brent curve to jane@example.com."*

:::tip
The more specific you are about a source, product or ID, the less back-and-forth is needed - but if you're not sure of the exact name, just describe it and the assistant will search for it.
:::
