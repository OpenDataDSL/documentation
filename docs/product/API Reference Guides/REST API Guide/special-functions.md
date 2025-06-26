---
sidebar_position: 3
title: Special Functions
description: Documentation on special REST functions
slug: /api/rest/special_functions
---

## What are special functions?

Special functions are ```_function``` query parameter functions that work across most services.

## List Automations (listAutomations)

The listAutomations function lists all available automations for the selected service, source and key, for example:

```js
GET https://api.opendatadsl.com/api/object/v1/private/AAA
    ?_function=listAutomations
```

This will provide a list of all valid automations that can be created for the private object AAA, an example of one of those is shown below:

```json
{
    "_type": "VarAutomation",
    "publisher": "odsl",
    "code": "email_attachment",
    "name": "Send an email with an attachment",
    "description": "Send the data as an attachment to an email sent to 1 or more email addresses",
    "icon": "envelope-paper",
    "script": "@EmailTarget",
    "template": "When AAA is updated, transform the data using [@transformer], then send an email to [to] with subject [subject], add the data as an attachment named [attachmentName]",
    "allowTransformation": true,
    "allowPropertyChange": true,
    "tags": [
      "Communication"
    ],
    "inputs": {
      "attachmentName": {
        "description": "The name of the file in the attachment, default is the id of the variable, can use embedded dates"
      },
      "subject": {
        "description": "The message subject"
      },
      "to": {
        "description": "The email address of the recipient(s) of the email, separate multiple email addresses with either ,; or space"
      },
      "@transformer": {
        "description": "Select a transformer to pre-transform the data before sending to the automation target",
        "type": "script",
        "filter": {
          "type": "mustache",
          "$or": [
            {
              "category": "#Object"
            },
            {
              "category": "object"
            }
          ]
        }
      }
    },
    "properties": {
      "attachment": true
    },
    "services": [
      "*"
    ],
    "actions": [
      "*"
    ],
    "target": "odsl.email_attachment",
    "conditions": [
      {
        "source": "private",
        "service": "object",
        "id": "AAA",
        "action": "update"
      }
    ]
}
```

### Using an item from the list
You can use an item from the list to create and save an automation by providing values for the input variables, e.g. using the above we can create a new automation as follows:

```json
{
    "_type": "VarAutomation",
    "target": "odsl.email_attachment",
    "template": "When AAA is updated, transform the data using [@transformer], then send an email to [to] with subject [subject], add the data as an attachment named [attachmentName]",
    "icon": "envelope-paper",
    "active": true,
    "properties": {
      "to": "user@company.com",
      "subject": "Test Subject",
      "attachmentName": "data.csv",
      "attachment": true
    },
    "conditions": [
      {
        "source": "private",
        "service": "object",
        "id": "AAA",
        "action": "update"
      }
    ]
}
```

### Creating an automation
You can create an automation by sending the JSON data (like the example above) as the body in the following POST request:

```js
POST https://api.opendatadsl.com/api/automation/v1
```

### See also

* [Automation Service](/docs/api/rest/service/automation)
* [Automation Target Service](/docs/api/rest/service/automationtarget)
* [Automation Log Service](/docs/api/rest/service/automationlog)
