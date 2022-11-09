---
title: Task
slug: /odsl/variable/task
tags:
- task
---

A task is a physical task assigned to a user from either a user or the system

## Construction
You create a task using the Task() constructor, e.g.

```js
mytask = Task()
```

## Properties

A task has the following properties:

|**Name**|**Description**|**Type**|
|-|-|-|
|category|The category for this task|String|
|description|A description of this task|String|
|user|The user assigned to this task|String|
|created|The creation timestamp (READ ONLY)|Date|
|assignedBy|The user or system that assigned this task to the user|String|
|complete|The completion state of this task|Boolean|
|completed|The timestamp the task was completed|Date|
|notify|A flag to indicate that the user should be notified by email - defaults to true|Boolean|

## Methods

A task has the following methods:

|**Name**|**Description**|**Return Type**|
|-|-|-|
|finish()|Marks the task as complete and saves it to the database|Void|



