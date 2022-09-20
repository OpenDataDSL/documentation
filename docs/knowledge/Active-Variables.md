---
slug: /kb/av
tags:
  - av
---
Active Variables
================================

In OpenDataDSL, active variables provide a way to interact with the database and services to help you collect, validate, manage and report on your data.

The syntax of an active variable is as follows:
```js
${service (:source)? }
${service: (source/)? id (:version)? (,option)* } (for range)?
```
Examples:
```js
actvar = ${action:"#name"}
save ${action:actvar}
tag ${action:actvar} as PROD
actvarprod = ${action:"#name":PROD}

objects = find ${object:public} where dataset == "BOE_FX"
```
