---
title: Options
description: Options data type, option chains per maturity
slug: /odsl/topics/options
tags:
- options
- topics
---

## What are options?

Financial options are contracts that give the holder the right, but not the obligation, to buy (a call) or sell (a put) an underlying asset, such as a commodity future, at a specified price (the strike price) up to an expiry date. Options are used for hedging and speculative purposes.

## What is options data used for?

Options data is used to:

* Value the options you hold (settlement prices)
* Build volatility smiles and surfaces (implied volatilities by strike and maturity)
* Hedge the options you hold (deltas)
* Follow the market (open interest and traded volume)

## What does options data look like?

Options data has:
* An *ondate*, the date the options were settled
* A list of tenors (maturities of the underlying future), each with an expiry date
* For each tenor, an *option chain*: one row per strike, with the call and put values side by side

### Example
The ICE Endex EUA futures options on the 16th September 2026, September 2026 maturity (expiry 23rd September 2026):

|**Strike**|**Call settle**|**Call vol**|**Call delta**|**Put settle**|**Put vol**|**Put delta**|
|-|-|-|-|-|-|-|
|80|5.20|24.10|0.91||||
|85|0.91|22.08|0.4662|1.05|22.50|-0.5338|
|90||||5.00|21.00|-0.95|

## Implied Volatility
Implied volatility (IV) of an option is calculated by solving for the volatility input in a pricing model (such as Black-Scholes) that would produce a theoretical option price equal to the market price of the option.
This process typically involves numerical methods, such as bisection, Newton-Raphson, or a more sophisticated method, such as an iterative procedure.
IV is considered implied because it is derived from the market price of an option rather than being directly observable.

## More information
Some links with further information about options:

* [Options topic](/docs/topics/options/intro)
* [Traded options](/docs/topics/options/traded-options)
* [EventOptions variable in ODSL](/docs/odsl/variable/eventoptions)
* [Options variable in ODSL](/docs/odsl/variable/options)
* [Options functions in ODSL](/docs/odsl/function/functions-options)
* [Options in the Data REST service](/docs/api/rest/service/data#options)
