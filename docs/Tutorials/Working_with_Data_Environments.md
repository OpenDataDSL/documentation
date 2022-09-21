---
slug: /tutorials/workingenvironments
tags:
  - tutorial
  - odsl
  - environment
---
Working with Data Environments
======================================

## Introduction

This tutorial teaches you about data environments and how to use them

## Prerequisites

### User requirements

This tutorial assumes some familiarity with writing code as we will be doing some basic coding in OpenDataDSL in Visual Studio Code

### System requirements

You will need to have the following:

*   An account with OpenDataDSL
*   Microsoft VS Code with the [OpenDataDSL extension](/docs/user/vscode)
    
## About Data Environments
A data environment is a physically independent environment where all your data, settings, workflows etc. reside. 
They can be used for anything, but usually you would create a `develop`, `test` or `QA` environment in which you can test or experiment with data or features of the application without compromising your pure `production` environment.
  
### What is in an environment
The following entities are stored in each individual environment:
* Actions
* Audit records
* Calendars
* Data
* Extractors
* Objects
* Processes and process execution records
* Scripts
* Subscriptions and subscription records
* Transformers
* Types
* Workflows

### Environment Quotas
By default, your company has a maximum quota of 3 environment including your `production` environment.
That means you can only create 2 more named environments, but you can request more by emailing [info@opendatadsl.com](mailto:info@opendatadsl.com) or requesting via the web portal.

## Managing environments
You can create, list, use and delete environments in ODSL code.

### Creating an environment
The following code snippet creates an object called test (which will also be the name of the environment).
It then sets a description of the environment, you can add any other properties you like on the object.
Finally it saves the object using the environment service.

```js
test = Object()
test.description = "My test environment"
save ${environment:test}
```

### Using your new environment
To use your newly created environment, you need to tell ODSL code with the `use` command.

```js
use test
```

After issuing that command, any entity that is saved within the same session will be stored in the `test` environment.

### Listing your environments
To get a list of your environments, you can use the `find` command.

```js
environments = find ${environment}

print environments

print "There are currently " + environments.size + " environments"
``` 

Each environment object contains the following properties:

|Name|Type|Description|Example|
|-|-|-|-|
|_id|String|The environment identifier|test|
|_createdBy|String|The email address of the person who created the environment|me@example.com|
|_size|Number|The size of the environment in bytes|12345|
|_timestamp|DateTime|The UTC timestamp of when the environment was created|2021-01-14T17:01:31.930Z|
|*|Any|Any other custom properties you add|description|

### Deleting an environment
:::warning
Deleting an environment deletes ALL the data in an environment, so use with care
:::

To delete an environment, use the `delete` command.

```js
delete ${environment:"test"}
```

:::info
You can't delete the `production` environment
:::
