Creates a reference to an active variable. This is used when you don’t want to have a static object inside another object, instead this creates a dynamic reference to an object which is fetched whenever the property is requested.

#### Syntax
```js
reference = ref(var)

or

reference = ref(service, id)
```
#### Example
```js
// Create an invoice type
invoice = type
    description as String()
    amount as Scalar()
end

// Create a customer type
customer = type
    name as String()
    invoices as List()
end

// Create a customer
john = object as customer
    name = "John Doe"
end

// Create an invoice
inv1 = object as invoice
    description = "Widget"
    amount = 12.36
end

// Add a reference to the invoice
john.invoices.add(ref(inv1))
```

You can also add references as variables on any dynamic variable, e.g.

```js
sc = SmartCurve("baseCurve", "(BASE+OFFER)/2")
sc.OFFER = ref("data", "otherCurve")
```