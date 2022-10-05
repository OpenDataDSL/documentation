---
slug: /odsl/stages/addFields
---

## Definition
The ```addFields``` stage adds new fields to documents, the output from ```addFields``` are documents that contain all existing fields
and newly added fields.

[Read the official MongoDB documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/addFields/)

## Syntax
```addFields``` has the following form:

```js
addFields varname=expression (,varname=expression)*
```

## Behaviour
```addFields``` appends new fields to existing documents. You can include one or more ```addFields``` stages in an aggregation operation.

To add a field or fields to embedded documents (including documents in arrays) use the dot notation.

To add an element to an existing array field with ```addFields```, use with ```concatArrays```

## Examples
### Using two ```addFields``` stages 

```js
// Create a new collection in the private database called scores and add 2 documents
o1 = object as #Object
    student = "Maya"
    homework = [ 10, 5, 10 ]
    quiz = [ 10, 8 ]
    extraCredit = 0
end
o1.id = 1
save ${object:"scores"/o1}

o2 = object as #Object
    student = "Ryan"
    homework = [ 5, 6, 5 ]
    quiz = [ 8, 8 ]
    extraCredit = 8
end
o2.id = 2
save ${object:"scores"/o2}

// Use 2 addFields operations to include 3 new fields in the output documents
aggregate ${object:"scores"}
    addFields totalHomework = sum("$homework"), totalQuiz = sum("$quiz")
    addFields totalScore=add("$totalHomework","$totalQuiz","$extraCredit")
end
```

### Adding fields to an embedded document
Use dot notation to add new fields to embedded documents.
This example create a collection called vehicles and adds a new field ```fuel_type``` to the embedded document ```specs```

```js
json = `
[
      { _id: 1, type: "car", specs: { doors: 4, wheels: 4 } },
      { _id: 2, type: "motorcycle", specs: { doors: 0, wheels: 2 } },
      { _id: 3, type: "jet ski" }
   ] 
`
objects = ${json:json}
save ${object:"vehicles"/objects}

aggregate ${object:"vehicles"}
    addFields "specs.fuel_type"="unleaded" 
end
```

### Overwriting an existing field
Specifying an existing field name in an ```addFields``` operation causes the original field to be replaced.

Using the prior example data in the ```vehicles``` collection.

```js
aggregate ${object:"vehicles"}
    match _id=1
    addFields type="Motor Car" 
end
```

### Add elements to an array
Using the ```scores``` collection created earlier, you can use ```addFields``` with ```concatArrays``` to add an element to an existing array

```js
aggregate ${object:"scores"}
    match _id=1
    addFields homework=concatArrays("$homework", [7]) 
end
```
