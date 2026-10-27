---
title: AI Playbook Service
description: REST API for the Fusion AI playbook service
slug: /api/rest/service/aiplaybook
tags:
  - api
  - service
  - aiplaybook
  - fusion-ai
  - playbooks
---
The AI playbook resource holds Fusion AI playbooks: markdown documents that describe a governed piece of work, step by step, which Fusion runs as a task. See [What are playbooks?](/docs/extensions/fusion-ai/playbooks/overview) and the [playbook syntax](/docs/extensions/fusion-ai/playbooks/syntax).

## AI Playbook REST API

The AI Playbook REST API is accessed through the following URL:
```js
https://api.opendatadsl.com/api/aiplaybook
```

Your own playbooks are in private. The library playbooks published by OpenDataDSL are in public, with ids starting with #. Every save creates a new version.

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|\{release\}/\{source\}|v1/public  v1/private|List the library playbooks or your own|
|GET|\{release\}/\{source\}/\{key\}|v1/private/dataset-delivery-summary|Retrieve a playbook|
|GET|\{release\}/\{source\}/\{key\}/\{version\}|v1/private/dataset-delivery-summary/2|Retrieve a version of a playbook|
|GET|\{release\}/\{source\}/\{key\}/*|v1/private/dataset-delivery-summary/*|List the versions of a playbook|
|PUT|\{release\}/\{source\}/\{key\}/\{version\}/\{tag\}|v1/private/dataset-delivery-summary/2/PROD|Tag a version|
|POST|\{release\}/\{source\}|v1/private|Create or update a playbook|
|DELETE|\{release\}/\{source\}/\{key\}|v1/private/dataset-delivery-summary|Roll back to the previous version, or delete the playbook if it has only one version|
|DELETE|\{release\}/\{source\}/\{key\}/*|v1/private/dataset-delivery-summary/*|Delete a playbook and all its versions|

## Saving a playbook

The body only needs the markdown, in `source`:

```js
POST https://api.opendatadsl.com/api/aiplaybook/v1/private
Authorization: Bearer {{token}}
Content-Type: application/json

{"source": "---\nid: dataset-delivery-summary\nname: Dataset delivery summary\n---\n..."}
```

The platform parses the markdown and rejects the playbook if it has errors, listing up to ten of them with their line numbers. The id is taken from the front matter: if you also give an `_id`, it must match. Public ids must start with # and private ids must not.

The other fields are worked out from the markdown and stored with it, so lists never need to parse the markdown:

|**Name**|**Description**|**Type**|
|-|-|-|
|_id|The playbook id, from the front matter|String|
|source|The playbook markdown|String|
|name, category, description, assistant, icon|From the front matter|String|
|tags|From the front matter|String[]|
|featured|True if the playbook is featured in the library|Boolean|
|template|The task template: the input fields, the plan of steps and the outputs|Object|
|stepCount, inputCount, gateCount, checkCount, transitionCount|The number of steps, inputs, approval gates, checks and transitions|Integer|
|tools|The tools the steps can use|String[]|
|changesPlatform|True if any step can change platform data|Boolean|
|maxTokens|The most tokens a run may use|Integer|
|warnings|Warnings found when the markdown was parsed, each with its line number|String[]|
|copiedFrom|For a copy of a library playbook: the playbook and version it was copied from|Object|
