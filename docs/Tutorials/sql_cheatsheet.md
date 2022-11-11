---
slug: /tutorials/sql_cheatsheet
title: SQL Cheatsheet
description: A Cheatsheet for SQL users and developers
tags:
- tutorial
- sql
- cheatsheet
---
#### A Cheatsheet for SQL users and developers

## Getting Data
### Searching for data
In SQL, you use the `select` command to search for data, e.g.

```js
select * from object where product="Power" and country="UK"
```

The equivalent command in ODSL is `find`, e.g.

```js
find ${object} where product="Power" and country="UK"
```

### Getting a specific object (row)
To get a specific row in SQL, you would normally `select` a row using a unique key field, e.g.

```js
select * from object where id="#ECB_FX.EURGBP"
```

In ODSL, every object has a unique id, so you can access it directly and assign to a variable, e.g.

```js
eurgbp = ${object:"#ECB_FX.EURGBP"}
```

### Getting a unique list of values for a field
SQL

```js
select distinct country from object
```

ODSL

```js
find unique country from ${object}
```

## Updating Data
In SQL, updating data can be complicated depending on whether you are inserting new data or altering existing data.
if you are writing a generic application where you allow the users to both add new data and update existing data, 
you probably would use the `merge` command which was introduced to SQL in 2003 and futher enhanced in 2008.

```js
MERGE INTO tablename USING table_reference ON (condition)
  WHEN MATCHED THEN
    UPDATE SET column1 = value1 [, column2 = value2 ...]
  WHEN NOT MATCHED THEN
    INSERT (column1 [, column2 ...]) VALUES (value1 [, value2 ...]);
```

In ODSL, this is all taken care of for you using the `save` command, e.g.

```js
sample = Object()
sample.name = "Hello World"
sample.country = "UK"    
save sample
```

## Deleting Data
In both SQL and ODSL the `delete` command is used to delete data.

SQL
```js
delete from object where id="#ECB_FX.EURGBP"
```

ODSL
```js
delete ${object:"#ECB_FX.EURGBP"}
```