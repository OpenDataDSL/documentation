---
sidebar_position: 7
slug: /odsl/command/conditions
---
Conditions
==========================

The usage of conditions in the OpenDataDSL Language

## Syntax

The syntax for a condition:
```JS
variable
    | 'not' variable
    | expression ('<'|'<='|'>'|'>='|'='|'=='|'!='|'like'|'intersects'|'within') expression
    | condition ('and'|'or') condition
    | '(' condition ')'
```

## Use within the language

Conditions can be used at various places within the OpenDataDSL language as shown in the following table:

|**Command**|**Description**|
|-|-|
|Aggregate|Used in a match directive in an [aggregate](/docs/odsl/command/aggregate) command|
|Find|Used as a condition in a [find](/docs/odsl/command/find) command, searching for something|
|Transform|Used within a [transform command](/docs/odsl/command/transform) in both ‘if’ statements and ‘ignore’ directives|
|If|Used in the [if](/docs/odsl/command/if) control statement|
|While|Used in the [while](/docs/odsl/command/while) control statement|

## Examples

### Aggregation Example
```js 
summary = aggregate ${exec}
    match service="ETL"
    group _id="$status", qty=count()
    sort qty desc
end
```

### Find Example
```js
records = find ${audit} where 
    timestamp > ${date:"today"} 
    and timestamp < ${date:"tomorrow"}
end
```
### Transform Example

```js
ignoe contains(ag.column\[0\], "Date")
unit="MT"
if contains(input.product, "Potato")
  unit="100KGS"
end 
```

### If Example
```js
if a==1 and b==2
    print 1
elseif (a==2 or b==2)
    print 2
elseif (a>2 and b==3) or c
    print 3
end
```

### While Example
```js
X=1
while X<5
   X=X+1
end
```
