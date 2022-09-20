Used in an ETL process to map data from an input format to output objects

#### Syntax
```js
name = transform inputVariable into (declaredType|object|rows) as varname 
  (comment)? 
  transformOptions 
  transform 
end

transformOptions: (transformCreate)? (transformUnique)? (on error ignore)? (transformIgnore)?

transformCreate: create with varname (, varname)* (transformClear)?
transformUnique: unique var=value
transformIgnore: ignore condition (, condition)*
transformClear: clear varname (, varname)*

transform: (assign|method|transformIf|print|comment|NL)*
transformIf: if condition
  transform (elseif condition transform)* 
  (else transform)?
end
```
#### Description

The transform command creates a transformer that can be used to convert an input object usually read from a file or web URL into one or more output objects

##### Explanation of the syntax

*   The **inputVariable** is the input object that you want to transform from    
*   The **into** declaration can be one of:    
    *   A named public or private declaredType        
    *   A generic object        
    *   A rows object, which is effectively rows or properties like a CSV file or spreadsheet        
*   The **as varname** part defines the temporary object variable holding the current value as the input variable is iterated through    
*   The comment on the first row of the transformer is used as the description of the transformer    
*   The options section at the top of the transformer can contain the following:    
    *   **create** \- this defines which column or property name in the input variable which when the value changes defines what creates an output object, e.g. if there is a _name_ property in the input variable which is different for each element that you want to create an object for you would use the option: **create with name**.        
        *   **clear** \- this works with create and allows you to clear some property values in between creating a new object, this means that you don’t get properties repeating from other objects if their value isn’t supplied.            
    *   **unique** \- this defines the unique id for the output variables and enables you to concatenate properties and clean up vairable names etc.        
    *   **on error ignore** \- this allows the transformer to complete ignoring and transformation errors - sometimes this is necessary when formats cause execution errors        
    *   **ignore** \- this allows you to skip elements that match any supplied condition, for example if a proeprty is null which would cause issues you can specify that condition here
        

#### Examples

The following example creates a transformer and then runs the transformer using input data from an xml file on the ECB web site.
```js
// Create the transformer
ECB_FX = transform xml into #ForeignExchange as fx
    create with Cube
    unique id = "ECB\_FX\_EUR" + fx.currency
    SPOT = TimeSeries(xml.Cube.Cube.time, "BUSINESS", fx.rate)
    category = "Foreign Exchange"
    product = "ECB_FX"
    provider = "European Central Bank"
    model = "EUR" + fx.currency
    description = "European Central Bank Euro FX rates EUR/" + fx.currency
    base = "EUR"
    currency = fx.currency
end

// Test
xml=${xml:"https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml"}
models = ECB_FX.run(xml)
for model in models
    print model.id
next
```

The following example shows some static JSON content being transformed in 2 different ways and also introduces using metadata to decorate the output results.

```js
// The static input JSON
json = `{
    timestamp: "12Oct2020",
    data: \[
        {
            identity: "A",
            value: 1.2
        },
        {
            identity: "B",
            value: 1.5
        },
        {
            identity: "C",
            value: 999
        }
    \]
}`

// Convert to an object
input = ${json:json}

// Create a type to convert the JSON into
example = type
    name as String()
    description as String()
    value as Scalar()
end

// Create some metadata to decorate the output data
metadata = Object()
metadata.A = "A description"
metadata.B = "B description"

// A transformer to convert the JSON into the example type
tx = transform input into example as x
    create with data
    unique name = x.identity
    on error ignore
    ignore x.identity == "C"
    name = x.identity
    description = metadata.get(x.identity)
    value = x.value
end

// Run the transformer and output the results as JSON
result = tx.run(input)
print json(result)

// Another transformer that outputs the results as rows
rowtx = transform input into rows as x
    create with data
    unique name = x.identity
    on error ignore
    ignore x.identity == "C"
    name = x.identity
    description = metadata.get(x.identity)
    value = x.value
end

// Run the transformer and print out the results and size of the results
rowresult = rowtx.run(input)
print json(rowresult)
print rowresult.size
```
