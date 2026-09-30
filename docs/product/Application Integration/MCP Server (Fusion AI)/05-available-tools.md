---
title: Available Tools
description: Full reference of the tools exposed by the Fusion AI MCP server
slug: /product/mcp/tools
sidebar_position: 5
tags: [fusion-ai, mcp, tools, reference]
---

# Available Tools

This is the current set of tools exposed by the Fusion AI MCP server, grouped by what they're used for. You don't need to call these directly - just ask the assistant what you need in plain language, and it picks the right tool(s) itself. This page is useful when you want to understand exactly what the assistant can and can't do, or to write more precise requests.

Every tool below (except `login_start`) takes an `access_token` argument, which the assistant fills in automatically once you've [signed in](/docs/product/mcp/signing-in).

## Signing in & identity

| Tool | What it does |
|---|---|
| `login_start` | Begins Entra ID device sign-in; returns a code and link |
| `login_complete` | Completes sign-in once you've used the code; returns a session reference |
| `get_current_user` | Returns the name and email of the signed-in user |
| `ping` | Minimal connectivity test - echoes back a message |

## Finding data

| Tool | What it does |
|---|---|
| `find_data` | Summarises available commodity / source / location combinations across the platform |
| `find_data_for_product` | Lists the timeseries and curves available for a specific product |
| `find_datasets` | Finds actively-monitored datasets by provider / feed / product (DSID) |
| `find_curves` | Finds curves available in the platform |
| `find_timeseries` | Finds timeseries available in the platform |
| `find_curve_functions` | Lists the functions available for building Smart Curves |
| `find_timeseries_functions` | Lists the functions available for building Smart Timeseries |
| `find_types` | Finds configured object/event type templates |

## Retrieving data

| Tool | What it does |
|---|---|
| `get_curve` | Retrieves a curve for a given id and trade date |
| `get_latest_curve` | Retrieves the latest available curve for a given id |
| `get_curve_tenor_timeseries` | Retrieves a single tenor (e.g. `M01`) from a curve as a timeseries |
| `get_timeseries` | Retrieves a timeseries for a given id and date range |
| `find_dataset_deliveries` | Checks dataset delivery history/KPIs (on time, late, missing) |
| `find_corrections` | Finds data that's been corrected by the vendor after publication |

## Calendars

| Tool | What it does |
|---|---|
| `find_calendar` | Finds standard, holiday or expiry calendars |
| `get_expiries` | Lists last trading dates for a calendar and date range |
| `get_holidays` | Lists holidays for a calendar and date range |
| `period_counter` | Calculates the number of periods in a date range for a calendar |

## Building Smart Curves & Smart Timeseries

| Tool | What it does |
|---|---|
| `create_smart_curve` | Creates a Smart Curve from a base curve and an expression (bootstrap, blend, shape, spread, etc.) |
| `create_smart_timeseries` | Creates a Smart Timeseries from a base timeseries and an expression |

See [Sample Questions](/docs/product/mcp/sample-questions) for examples of describing a curve in plain language.

## Scripts

| Tool | What it does |
|---|---|
| `find_script` | Finds ODSL/JS/HTML/CSS/Mustache scripts stored in the platform |
| `validate_script` | Checks a script for syntax errors before saving |
| `save_script` | Saves a generated script to the database (only when you explicitly ask it to) |

## Processes, workflows & automation

| Tool | What it does |
|---|---|
| `find_process` | Finds configured processes (scheduled, triggered or manual jobs) |
| `create_process_for_script` | Creates a process that runs a script, optionally on a schedule |
| `create_process_for_workflow` | Creates a process that runs a workflow, optionally on a schedule |
| `run_process` | Runs an existing process in the background |
| `find_process_executions` | Finds process execution history/logs for a time window |
| `get_log_for_process_execution` | Retrieves the full log file for a specific process execution |
| `find_workflow` | Finds workflow definitions |
| `find_action` | Finds actions used inside workflows |
| `find_automation` | Finds configured automations (event-triggered actions) |
| `find_automation_target` | Finds available automation targets and their required inputs |
| `create_automation` | Creates an automation linking an event to a target |
| `find_automation_logs` | Finds automation execution history |

## Master data & events

| Tool | What it does |
|---|---|
| `save_object` | Saves (creates or updates) a master data record |
| `save_events` | Saves events/transactions against a master data record |
| `find_event_list` | Finds event lists for a product/source |
| `find_events` | Finds events within a given event list and time range |

## Reports

| Tool | What it does |
|---|---|
| `create_report` | Creates or updates a report definition |
| `save_response_as_report` | Saves the assistant's last response as a shared report your colleagues can view |

## Monitoring & governance

| Tool | What it does |
|---|---|
| `find_alerts` | Finds alert records for a time window, filterable by type/impact/status |
| `raise_alert` | Raises a new alert |
| `find_audit_records` | Finds audit trail records of changes made in the system |
| `find_colleague_requests` | Finds requests made by users/system accounts (API, portal, Excel add-in, VS Code) |
| `admin_azure_logs` | **Admin only.** Extracts Azure application logs (requests, traces, exceptions) |

## Collaboration

| Tool | What it does |
|---|---|
| `find_colleagues` | Looks up colleagues registered on the platform |
| `send_email` | Sends an email |

:::note
Some tools that change data (`create_smart_curve`, `save_script`, `save_object`, `create_automation`, etc.) are designed to confirm the details with you before committing anything - if the assistant proposes a change, it's expecting your go-ahead before it actually saves it.
:::
