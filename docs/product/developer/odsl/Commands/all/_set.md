Used to set a session option

#### Syntax
```js
set (precision INT|rounding ROUNDING_METHOD|missing (ignore|number)?|crs (earth|planar))
```
#### Description

The set command is used to set an option within the current script session. The following options are supported:

*   decimal precision    
*   rounding method    
*   missing value treatment    
*   coordinate reference system
    

##### Setting decimal precision

The decimal precision determines the number of decimal places to use with real numbers, e.g.
```js
set precision 2
```
Sets the decimal places to 2 for all numbers

##### Setting the rounding method

The rounding method determines how numbers are rounded when shortening to meet the decimal precision value, you can select from one of the following methods:

*   ceiling    
*   down    
*   up    
*   floor    
*   half_down    
*   half_up    

##### Setting missing value treatment

Missing values can affect the way calculations are performed and therefore you can set the way that you want missing values to be treated. You can instruct ODSL to ignore missing values using the statement:
```js
set missing ignore
```
Or you can tell ODSL to use a specific value to replace missing values, e.g. if you are summing up a list of values, you can set missing as 0 so that it would not take them into account.

##### Setting the coordinate reference system (CRS)

You can set the CRS to either:

*   earth    
*   planar
    

This affects the way [geospatial data](/docs/odsl/dm/geospatial) is handled

