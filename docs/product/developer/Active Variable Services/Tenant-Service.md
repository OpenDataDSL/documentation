---
slug: /odsl/service/tenant
tags:
  - service
  - tenant
---
Tenant Service
==============

A service to view and record your company information and tenancy configuration

## Description

The tenant service is a private only service that allows you to record information about your company and view information about your tenancy configuration such as service quotas etc.

## Saving your company information

The following information is recorded about your company:

*   name    
*   address1    
*   address2    
*   city    
*   postcode    
*   email    
*   phone    
*   accountContact    

To add this information in OpenDataDSL code, you need to create a basic Object and save it to the tenant service. Copy the code below, fill in the blanks and run it:
```js
company = Object()
company.name = ""
company.address1 = ""
company.address2 = ""
company.city = ""
company.postcode = ""
company.email = ""
company.phone = ""
company.accountContact = ""
save ${tenant:company}
```

## Viewing your tenant information

To look at your tenant information, run the following code:
```js
print ${tenant:""}
```
This will show in JSON the information you entered about your company, plus service quota and various other information.

