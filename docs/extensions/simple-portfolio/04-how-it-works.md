---
title: How it works
description: The data, calculations, automations and scripts behind the Simple Portfolio extension, with ODSL examples
slug: /extensions/simple-portfolio/how-it-works
sidebar_position: 4
tags: [extension, simple portfolio, automations, odsl, events, smart timeseries]
---

# How it works

Simple Portfolio uses standard platform features only. This page describes where its data is kept, how the numbers are calculated and what keeps them up to date.

---

## Where the data is kept

| Data | Where | Id |
|-|-|-|
| Portfolios | Groups (service `data`, type `Portfolio`, category `Simple Portfolio`) | `data:Portfolio:Simple Portfolio:` followed by the name |
| Trades | Events of type `simple_portfolio_event` in the private master data object `SIMPLE_PORTFOLIO` | Event list `SIMPLE_PORTFOLIO:TRADES` |
| Instrument P&L | A smart timeseries on `SIMPLE_PORTFOLIO` | `SIMPLE_PORTFOLIO:` followed by the instrument id with `.` and `:` replaced by `_`, e.g. `SIMPLE_PORTFOLIO:ICE_IFEU_B_SETTLE_M01` |
| Portfolio P&L | A timeseries on `SIMPLE_PORTFOLIO` | `SIMPLE_PORTFOLIO:` followed by the portfolio name, e.g. `SIMPLE_PORTFOLIO:Portfolio1` |

A trade event has these fields:

| Field | Type | Meaning |
|-|-|-|
| `TRADE_ID` | String | Your trade reference |
| `INSTRUMENT` | String | The instrument id |
| `PRICE` | Number | The traded price |
| `VOLUME` | Number | The traded volume, negative for a sale |
| `OPEN_INTEREST` | Number | The running net volume of the instrument after this trade (calculated) |
| `OPEN_VOLUME` | Number | What is still open of this trade (calculated; starts as `VOLUME`) |

---

## The calculations

**Instrument P&L** (`calculatePNL`, run as a smart timeseries on the instrument's market data): the market data is filled forward to today on a business-day calendar. For each trade, from the trade date onwards, it adds (market price - trade price) x volume. So a purchase of 1,000 at 61.12 shows a P&L of 1,000 x (price - 61.12) every day after it, and a later sale of 2,000 at 65.00 adds -2,000 x (price - 65.00).

**Portfolio P&L** (`calculatePortfolio`): the sum of the P&L of the portfolio's instruments. The instrument smart timeseries are created the first time a portfolio is recalculated.

**Open interest** (`calculateOpenInterest`): for each instrument, the running total of `VOLUME` in trade order.

**Open volume** (`calculateOpenVolume`): first in, first out. Each sale closes the oldest open purchases of the same instrument until its volume is used up, and what is left of each trade is its open volume.

The open interest and open volume are saved back to the trades as a history load, so saving them does not trigger the automations again.

---

## Automations

The recalculation runs from automations on the automation target **Recalculate Simple Portfolio P&L** (`odsl.simple_portfolio_recalc`), which runs the script `simple_portfolio_recalc`. There are two kinds:

| Automation | Fires when | Property `portfolio` | Recalculates |
|-|-|-|-|
| Trades | The event list `SIMPLE_PORTFOLIO:TRADES` is updated (a trade is added or changed) | `*` | Every portfolio, then the open interest and open volume |
| One per portfolio | The market data of one of the portfolio's instruments is updated | The portfolio's group id | That portfolio |

A portfolio automation has one condition (service `data`, action `update`) for each instrument. A curve tenor such as `ICE.IFEU.B:SETTLE:M01` is updated through its curve, so the condition watches the curve `ICE.IFEU.B:SETTLE`. Ids starting with `#` are public data; anything else is private.

The automations are kept up to date for you:

- the install creates the trades automation and an automation for each existing portfolio
- recalculating all portfolios (after every trade) creates or updates the automation of each portfolio
- the Simple Portfolio view updates a portfolio's automation as soon as you create the portfolio or add or remove an instrument
- the **Recalculate** button updates the automation it is about to run (and creates the trades automation if it is missing)
- the uninstall deletes them

The **Recalculate** button runs one of these automations straight away with `GET /api/automation/v1/ID?_run=true`: the portfolio's automation for **This portfolio**, the trades automation for **All portfolios**. The platform runs it while the request waits and returns the automation log entry, whose `status` and `message` the view shows.

You can see them in the portal's automations list: they are named, for example, *recalculate Simple Portfolio 'Portfolio1'*.

:::note Upgrading from an earlier version
Earlier versions used subscriptions, which are being replaced by automations. Running the install script again removes the old subscriptions and creates the automations.
:::

---

## Scripts

All scripts are in `odsl-extensions\extensions\simple_portfolio\`.

| Script | Purpose |
|-|-|
| `simple_portfolio_functions` | The calculation and automation functions, imported by the other scripts |
| `simple_portfolio_recalc` | The automation target script: recalculates one portfolio, or all of them when `#PROPERTIES.portfolio` is `*` (or when run by hand) |
| `simple_portfolio_recalc_all` | Recalculates every portfolio, their automations, and the open interest and open volume |
| `simple_portfolio_install` | Creates the `SIMPLE_PORTFOLIO` object and the automations, and removes old subscriptions |
| `simple_portfolio_uninstall` | Deletes the extension's automations |

---

## Doing it in ODSL

### Create a portfolio and its automation

```js
//#region Create a portfolio
import ${script:"odsl-extensions\extensions\simple_portfolio\simple_portfolio_functions"}

g = Group()
g.type = "Portfolio"
g.category = "Simple Portfolio"
g.service = "data"
g.name = "Brent and gasoil"
g.items = ["ICE.IFEU.B:SETTLE:M01", "ICE.IFEU.G:SETTLE:M01"]
save g

g = ${group:"data:Portfolio:Simple Portfolio:Brent and gasoil"}
ensurePortfolioAutomation(g.id)
//#endregion
```

### Add a trade

```js
//#region Add a trade
SIMPLE_PORTFOLIO = Object()

e = Event(Date("2026-10-16T12:37:22"))
e.eventtype = "simple_portfolio_event"
e.TRADE_ID = "AX/26/10/0412"
e.INSTRUMENT = "ICE.IFEU.B:SETTLE:M01"
e.PRICE = 61.12
e.VOLUME = 1000
e.createId()

SIMPLE_PORTFOLIO.TRADES = e
save SIMPLE_PORTFOLIO
//#endregion
```

Saving the trade fires the trades automation, which recalculates everything.

### Read a portfolio's P&L

```js
//#region Read the P&L of a portfolio
pnl = ${data:"SIMPLE_PORTFOLIO:Brent and gasoil"}
print pnl
//#endregion
```

### Recalculate by hand

```js
//#region Recalculate everything
import ${script:"odsl-extensions\extensions\simple_portfolio\simple_portfolio_functions"}
recalculateAll()
//#endregion
```

### List the extension's automations

```js
//#region List the automations
find ${automation} where target = "odsl.simple_portfolio_recalc"
//#endregion
```

---

## Reading the data with the REST API

| What | Request |
|-|-|
| Portfolios | `GET /api/group/v1?_filter={"service":"data","type":"Portfolio","category":"Simple Portfolio"}` |
| Trades of an instrument | `GET /api/event/v1/private?_filter={"event":"SIMPLE_PORTFOLIO:TRADES","INSTRUMENT":"ICE.IFEU.B:SETTLE:M01"}&_sort={"eventtime":-1}` |
| Open trades | `GET /api/event/v1/private?_filter={"event":"SIMPLE_PORTFOLIO:TRADES","OPEN_VOLUME":{"$ne":0}}` |
| A portfolio's P&L | `GET /api/data/v1/private/SIMPLE_PORTFOLIO:Portfolio1?_range=between(2026-01-01,2026-10-16)` |

Query parameter values must be URL encoded.
