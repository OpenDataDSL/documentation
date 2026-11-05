---
slug: /odsl/variable/options
title: Options
tags:
- options
---
Options
=====

An Options variable holds the options for one ondate: a list of tenors (maturities), each with an option chain of strikes with the call and put values side by side.

## Introduction

You get an Options variable by reading an [EventOptions](/docs/odsl/variable/eventoptions) for an ondate:

```js
eua = ${data:"NGE.EUA:OPTIONS:2026-09-16"}
```

An Options variable is made of three levels:

|**Level**|**Type**|**What it is**|**Index**|
|-|-|-|-|
|Options|Options|The options for an ondate|by tenor: `eua["2026M09"]` or `eua["M00"]`|
|Tenor|OptionTenor|One maturity and its option chain|by strike: `t[85]`|
|Strike|OptionStrike|One strike, with its call and put values|`s.call`, `s.put`|

## Options properties

|**Name**|**Description**|**Type**|
|-|-|-|
|id|The id of the options, ending with the ondate|String|
|ondate|The ondate of these options (YYYY-MM-DD)|String|
|name|The name of the options|String|
|description|A description of the options|String|
|currency|The currency code|String|
|units|The units code|String|
|timezone|The timezone of the ondate|String|
|value|The main value column|String|
|columns|The columns in the strike tables|List|
|tenors|The tenors (maturities) in delivery order|List|
|identity|The configured identity|Object|
|properties|The properties: `event`, `modified`, and for a positions view `positions`, `positionDate` and `unpriced`|Object|

## Options methods

|**Name**|**Description**|**Return Type**|
|-|-|-|
|tenor(code)|Gets a tenor (maturity) by its tenor, absolute or relative code, null when it is not there|OptionTenor|
|value(tenor, strike, callPut, column)|Gets a value of one option|Scalar|
|count()|The number of options (call and put prices at a strike count separately)|Number|
|size()|The number of tenors|Number|

## OptionTenor properties

|**Name**|**Description**|**Type**|
|-|-|-|
|tenor|The tenor of this maturity (the value of the tenor property, e.g. 2026M09)|String|
|absolute|The absolute tenor code, e.g. 2026M09|String|
|relative|The relative tenor code on the ondate, e.g. M01|String|
|start|The start of the delivery period (date)|String|
|end|The end of the delivery period (date, inclusive)|String|
|expiry|The expiry date of the options|String|
|strikes|The strikes (option chain rows) in ascending order|List|

## OptionTenor methods

|**Name**|**Description**|**Return Type**|
|-|-|-|
|strike(price)|Gets the option chain row for a strike, null when the strike is not there|OptionStrike|
|nearest(price)|Gets the option chain row with the strike nearest to a price (e.g. the at-the-money strike for the underlying price)|OptionStrike|
|values(callPut, column)|Gets one column of the calls (C) or puts (P) as a list in strike order (missing values are null)|List|
|strikePrices()|Gets the strike prices as a list in ascending order|List|
|size()|The number of strikes|Number|

## OptionStrike properties and methods

|**Name**|**Description**|**Type**|
|-|-|-|
|strike|The strike price, as exact text so that `strike == 85` works|Scalar|
|call|The call option values by column (empty when there is no call at this strike)|Object|
|put|The put option values by column (empty when there is no put at this strike)|Object|
|get(callPut, column)|Gets a value of the call (C) or put (P) at this strike|Scalar|

In a positions view the held side also has `POSITION_VOLUME` and `TRADED_PRICE`.

## OptionsDates

Reading an EventOptions without an ondate gives an OptionsDates: the ondates the options can be built for, each referencing `OBJ:ID:YYYY-MM-DD`. It works like the [CurveDates](/docs/odsl/variable/curve) of a curve, including ranges and the `L`, `L-1` and `-YYYY-MM-DD` ids.

## Examples

#### Going through the option chains
```js
eua = ${data:"NGE.EUA:OPTIONS:2026-09-16"}
for t in eua
    print t.tenor + " expires " + t.expiry
    for s in t
        print s.strike
        print s.call
        print s.put
    next
next
```

#### A volatility smile
```js
sep = eua["2026M09"]
strikes = sep.strikePrices()
vols = sep.values("C", "OPTION_VOLATILITY")
```

#### The at-the-money strike
```js
atm = eua["2026M09"].nearest(86.4)
print atm.strike
print atm.call.DELTA_FACTOR
```

#### Strikes matching a condition
```js
above = eua["2026M09"].strikes[strike > 82]
```
