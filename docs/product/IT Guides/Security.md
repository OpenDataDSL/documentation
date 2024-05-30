---
title: Security
description: IT guide for security
slug: /it/security
sidebar_position: 1
tags:
  - security
  - authorization
  - authentication
  - policy
---
Detailed technical information on user authorization and access control

## Authorization

Users are authenticated using Azure AD for SSO. 
Simply log into Microsoft's Azure Active Directory using your companies email address, if you are the first person from your company to log in, you will be asked to enter some information about your company first.

### API Keys
A user can create API keys for use with an external application, they key is used, along with the users email address for authorizing the connection to OpenDataDSL.
These should only be used when Azure AD authentication cannot be used and they can be turned off at the tenant level if the companies policies do not allow for them.

See [here](/docs/odsl/command/statements#api-key) for details about how to create API Keys in ODSL Code

#### Using API Keys
To use the key, you need to add it as a header in the REST request you make as either a Basic Authorization header or ODSL specific headers as shown below:

**As an Authorization Header**
```
Authorization: Basic <base 64 encoded email:key>
```

**As ODSL Headers**
```
x-odsl-email: user@company.com
x-odsl-key: <key>
```

#### Denying use of API Keys
If you don't want to allow your users to create or use API Keys, you can add the setting **DENY_API_TOKENS=true** to your tenant.

```
POST https://api.opendatadsl.com/api/tenant/v1
Authorization: Bearer {{token}}

{
	"settings": {
		"DENY_API_KEYS": true
	}
}
```

## Authentication

User authentication is the process of limiting what users can access according to the work they need to perform.

[Policies](/docs/odsl/variable/policy) are used to define what users or groups of users are allowed to do in the system. 

### Static Policies
There are a number of built-in, static policies that a user is given by default:

|**Name**|**Description**|
|-|-|
|ReadMyProfile-Built-In|Allows you to read and update your own profile|
|ReadTenantUsers-Built-In|Allows you to read the profiles of all users in your tenant|

### Implied Policies
Implied policies are policies that are automatically added to a user if certain conditions are met:

#### User has create and update rights to the object service

|**Name**|**Description**|
|-|-|
|ManageAllData-Built-In|Allows full CRUD access to the data service|
|ManageAllEvents-Built-In|Allows full CRUD access to the event service|

### Default Policies
When a new tenant is onboarded, the following policies are automatically created by default.

|**Name**|**Description**|
|-|-|
|ManageAllPrivateData|Allows full CRUD access to all private data|

:::note
Before removing or changing this policy, ensure you add a policy to allow someone in your tenant to manage policies
:::

For full details on policies and how to manage them, see [Policies in ODSL](/docs/odsl/variable/policy)
