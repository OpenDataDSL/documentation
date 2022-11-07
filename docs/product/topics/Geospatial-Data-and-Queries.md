---
slug: /odsl/dm/geospatial
sidebar_position: 7
tags:
  - data_management
  - geospatial
---
Geospatial Data and Queries
===========================

This section explains how to create, use and query geospatial data stored within OpenDataDSL

## Introduction

In OpenDataDSL, you can store geospatial data as the following types of geometrical objects:

*   Point - a single coordinate    
*   LineString - an array of 2 or more points
*   MultiPoint - an array of points
*   MultiLineString - an array of LineStrings
*   Polygon - an array of linear rings where the first and last point must be the same
*   MultiPolygon - an array of polygons
*   GeometryCollection - an array of any other geometrical objects
    

You can add a property to an object which can be of any of the types described above.

## Creating Geometries

There are constructor functions that you can use to construct any of the available geometries as described in this section:

### Point

A point is constructed with a single coordinate in the format:

```
[longitude, latitude]
```

So, you can construct a point like so:

```js
var = Point([long, lat])

// Example
location = Point([51.5386, -0.4956])
```

### LineString

A LineString is constructed as empty and then add coordinates to it or using an array of coordinates as follows:

```js
// Use the empty constructor and add coordinates
road1 = LineString()
road1.add(-73.96943, 40.78519)
road1.add(Point([52.35672, 4.91120]))

// Add the coordinates in the constructor
road2 = LineString([[-73.96943, 40.78519],[-73.96943, 41.78519]])
```

### MultiPoint

A MultiPoint is the same as a LineString as shown below:

```js
// Use the empty constructor and add coordinates
road1 = MultiPoint()
road1.add(-73.96943, 40.78519)
road1.add(Point([52.35672, 4.91120]))

// Add the coordinates in the constructor
road2 = MultiPoint([[-73.96943, 40.78519],[-73.96943, 41.78519]])
```

### MultiLineString

A MultiLineString can be constructed as empty and then add LineString or MultiPoint objects to it or can be constructed with the coordinates passed in.

```js
// Use an empty constructor and add the coordinates
road1 = MultiPoint([[-73.96943, 40.78519],[-73.96943, 41.78519]])
road2 = MultiPoint([[-73.96943, 40.78519],[-73.96943, 41.78519]])
mls = MultiLineString()
mls.add(road1)
mls.add(road2)

// Add the coordinates in the constructor
mls = MultiLineString([LineString([[0,0],[1,1]]),LineString([[2,2],[3,3]])])
```

### Polygon

A polygon can be constructed in 3 ways:

*   An empty polygon    
*   A single ring polygon
*   A multi-ring polygon
    
```js
mp1 = MultiPoint([[ 50, -1 ], [52, -1], [52, 1], [50, 1], [ 50, -1 ]])
mp2 = MultiPoint([[ 50, -1 ], [52, -1], [52, 1], [50, 1], [ 50, -1 ]])

// Create an empty polygon and add rings to it
poly1 = Polygon()
poly1.add(MultiPoint([[ 50, -1 ], [52, -1], [52, 1], [50, 1], [ 50, -1 ]]))
poly1.add(mp2)

// Create a polygon with a single ring
poly2 = Polygon([[ 50, -1 ], [52, -1], [52, 1], [50, 1], [ 50, -1 ]])

// Create a mulit-ring polygon
poly3 = Polygon([mp1, mp2])
```

### MultiPolygon

A MultiPolygon can be constructed as empty or passing in a list of polygons, e.g.

```js
// Create some polygons
poly1 = Polygon()
poly1.add(MultiPoint([[ 50, -1 ], [52, -1], [52, 1], [50, 1], [ 50, -1 ]]))
poly2 = Polygon([[ 50, -1 ], [52, -1], [52, 1], [50, 1], [ 50, -1 ]])

// Construct an empty multi polygon and add a polygon
mp = MultiPolygon()
mp.add(poly1)

// Create a MultiPolygon using our 2 polygons
mp2 = MultiPolygon([poly1, poly2])
```

### GeometryCollection

A MultiPolygon can be constructed as empty or passing in a list of geometries, e.g.

```js
// Create some geometries
road2 = MultiPoint([[-73.96943, 40.78519],[-73.96943, 41.78519]])
location = Point([51.5386, -0.4956])

// Create an empty GeometryCollection and add our geometries
gc = GeometryCollection()
gc.add(road2)
gc.add(location)

// Construct a GeometryCollection using our geometries
coll = GeometryCollection([road1, polygon, mp])
```

## Adding Geometry to Objects

You can add any of the geometries to an object as a property which can then be used to make geospatial queries, Here is an example of creating an object with a geolocation and saving it:

```js
BritishMuseum = object as TestGeometry
    name = "British Museum"
    location = Point([51.51958, -0.12695])
end
save ${object:BritishMuseum}
```

## Using Geospatial Queries to find objects

You can use the find command to search for items that are within or intersect a polygon or a spherical radius of a point.

To check for items that are within a radius of a point, you use the **within** operator with a **sphere** object. The sphere object is constructed using a point and a radius in radians as follows:

```js
// Syntax
s = Sphere([longitude, latitude], radius)

// Creating a 20 mile radius around the British Museum
// 3963.2 is the radius of the earth in miles
bm20 = Sphere([51.51958, -0.12695], 20/3963.2)
```

### Examples

```js
// Find a list of items that are within a 20 mile radius of a point
items = find ${object:"TestGeometry"} where location within Sphere([ 51.72961, 0.47612 ], 20 / 3963.2)

// Find items that are within a defined polygon
items = find ${object:"TestGeometry"} where location within Polygon([[ 50, -1 ], [52, -1], [52, 1], [50, 1], [ 50, -1 ]])

// Pre-define a polygon, then find items that are within that polygon
london = Polygon([[51.5386, -0.4956],[51.6445, -0.0753],[51.5205, 0.1753],[51.3479, -0.1163],[51.5386, -0.4956]])
items = find ${object:"TestGeometry"} where location within london

// Find items that intersect with a polygon
items = find ${object:"TestGeometry"} where location intersects london
```
