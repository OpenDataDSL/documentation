---
slug: /odsl/variable/geospatial
title: GeoSpatial
tags:
- geospatial
---

# GeoSpatial

GeoSpatial variables hold GeoJSON geometry: points, lines and polygons, used as properties of master data and in geospatial queries. Coordinates are given as [longitude, latitude]. See [Geospatial data and queries](/docs/odsl/dm/geospatial).

## Construction

|**Function**|**Description**|
|-|-|
|GeometryCollection()|Creates a GeometryCollection geometry object|
|LineString()|Creates a LineString geometry object with the supplied list of coordinates|
|MultiLineString()|Creates an empty MultiLineString geometry object|
|MultiPoint()|Creates a MultiPoint geometry object with the supplied list of coordinates|
|MultiPolygon()|Creates a MultiPolygon geometry object with the supplied polygons|
|Point(longitude, latitude)|Creates a single coordinate point|
|Polygon()|Creates a Polygon geometry object with a multiple rings containing the supplied geometries|
|Sphere()|Creates a centerSphere geometry object used in geospatial queries|

**Sphere** creates the $centerSphere (centre and radius in radians) and $nearSphere (centre with minimum and maximum distance in metres) shapes used in geospatial queries.

## Example

```js
site = Object()
site.id = "NGE.SITE.EEMSHAVEN"
site.location = Point([6.83, 53.44])
save site
```
