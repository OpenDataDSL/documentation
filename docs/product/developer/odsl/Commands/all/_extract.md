Extracts data from a web page

#### Syntax
```js
varname = extract page (, selector)? into (object|rows) as name
    (fill selector with value)*
    (param selector with value)*
    (select selector)*
    (check selector | uncheck selector)*
    (click selector)*
    (assign)*
end
```

#### Description

Reads a web page, usually a dynamic page from the [DHTML service](/docs/odsl/service/dhtml), and extracts data from it into an object or a list of rows. Before the data is read, you can interact with the page: fill in fields, set parameters, select options, tick or untick boxes and click buttons, each found with a CSS selector. The assignments then set the properties of the extracted data.
