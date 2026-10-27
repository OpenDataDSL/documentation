Creates a report configuration from a report creator

#### Syntax
```js
varname = report with creator
    (property = value)*
end
```

#### Description

Creates a [report configuration](/docs/odsl/variable/report) from a [report creator](/docs/odsl/variable/reportcreator), given as a variable or by its id. Set the report's properties, such as name, description, category and script, and the values of the creator's parameters.

#### Examples
```js
summary = report with "PRICE_SUMMARY"
    name = "TTF price summary"
    category = "Gas"
end
save ${reportconfig:summary}
```
