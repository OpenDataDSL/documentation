---
title: GEO Data
description: See master data with a location on a map, such as wind and solar farms, gas storage and weather stations, find what is near a point, open their data and give records a location
slug: /extensions/data-explorer/geo-data
sidebar_position: 5.5
tags: [extension, data explorer, geo, map, location, weather, assets]
---

# GEO Data

Many master data records are about a place: a wind farm, a solar park, a gas storage site, a weather station or a power plant. Give such a record a location and the **GEO Data** tab shows it on a map. From the map you can open its data, chart it, and find the records near a point.

Priya uses it to find the weather stations near the Northgate wind farms, and to check the temperature at Amsterdam Schiphol next to the Bergermeer gas storage.

![GEO Data: the Northgate wind farms, solar park, gas storage and weather stations on a map](/img/extensions/data-explorer/geo.png)

---

## Locations

A record's location is its `geoLocation` property, a GeoJSON geometry:

| Geometry | Use it for | Example |
|-|-|-|
| `Point` | A site: a weather station, a wind farm's substation, a storage site | `{"type": "Point", "coordinates": [4.76, 52.31]}` |
| `MultiPoint` | Several sites of one asset, such as the turbines of a wind farm | `{"type": "MultiPoint", "coordinates": [[1.85, 53.88], [1.87, 53.9]]}` |
| `LineString` | A pipeline or a cable | `{"type": "LineString", "coordinates": [[4.7, 52.6], [8.5, 52.6]]}` |
| `Polygon`, `MultiPolygon` | An area: a storage field, a solar park, a bidding zone | `{"type": "Polygon", "coordinates": [[[8.45, 52.58], [8.52, 52.58], [8.52, 52.63], [8.45, 52.58]]]}` |

Coordinates are longitude first, then latitude, in degrees. A record saved with `longitude` and `latitude` properties gets a `Point` from the platform. You can also set a point here (see [Placing a record](#placing-a-record)).

---

## Finding records

| Control | What it does |
|-|-|
| **Private**, **Public** | Your own master data, or the public master data |
| **Master data type** | Only records of one type; the list offers the types that have a location |
| **Search** | The platform search, as in Explore: words, `#tag`, `field=value` |
| **Group** | Only the records of a master data group |
| **Near a point** | Select **Choose a point**, then select a point on the map: only the records within the radius (in km) of it are found. **Clear the point** goes back to all of them |
| **Find**, **Clear** | Find with these settings, or clear them |

The map shows every record found, at most 2000 (narrow the search to see the rest), coloured by type with a legend below it. Points are dots; lines and areas are drawn as they are. The map is Google Maps, as on the portal's own maps: choose **Map** or **Satellite** (with terrain and labels in their menus) at the top left, and use the full screen button at the top right. It uses the Google Maps the portal page has loaded; if that is not available, the map shows land and country outlines instead and a note below it says why. **Show all** zooms to every record found.

**In the map view** lists the records you can see on the map, and follows it as you move and zoom. After a search near a point they are nearest first, with their distance.

![The records within 150 km of Amsterdam, nearest first](/img/extensions/data-explorer/geo-near.png)

:::tip
Near a point is a query on the platform, so it finds every record within the radius, not only those already on the map. Combine it with a type, for example the weather stations within 100 km of a wind farm.
:::

---

## A record

Select a record on the map or in the list. A note on the map gives its name, id, type and location, and the card below the map shows it with its data:

| Button | What it does |
|-|-|
| **Open** | Opens the record in Explore |
| **Move** | Your own records only: select its new place on the map (see below) |
| **Chart its data** | Puts its curves and timeseries on the [chart board](/docs/extensions/data-explorer/chart-board) |

Select one of its data items to open it in Explore. A record with a location has **Show on the map** on its Overview in Explore, which opens it here.

![A weather station and its temperature timeseries](/img/extensions/data-explorer/geo-record.png)

---

## Placing a record

To give one of your own records a location, select **Place a record**, type its id and select **Next**, then select its place on the map and **Save**. **Move** on a record does the same for one already on the map. The location is saved as a `Point` in the record's `geoLocation`; a line or an area is replaced by the point, and the screen says so before you save.

Lines and areas are not drawn here: save them in the record's `geoLocation` (for example with the Master Data Management extension or a script).

---

## Next

[Groups and automations](/docs/extensions/data-explorer/actions)
