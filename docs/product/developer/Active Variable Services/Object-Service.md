---
slug: /odsl/service/object
tags:
  - service
  - object
---
Object Service
==============

The object service allows you to manage, browse, search for and use stored objects

## Creating Objects

All objects have a [type](/docs/odsl/variable/declaredtype) - this is a structure that defines the properties that you would expect on an object. Individual objects can also have dynamic properties that are not included in the type structure. If you create an object without specifying a type, ODSL will add a #Object type to it.

### Creating a basic object

You can create a simple object using the basic Object constructor, e.g.
```js
myobject = Object()
```
This creates a dynamic object of type #Object which has the following standard properties:

*   name    
*   description    
*   classification    
*   geolocation
    

### Creating a typed object

You can create an object from a type in 2 different ways:

#### Using a constructor
```js
london = Object("#Location")
```
#### Using an object structure
```js
london = object as #Location
    name = "London"
end
```
The only difference between the 2 methods is that with the object structure you can directly set some properties.

## Saving Objects

To save an object, you use the save command as shown in the code snippet below:
```js
myobject = Object()
myobject.name = "My Test"

save ${object:myobject}
```
This will save a private object called myobject of type #Object to the database.

## Reading Objects

You can find objects using the [find](/docs/odsl/command/find) command and searching for objects is covered in this [article](/docs/tutorials/searching). If you know the id of the object you want, you can directly read the object using the active variable, e.g.
```js
myobject = ${object:"myobject"}
```

## Deleting Objects

To delete an object from the database, you use the delete command.
```js
delete ${object:"myobject"}
```
If [versioning](/docs/odsl/dm/versioning) is enabled on the object type you are deleting, then the delete command performs a roll back. To completely delete a versioned object, add a * version modifier to the delete command, e.g.

```js
delete ${object:"myobject":*}
```
