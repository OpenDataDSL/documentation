Links two objects together

#### Syntax
```js
link activevar (as)? parent(/child)? (of)? activevar
```

#### Description

Adds a named link between two of your private objects: the second object gets a link called **parent** to the first, and, if you give a child name, the first object gets a link with that name to the second. Both objects are saved.

Both objects must be private, and their types must allow links.

#### Examples
```js
// The site is the parent of the meter, and the meter is a child of the site
link ${object:"NGE.SITE.EEMSHAVEN"} as site/meter of ${object:"NGE.METER.EEM01"}
```
