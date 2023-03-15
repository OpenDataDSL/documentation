---
title: Options
slug: /odsl/topics/options
tags:
- options
- topics
---

Option contracts handling in OpenDataDSL

## What are options?
Financial options are contracts that give the holder the right, but not the obligation, to buy or sell an underlying asset (e.g. stock, commodity, currency) at a specified price (strike price) within a specified time period. 
Options are used for hedging and speculative purposes.


## Implied Volatility
Implied volatility (IV) of an option is calculated by solving for the volatility input in a pricing model (such as Black-Scholes) that would produce a theoretical option price equal to the market price of the option. 
This process typically involves numerical methods, such as bisection, Newton-Raphson, or a more sophisticated method, such as an iterative procedure. 
IV is considered implied because it is derived from the market price of an option rather than being directly observable.
