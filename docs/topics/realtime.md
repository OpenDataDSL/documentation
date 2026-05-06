---
title: Real-Time Data Changes
description: Subscribe to real-time entity changes in OpenDataDSL using SignalR
sidebar_position: 1
tags:
- real-time
- signalr
- subscriptions
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Real-Time Data Changes

OpenDataDSL supports real-time push notifications for changes to virtually every entity in the platform. When an object, data series, calendar, event, or any other entity is created, updated, or deleted, connected clients are notified instantly — without polling.

## Overview

The underlying infrastructure for OpenDataDSL real-time is **SignalR**.

SignalR is an open-source real-time communication framework developed by Microsoft. It simplifies the process of adding real-time web functionality to applications by enabling bi-directional communication between the server and client.

SignalR supports multiple client platforms, including web browsers (JavaScript), .NET, Xamarin, and other platforms through the use of client libraries. It provides a unified API for working with these different client platforms.

Key features of SignalR include:

| Feature | Description |
|---|---|
| **Real-time updates** | The server pushes updates to connected clients instantly as changes occur |
| **Scalability** | Handles a large number of concurrent connections using message queuing and distributed caching |
| **Cross-platform support** | Client libraries for web (JavaScript), .NET, Xamarin, and more |
| **Automatic reconnection** | Reconnects clients automatically after network interruptions or server restarts |
| **Security** | Built-in authentication and authorization support |

---

## Real-Time Subscriptions

To receive real-time notifications, you subscribe to the **ID of the entities** you want to monitor and handle the relevant events in your client code.

### Entity Change Methods

Subscription callbacks follow a consistent naming convention based on the entity type and the action performed:

| Method Pattern | Description |
|---|---|
| `On{entity}Create` | Fired when a new entity is created |
| `On{entity}Update` | Fired when an existing entity is updated |
| `On{entity}Delete` | Fired when an entity is deleted |

For example, to monitor master data objects you would handle:
- `OnObjectCreate`
- `OnObjectUpdate`
- `OnObjectDelete`

The table below lists the subscribable entity types and their corresponding method prefixes:

| Entity | Method Prefix | Example |
|---|---|---|
| Object (master data) | `OnObject` | `OnObjectUpdate` |
| Data (timeseries, curves) | `OnData` | `OnDataCreate` |
| Event | `OnEvent` | `OnEventUpdate` |
| Calendar | `OnCalendar` | `OnCalendarUpdate` |
| Type | `OnType` | `OnTypeCreate` |
| Script | `OnScript` | `OnScriptUpdate` |
| Workflow | `OnWorkflow` | `OnWorkflowUpdate` |
| Process | `OnProcess` | `OnProcessUpdate` |
| Automation | `OnAutomation` | `OnAutomationCreate` |
| Policy | `OnPolicy` | `OnPolicyUpdate` |
| Dataset | `OnDataset` | `OnDatasetUpdate` |
| Queue | `OnQueue` | `OnQueueUpdate` |
| Report Config | `OnReportconfig` | `OnReportconfigCreate` |
| Secret | `OnSecret` | `OnSecretUpdate` |
| Environment | `OnEnvironment` | `OnEnvironmentCreate` |
| User | `OnUser` | `OnUserUpdate` |

### Process and Execution Messages

In addition to entity change events, you can subscribe to process and execution log messages in real time:

| Method | Description |
|---|---|
| `OnExecutionMessage` | Receives log messages from a running process execution |
| `OnProcessMessage` | Receives status and control messages for a process |

:::tip
`OnExecutionMessage` is particularly useful for streaming live log output to a UI as a long-running process executes, rather than waiting until it completes.
:::

---

## Connecting with the JavaScript Client

### Installation

Install the SignalR JavaScript client library via npm or a CDN:

<Tabs>
<TabItem value="npm" label="npm">

```bash
npm install @microsoft/signalr
```

</TabItem>
<TabItem value="cdn" label="CDN">

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/microsoft-signalr/7.0.0/signalr.min.js"></script>
```

</TabItem>
</Tabs>

### Building a Connection

Create and start a connection to the OpenDataDSL SignalR hub:

```js
const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://api.opendatadsl.com/hub", {
        accessTokenFactory: () => yourAccessToken
    })
    .withAutomaticReconnect()
    .build();

await connection.start();
console.log("Connected to OpenDataDSL real-time hub");
```

:::note
Authentication uses your OpenDataDSL bearer token. The `accessTokenFactory` function should return a valid, current token.
:::

---

## Subscribing to Entity Changes

Once connected, register your callback handlers **before** calling `start()`, or immediately after the connection is established.

### Subscribing to Object Changes

```js
// Listen for any object being created
connection.on("OnObjectCreate", (data) => {
    console.log("Object created:", data._id);
});

// Listen for updates to a specific object
connection.on("OnObjectUpdate", (data) => {
    if (data._id === "MY.COMMODITY") {
        console.log("Commodity updated:", data);
        refreshUI(data);
    }
});

// Listen for object deletions
connection.on("OnObjectDelete", (data) => {
    console.log("Object deleted:", data._id);
});
```

### Subscribing to Data Changes

```js
// Triggered when a new timeseries or curve data set is created
connection.on("OnDataCreate", (data) => {
    console.log("New data created:", data._id);
});

// Triggered when a timeseries or curve is updated
connection.on("OnDataUpdate", (data) => {
    console.log("Data updated:", data._id, data);
    updateChart(data);
});
```

### Subscribing to Event Changes

```js
connection.on("OnEventCreate", (data) => {
    console.log("New event:", data._id, data.eventstart, data.eventend);
    addEventToCalendarView(data);
});

connection.on("OnEventUpdate", (data) => {
    console.log("Event updated:", data._id);
});
```

### Subscribing to Calendar Changes

```js
connection.on("OnCalendarUpdate", (data) => {
    console.log("Calendar updated:", data._id);
    reloadCalendar(data._id);
});
```

---

## Process and Execution Messages

Use `OnProcessMessage` and `OnExecutionMessage` to stream live feedback from running processes.

```js
// General process status messages
connection.on("OnProcessMessage", (message) => {
    console.log("[Process]", message.status, message.processId);
});

// Live log output from a running execution
connection.on("OnExecutionMessage", (message) => {
    appendLogLine(message.text, message.level);
});
```

A typical use case is to display a live log panel in a web UI as a loader or data pipeline runs:

```js
const logPanel = document.getElementById("log-output");

connection.on("OnExecutionMessage", (message) => {
    const line = document.createElement("p");
    line.className = `log-${message.level.toLowerCase()}`;
    line.textContent = `[${message.timestamp}] ${message.text}`;
    logPanel.appendChild(line);
    logPanel.scrollTop = logPanel.scrollHeight;
});
```

---

## Connecting with the .NET Client

### Installation

```bash
dotnet add package Microsoft.AspNetCore.SignalR.Client
```

### Building a Connection

```csharp
var connection = new HubConnectionBuilder()
    .WithUrl("https://api.opendatadsl.com/hub", options =>
    {
        options.AccessTokenProvider = () => Task.FromResult(yourAccessToken);
    })
    .WithAutomaticReconnect()
    .Build();

await connection.StartAsync();
Console.WriteLine("Connected to OpenDataDSL real-time hub");
```

### Subscribing to Changes

```csharp
// Subscribe to object updates
connection.On<dynamic>("OnObjectUpdate", (data) =>
{
    Console.WriteLine($"Object updated: {data._id}");
});

// Subscribe to data updates
connection.On<dynamic>("OnDataUpdate", (data) =>
{
    Console.WriteLine($"Data updated: {data._id}");
    RefreshDataView(data);
});

// Subscribe to execution log messages
connection.On<dynamic>("OnExecutionMessage", (message) =>
{
    Console.WriteLine($"[{message.level}] {message.text}");
});
```

---

## Connection Lifecycle Management

### Handling Reconnections

SignalR's `withAutomaticReconnect()` will attempt to reconnect automatically. You can hook into the reconnection events to update your UI accordingly:

```js
connection.onreconnecting((error) => {
    console.warn("Connection lost, attempting to reconnect...", error);
    showReconnectingBanner();
});

connection.onreconnected((connectionId) => {
    console.log("Reconnected with ID:", connectionId);
    hideReconnectingBanner();
    resubscribeToEntities(); // Re-register any entity-specific subscriptions
});

connection.onclose((error) => {
    console.error("Connection permanently closed:", error);
    showOfflineState();
});
```

### Graceful Disconnection

Stop the connection cleanly when it is no longer needed:

```js
await connection.stop();
console.log("Disconnected from real-time hub");
```

---

## Filtering by Entity ID

The `On{entity}Change` callbacks receive **all** changes for that entity type across your tenant. To react only to specific entities, filter by `_id` inside the handler:

```js
const watchedIds = new Set(["ICE.NBP_M", "ICE.BRENT", "ERCOT.POWER"]);

connection.on("OnObjectUpdate", (data) => {
    if (watchedIds.has(data._id)) {
        console.log("Watched entity changed:", data._id);
        handleUpdate(data);
    }
});
```

---

## Use Cases

### Live Dashboard

Subscribe to `OnDataUpdate` for a set of instruments to keep a trading dashboard current without polling:

```js
const instruments = ["ICE.BRENT:SETTLE", "ICE.NBP_M:SETTLE", "TTF:CLOSE"];

connection.on("OnDataUpdate", (data) => {
    if (instruments.includes(data._id)) {
        updateDashboardTile(data._id, data.value);
    }
});
```

### Dataset Monitoring Alerts

React immediately when a managed dataset status changes:

```js
connection.on("OnDatasetUpdate", (data) => {
    if (data.status === "failed") {
        showAlert(`Dataset ${data._id} has failed quality checks`);
        notifyOpsTeam(data);
    }
});
```

### Execution Log Viewer

Stream process execution logs into a live panel in your web application:

```js
let currentExecutionId = null;

function startWatchingExecution(executionId) {
    currentExecutionId = executionId;
    clearLogPanel();
}

connection.on("OnExecutionMessage", (message) => {
    if (message.executionId === currentExecutionId) {
        appendToLogPanel(message.level, message.text, message.timestamp);
    }
});

connection.on("OnProcessMessage", (message) => {
    if (message.executionId === currentExecutionId && message.status === "completed") {
        showCompletionBanner(message);
    }
});
```

### Audit and Change Tracking

Log all changes to a specific entity type for compliance or debugging:

```js
const auditLog = [];

["OnObjectCreate", "OnObjectUpdate", "OnObjectDelete"].forEach((event) => {
    connection.on(event, (data) => {
        auditLog.push({
            event,
            id: data._id,
            timestamp: new Date().toISOString(),
            data
        });
        console.log(`[Audit] ${event} — ${data._id}`);
    });
});
```

---

## Best Practices

:::tip Keep handlers lightweight
Do minimal work inside a SignalR callback — update state or dispatch to a queue, then handle heavy processing outside the handler.
:::

:::tip Re-subscribe after reconnection
After a reconnect, confirm your subscription state is correct. If you maintain a list of watched IDs, re-apply your filter logic inside the reconnected handler.
:::

:::warning Avoid relying on message order
In high-throughput scenarios, messages for the same entity may arrive in rapid succession. Always use the data returned in the message to determine current state rather than assuming a specific sequence.
:::

:::note Tenant isolation
Real-time subscriptions are scoped to your tenant. You will only receive notifications for entities within your own tenant's data.
:::
