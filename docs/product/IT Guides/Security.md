---
title: Security
description: IT guide for security
slug: /it/security
sidebar_position: 1
tags:
  - security
  - authorization
  - authentication
---
Detailed technical information on user authorization and access control

## Authorization

Users are authenticated using Azure AD for SSO. 
Simply log into Microsofts Azure Active Directory using your companies email address, if you are the first person from your company to log in, you will be asked to enter some information about your company first.

## Authentication

User authentication is the process of limiting what users can access according to the work they need to perform. Authentication is split into 2 functional parts, application and data roles.

### Application roles

Application roles determine the degree of access your users have when using various aspects of the application and services. Application roles are global and fixed. The following table shows all the application roles and what they allow/restrict:

#### Global Access Roles

| **Role** | **Name** | **Description** | 
|-|-|-|
|ODSL.admin|Tenant Administration|Administrator role which allows full access to everything|
|ODSL.api-user|Full API User|Basic service access allowing read-only access to all services|


#### Job Based Roles

| **Role** | **Name** | **Description** | 
|-|-|-|
|ODSL.it-admin|IT Administration|Allows full access to the Environment, Queue, Subscription, Tenant and User Services|
|ODSL.analyst|Data Analyst|Allows full access to the Object and Data Services|
|ODSL.developer|Application Developer|Allows full access to the Action, Workflow and Process Services|
|ODSL.modeller|Data Modeller|Allows full access to the Type, Transformer, Extractor and Object Services|

#### Fine Grained Roles

| **Role** | **Name** | **Description** | 
|-|-|-|
|ODSL.action|Actions|Allows full CRUD access to the Action Service|
|ODSL.calendar|Calendars|Allows full CRUD access to the Calendar Service|
|ODSL.environment|Environments|Allows full CRUD access to the Environment Service|
|ODSL.extractor|Extractors|Allows full CRUD access to the Extractor Service|
|ODSL.index|Indexes|Allows full CRUD access to the Index Service|
|ODSL.object|Objects|Allows full CRUD access to the Object Service|
|ODSL.process|Processes|Allows full CRUD access to the Process Service|
|ODSL.queue|Queues|Allows full CRUD access to the Queue Service|
|ODSL.script|Scripts|Allows full CRUD access to the Script Service|
|ODSL.subscription|Subscriptions|Allows full CRUD access to the Subscription Service|
|ODSL.tenant|Tenant|Allows full CRUD access to the Tenant Service|
|ODSL.transformer|Transformers|Allows full CRUD access to the Transformer Service|
|ODSL.type|Types|Allows full CRUD access to the Type Service|
|ODSL.workflow|Workflows|Allows full CRUD access to the Workflow Service|

### Adding roles to a user/group
Here are some instructions for assigning the ODSL application roles to your Active Directory Users or Groups.

1. In Azure Active Directory, select Enterprise Applications
2. Find and select the OpenDataDSL application - it has an application Id `d3742f5f-3d4d-4565-a80a-ebdefaab8d08`
3. Select Users and Groups
4. Click Add user/group
5. Click on users
6. Find and select the user and click the Select button
7. Click on Select a role
8. Select a role and click the Select button
9. Click the Assign button to assign the role to the user  

### Adding roles to an application
You can also add application roles to an unattended application in Active Directory.

1. In Azure Active Directory, select App Registrations
2. Find and select the application you want to add rights to
3. Select API permissions
4. Click Add a permission
5. Select APIs my organization users
6. Find and select the OpenDataDSL application - it has an application Id `d3742f5f-3d4d-4565-a80a-ebdefaab8d08`
7. Click Application permissions
8. Select the permissions you want to add to the application
9. Click the Add permissions button

:::note
Adding application permissions requires Admin Consent
:::

### Data roles

Data roles determine what data (from the Object Service) a user can access. 
All public data is accessible by everyone, but your own private proprietary data can be secured using Azure Active Directory Groups that you assign users to.

#### Private data roles

Private data roles can be created by a company administrator or a user with the ‘data-role’ application role. 
Roles can be added to your private objects using the **_access** property on your object which should match the private role that has been defined.

You can assign an ‘ALL’ data role which allows access to all private data.

