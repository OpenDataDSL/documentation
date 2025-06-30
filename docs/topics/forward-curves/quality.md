---
slug: /topics/curves/quality
title: Curve Quality
description: How to quality assure your curves
sidebar_position: 3
tags:
- curve_management
- curve
- topics
- quality
---
Curve Quality
=============

## Configuring quality groups

## Quality check process
Each quality assurance check is evaluated in the order they are configured.

The quality check function should return one of the following values:
* ```valid``` - There are no issues with this curve (this is the default)
* ```warning``` - There are some minor issues with this curve
* ```failed``` - There are serious issues with this curve

Once all the checks are complete, the worst status is saved to the curve

### Notes

* Any additions to the #LOG variable are saved to a quality section in the curve build information
* If the quality check fails to run, the status is set as ```warning``` and the error message is placed into the #LOG

## Quality checks

### Variables
The following variables are set into the context:

* ```#CURVE``` - the built curve that we are checking (read only)
* ```#INFO``` - The curve management info for this curve (read only)
* ```#BUILD``` - The curve management build information for this ondate (read only)
* ```#LOG``` - An object where the script can output info about the check - this will be saved in the build info

