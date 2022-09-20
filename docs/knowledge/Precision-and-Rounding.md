---
slug: /kb/precision
tags:
  - precision
  - rounding
---
Precision and Rounding
======================================

This article explains how you can control the decimal precision and rounding method in your scripts

## Setting Precision

To set the precision or the maximum number of decimal places shown, use the set precision command as follows:
```js
// Set the precision to 2 decimal places
set precision 2
```
:::note
The default setting for precision is 6 decimal places
:::

## Setting the Rounding Method

To set the rounding method used to round values to the configured precision, use the set rounding command as follows:
```js
// Set the rounding method to be up
set rounding up
```
:::note
The default setting for rounding method is half_up
:::

Valid values for rounding method are:

*   up    
*   down    
*   ceiling    
*   floor    
*   half_up    
*   half_down    
*   half_even
    

The following table shows the effect of each rounding method on a selection of input numbers

|Input Number|`UP`|`DOWN`|`CEILING`|`FLOOR`|`HALF_UP`|`HALF_DOWN`|`HALF_EVEN`|
|-|-|-|-|-|-|-|-|
|5.5|6|5|6|5|6|5|6|
|2.5|3|2|3|2|3|2|2|
|1.6|2|1|2|1|2|2|2|
|1.1|2|1|2|1|1|1|1|
|1.0|1|1|1|1|1|1|1|
|-1.0|-1|-1|-1|-1|-1|-1|-1|
|-1.1|-2|-1|-1|-2|-1|-1|-1|
|-1.6|-2|-1|-1|-2|-2|-2|-2|
|-2.5|-3|-2|-2|-3|-3|-2|-2|
|-5.5|-6|-5|-5|-6|-6|-5|-6|

Below is an ODSL test script showing the above table:

```js
set precision 1
values = [5.5, 2.5, 1.6, 1.1, 1.0, -1.0, -1.1, -1.6, -2.5, -5.5]
up = [6,3,2,2,1,-1,-2,-2,-3,-6]
down = [5,2,1,1,1,-1,-1,-1,-2,-5]
ceiling = [6,3,2,2,1,-1,-1,-1,-2,-5]
floor = [5,2,1,1,1,-1,-2,-2,-3,-6]
half_up = [6,3,2,1,1,-1,-1,-2,-3,-6]
half_down = [5,2,2,1,1,-1,-1,-2,-2,-5]
half_even = [6,2,2,1,1,-1,-1,-2,-2,-6]

set precision 0
for i=0 to 9
    set rounding up
    assertEquals(up[i], values[i])
    set rounding down
    assertEquals(down[i], values[i])
    set rounding ceiling
    assertEquals(ceiling[i], values[i])
    set rounding floor
    assertEquals(floor[i], values[i])
    set rounding half_up
    assertEquals(half_up[i], values[i])
    set rounding half_down
    assertEquals(half_down[i], values[i])
    set rounding half_even
    assertEquals(half_even[i], values[i])
next
```
