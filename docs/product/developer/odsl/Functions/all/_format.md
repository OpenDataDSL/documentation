Converts a date into a string using the specific format

#### Syntax
```js
string = format(date, formatstring)
```
#### Example
```js
date = Date("2020-10-22")
dstring = format(date, "ddMMMyyyy")
print dstring
```
```
22Oct2020
```

### Notes on formatstring

|Letter|Date or Time Component|Presentation|Examples|
|-|-|-|-|
|`G`|Era designator|[Text](https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html#text)|`AD`|
|`y`|Year|[Year](https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html#year)|`1996` `96`|
|`Y`|Week year|[Year](https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html#year)|`2009` `09`|
|`M`|Month in year|[Month](https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html#month)|`July` `Jul` `07`|
|`w`|Week in year|[Number](https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html#number)|`27`|
|`W`|Week in month|[Number](https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html#number)|`2`|
|`D`|Day in year|[Number](https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html#number)|`189`|
|`d`|Day in month|[Number](https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html#number)|`10`|
|`F`|Day of week in month|[Number](https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html#number)|`2`|
|`E`|Day name in week|[Text](https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html#text)|`Tuesday` `Tue`|
|`u`|Day number of week (1 = Monday, ..., 7 = Sunday)|[Number](https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html#number)|`1`|
|`a`|Am/pm marker|[Text](https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html#text)|`PM`|
|`H`|Hour in day (0-23)|[Number](https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html#number)|`0`|
|`k`|Hour in day (1-24)|[Number](https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html#number)|`24`|
|`K`|Hour in am/pm (0-11)|[Number](https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html#number)|`0`|
|`h`|Hour in am/pm (1-12)|[Number](https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html#number)|`12`|
|`m`|Minute in hour|[Number](https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html#number)|`30`|
|`s`|Second in minute|[Number](https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html#number)|`55`|
|`S`|Millisecond|[Number](https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html#number)|`978`|
|`z`|Time zone|[General time zone](https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html#timezone)|`Pacific Standard Time` `PST` `GMT-08:00`|
|`Z`|Time zone|[RFC 822 time zone](https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html#rfc822timezone)|`-0800`|
|`X`|Time zone|[ISO 8601 time zone](https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html#iso8601timezone)|`-08` `-0800` `-08:00`|
