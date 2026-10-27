---
title: User Service
description: REST API for the user service
slug: /api/rest/service/user
tags:
  - api
  - service
  - user
---
The user resource is a service to view and record your user information

## User REST API

The User REST API is a private API allowing you to read and update your user information and is accessed through the following URL:
```js
https://api.opendatadsl.com/api/user
```
The API consists of the following calls:

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|\{release\}|v1|List all users for your tenant|
|GET|\{release\}/me|v1/me|Get your user information|
|GET|\{release\}/\{email\}|v1/priya.shah@northgate-energy.com|Get another user's information from your tenant|
|POST|\{release\}|v1|Update your user information, or create or delete an API key|
|PUT|\{release\}/\{connection\}/\{username\}/\{password\}|v1/morningstar/user/secret|Store your credentials for an external data connection, such as Morningstar. The password is kept in the secret store, never in the user record|
|GET|\{release\}?_function=invite&email=\{email\}|v1?_function=invite&email=tom.clarke@northgate-energy.com|Invite someone to join your tenant: they are emailed an invite code|

### Extra fields

Add these names to `_project` when you read a user to get more information:

|**Field**|**Description**|
|-|-|
|policies|The security policies that apply to the user|
|features|The features the user can use, from your tenant's features and the feature policies|
|roles|Your roles (only with me)|
|groups|Your groups (only with me)|

## API keys

If your tenant allows API keys, you can create one for yourself with a POST. `start` and `expires` are optional dates:

```js
POST https://api.opendatadsl.com/api/user/v1
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "api-key": "create",
  "name": "etrm-feed",
  "expires": "2027-10-31"
}
```

The response holds the key in `key`. It is only shown once, so keep it safe: use it as the Bearer token in the Authorization header. The user record lists your keys (without the key itself) in `keys`. To delete a key, post the same body with `"api-key": "delete"`.

## Updating your user information

To update your user information, make a POST request to the user service, for example:
```js
POST https://api.opendatadsl.com/api/user/v1
Authorization: Bearer {{token}}

{
  "properties": {
    "firstname": "Anon",
    "lastname": "User",
    "nickname": "anon",
    "newsletter": "true"
  }
}
```
