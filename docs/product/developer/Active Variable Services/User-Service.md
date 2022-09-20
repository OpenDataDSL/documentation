---
slug: /odsl/service/user
tags:
  - service
  - user
---
User Service
=============

A service to view and record your user information

## Description

The user service is a private only service that allows you to record information about you and view information about your colleagues.

## Saving your User Information

You can save the following information about yourself in the system:

*   name    
*   address1    
*   address2    
*   city    
*   postcode    
*   email    
*   phone   

To add this information using ODSL, you need to create an Object, set properties on it and save it to the user service. Copy the code below, fill in the blanks and run it.
```js
user = Object()
user.name = ""
user.address1 = ""
user.address2 = ""
user.city = ""
user.postcode = ""
user.email = ""
user.phone = ""
save ${user:user}
```

## Viewing your User Information

To look at your user information, run the following code:
```js
print ${user:"me"}
```
This will show in JSON the information you entered about you and various other information.

## Viewing your Colleagues

To get a list of your colleagues that have connected to OpenDataDSL, run the following code:

```js
colleagues = find ${user}
print colleagues
```
