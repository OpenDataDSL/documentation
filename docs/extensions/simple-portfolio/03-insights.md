---
title: Insights
description: The Trade Report and Open Trade Positions insights of the Simple Portfolio extension
slug: /extensions/simple-portfolio/insights
sidebar_position: 3
tags: [extension, simple portfolio, insights, trades, report]
---

# Insights

The extension adds two insights. Both have the same filters at the top:

| Filter | What it does |
|-|-|
| Portfolio | Only the trades on that portfolio's instruments, or all trades |
| Instrument | Only the trades on one instrument |
| Traded from, To | The trade date range (both optional) |

Totals and breakdowns are calculated on the server, so they cover every matching trade, not just one page. **CSV** downloads every matching trade from the Overview and list tabs, and the table as shown from the other tabs.

---

## Trade Report

![Trade Report, By Instrument tab](/img/extensions/simple-portfolio/trade-report.png)

Every trade in a date range (the last 30 days when it opens).

| Card | Shows |
|-|-|
| Trades, Instruments | How many trades, on how many instruments |
| Bought, Sold, Net volume | Volume bought, sold, and the difference |
| Traded value | Price x volume, summed regardless of side |

| Tab | Shows |
|-|-|
| Overview | The most traded instruments and the busiest days |
| Trades | The trades, newest first, paged |
| By Instrument | Trades, bought, sold, net, average price, traded value and first and last trade for each instrument, with a total |
| By Day | The same figures for each day |
| Largest Trades | The ten largest buys and the ten largest sales |

---

## Open Trade Positions

![Open Trade Positions, Ageing tab](/img/extensions/simple-portfolio/open-trade-positions.png)

The trades that are still open (open volume is not zero), over all dates unless you set a range.

| Card | Shows |
|-|-|
| Open trades, Instruments | How many open trades, on how many instruments |
| Long, Short, Net open | Open volume bought, open volume sold, and the difference |
| Open cost | Price x open volume, summed |

| Tab | Shows |
|-|-|
| Overview | The largest open positions and the oldest open trades |
| Open Positions | The open trades with their open volume, open cost and age, paged |
| By Instrument | Long, short and net open volume, average open price and open cost for each instrument |
| Ageing | Open trades grouped by age: up to a week, 8 to 30 days, 31 to 90 days, 91 days to a year, and over a year |

:::note
Open volume is kept by the extension's recalculation, so a trade added in the last minute may still show its full volume as open.
:::
