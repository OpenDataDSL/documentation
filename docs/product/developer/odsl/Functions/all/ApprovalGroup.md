---
slug: /odsl/function/ApprovalGroup
---
Creates a new curve approval group.

A curve approval group consists of the following properties:
* name - The name of the group
* description - A description of the group
* approvers - A list of email addresses or application id's of the approvers that can approve curves that are in this group
* version - An optional tag to mark the version of this approved curve 

#### Syntax
```js
g = ApprovalGroup()
```

#### Example
```js
g = ApprovalGroup()
g.name = "default"
g.description = "Default Approval Group"
g.approvers.add("user@opendatadsl.com")
g.approvers.add("39c6cccd-d6ea-4ac1-b564-8e4d1e28d75d")
g.version = "APPROVED"
save g
```
