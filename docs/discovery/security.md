---
title: Security
hide_title: true
sidebar_position: 7
tags:
  - discovery
  - odsl
  - security
  - roles
---
import StartBuilding from '/src/components/StartBuilding.js';
import {Discovery, InDepth} from '/src/components/Discovery.js';

<Discovery title="Security" text="This discovery guide gives an overview of how security (authentication and authorisation) is handled with information about security basics and recommendations, including system users, roles and other best practices." />

## Security Basics
In order to use our applications and services you need to authenticate yourself using your own Azure Active Directory.
This generates a token that we use to identify who you are and which company you belong to.

:::info
We never get to see your password or any other information that you don't want to share with us - you are protected by your own internal I.T. security team!
:::

<InDepth href="/docs/it/security" />

## Security Best Practices
As OpenDataDSL utilises your own Identity Provider (IDP), we always recommend that you follow your internal I.T. security team best practices.

For clarity, the OpenDataDSL applications and services are compatible with all the Azure AD best practices:
* Treat identity as the primary security perimeter
* Centralize identity management
* Manage connected tenants
* Enable single sign-on
* Turn on Conditional Access
* Plan for routine security improvements
* Enable password management
* Enforce multi-factor verification for users
* Use role-based access control
* Lower exposure of privileged accounts
* Control locations where resources are located
* Use Azure AD for storage authentication

*See [Azure Identity Management and access control security best practices](https://docs.microsoft.com/en-us/azure/security/fundamentals/identity-management-best-practices)*

## Application and Data Roles
### Application Roles
We control who has what kind of access to the services using Azure Application Roles.
These application roles are configured for users in your company by your own I.T. security team.

### Data Roles
Read access to all `public` data is open to everyone in your company.
Access to your own `private` data is configured using Azure Active Directory Groups that your I.T security team can assign to the users in your company.

<InDepth href="/docs/it/security" />

