---
slug: /odsl/service/environment
tags:
  - service
  - environment
---
Environment Service
===================

This service allows you to manage your data environments

## Creating a new data environment

To create a new data environment, you simply need to create an Object with the same name you want to have for the environment and then save it with the environment active variable, here is an example:
```js
test = Object()
save ${environment:test}
```
This creates a data environment called test.

You can add other properties to the object which will get stored along with the environment, e.g. if you want to add a description, you can do the following:
```js
test = Object()
test.description = "My test environment"
save ${environment:test}
```
## Listing environments

To list your environments, use the **find** command:
```js
env = find ${environment:""}

for e in env    
    print json(e)
next
```
This will output the details about your environment as something like the following:
```json
{
  "_id": "test",
  "_createdBy": "user@company.com",
  "_size": "163840",
  "_timestamp": "2020-09-17T14:16:15.847Z",
  "description": "My test environment"
}
```
The JSON object contains the following properties:

*   _id - This is the name of the environment    
*   _createdBy - This is the email address of the user that created the environment    
*   _size - This is the current storage size of the environment in bytes    
*   _timestamp - This is the date and time of when the environment was first created    

It will also include any dynamic properties you added when you created/updated it

## Adding more information

You can add or change any dynamic properties on the environment by re-saving it, e.g. using the example above, if I wanted to add a department name:
```js
test = ${environment:"test"}
test.department = "Operations"
save ${environment:test}
```
If you re-read the environment, you will now see the department property added:
```js
test = ${environment:"test"}
print json(test)
```
```json
{
  "_id": "test",
  "_createdBy": "user@company.com",
  "_size": "163840",
  "_timestamp": "2020-09-17T14:16:15.847Z",
  "department": "Operations",
  "description": "My test environment"
}
```

## Deleting an environment

You can delete an environment using the **delete** command as follows:

```js
delete ${environment:"name"}
```
:::danger
Deleting an environment, deletes all the data saved in that environment!
:::

