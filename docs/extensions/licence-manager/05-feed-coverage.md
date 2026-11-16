---
title: Feed coverage
description: See which feeds of the datasets you follow are covered by a current licence, and which are not
slug: /extensions/licence-manager/feed-coverage
sidebar_position: 5
tags: [extension, data licences, datasets, feeds, compliance]
---

# Feed coverage

The **Feed coverage** tab groups the common and public datasets you follow by feed (the first two parts of the dataset id, such as `ICE.NDEX`) and shows the licence that covers each one. A licence covers a feed when one of its feeds is the feed itself or its provider: `ICE` covers `ICE.NDEX` and `ICE.IFEU`.

![The feeds Northgate follows that need attention](/img/extensions/licence-manager/coverage.png)

---

## Coverage

| Coverage | Meaning | What to do |
|-|-|-|
| **Covered** | A current licence covers the feed | Nothing |
| **Covered, notice by** or **ends** a date | Covered, but the licence is in its reminder period | Deal with the renewal |
| **Licence expired or ended** | Only licences that have expired, ended or not started cover it | Renew the licence, or stop following the datasets |
| **No licence** | No licence covers the feed | Select **New licence** to record one with the feed already filled in |
| **No licence needed** | You marked the feed as not needing a licence | Nothing |

**Show** switches between the feeds that need attention and all feeds. Hover over the number of datasets to see their ids. **CSV** downloads the list.

![Every feed Northgate follows](/img/extensions/licence-manager/coverage-all.png)

---

## Feeds that need no licence

Some data needs no licence of yours: free data such as the ECB reference rates, or data OpenDataDSL licenses for you. Select **No licence needed**, give the reason and select **Save**; the feed then shows **No licence needed** and no longer counts in **Feeds without a licence**. **Needs a licence** undoes it.

---

## Licensed feeds with no followed datasets

Under the table, feeds named on a current licence that none of your followed datasets belong to are listed (Northgate's CME DataMine licence covers historical files it loads itself). The licence may cover data you get another way, or the feed may be mistyped.

:::note
Coverage is worked out from the datasets you follow and the feeds on your licences. It is a check for you; it does not grant or remove access to any data.
:::

---

## Next

[Costs](/docs/extensions/licence-manager/costs): record what each licence costs and choose who can see it.
