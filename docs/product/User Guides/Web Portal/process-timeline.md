---
title: Process Timeline
description: Process timeline dashboard in the web portal
sidebar_position: 13
slug: /user/portal/timeline
tags:
  - portal
  - dashboard
  - process
  - timeline
---
:::note
The Process Timeline is no longer in the portal menu. To open it, add `/process-timeline` to the end of the portal address, for example `https://portal.opendatadsl.com/process-timeline`. For process runs, use **Monitor** > [**Executions**](/docs/user/portal/executions).
:::

The process timeline gives you a 24 hour snapshot of processes that have run and are going to run.
It also provides a real-time view of running processes.

## Layout
The process timeline screen shows an interactive list of processes along a vertical timeline showing:
* Process executions that happened within the past 12 hours
* Process executions that are scheduled to run within the next 12 hours

![](/img/portal/timeline.png)

As processes execute, you can monitor them in real-time:

![](/videos/OpenDataDSL-ProcessTimeline.gif)

### Actions
#### Hover over a process execution and click the run button
Displays a process configuration dialog where you can amend the process configuration (if needed) and run the process.
:::note
Amending the configuration on this screen is only for that one manual run and not saved
:::

#### Hover over a process execution and click the view phases button
Displays the phases dialog screen, e.g.

![](/img/portal/phases_dialog.png)

#### Hover over a process execution and click the view data button
Displays a dialog showing the list of TimeSeries and Curves that were updated in the process execution

#### Hover over a process execution and click the refresh button
Refreshes the process execution real-time line - used for manual update should you lose connection to the real-time events

#### Hover over a process, click on copy button
Copies the process name into the clipboard
