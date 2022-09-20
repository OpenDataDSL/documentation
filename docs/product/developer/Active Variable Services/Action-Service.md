---
title: Action Service
description: The action service in the ODSL language
slug: /odsl/service/action
tags:
  - service
  - action
---

[Workflow actions](/docs/odsl/variable/action) allow you to personalise your processes with snippets of code to perform a specialised action within a workflow.

## Creating and saving actions

Creating actions are described in detail here, and once you have created your action, saving it is as easy as calling the **save** method as follows:

```js
save ${action:action_var}
```

E.g.
```js
xml_url = action in "extractors"
    // Extract XML from a HTTP URL
    in url as Scalar "The URL to read the XML from"
    out xml as Object "The XML file converted to an ODSL Object"
    exit "ok", "failed"
    
    assertType(input.url, "Scalar")
    on error ignore
    output.xml=${xml:input.url}
    if error
        print error
        return "failed"
    else
        return "ok"
    end
end
save ${action:xml_url}
```

## Listing actions

You can get a list of actions by using the **find** command as follows:

```js
var = find ${action:source/"query"} [where conditions]
```

An example of getting all public actions in the ‘extactors’ category:

```js
actions = find ${action:public/""} where category = "extractors"

for a in actions
    print a.id
next
```

## Getting a specific action

You can get an action by assigning it to a variable, e.g.

```js
xls = ${action:public/"extract_xls"}

print xls.description
```

## Deleting an action

You can delete an action using the delete command:

```js
delete ${action:"name"}
```
