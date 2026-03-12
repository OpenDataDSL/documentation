---
slug: /odsl/function/functions-loader
title: Loader Helper Functions
sidebar_position: 18
---

This document provides a reference for all built-in loader, validation and monitoring functions available in OpenDataDSL.

### currentEnv()

**Category:** Loader

**Description:** 

**Parameters:**

**Returns:** 



---

### firstElementOf()

**Category:** Loader

**Description:** 

**Parameters:**

**Returns:** 



---

### formatDateLocale()

**Category:** Loader

**Description:** 

**Parameters:**

**Returns:** 



---

### formatDates()

**Category:** Loader

**Description:** 

**Parameters:**

**Returns:** 



---

### formatDatesWithLocale()

**Category:** Loader

**Description:** 

**Parameters:**

**Returns:** 



---

### formatHarvestDates()

**Category:** Loader

**Description:** 

**Parameters:**

**Returns:** 



---

### formatInteger()

**Category:** Loader

**Description:** 

**Parameters:**

**Returns:** 



---

### formatListValues()

**Category:** Loader

**Description:** 

**Parameters:**

**Returns:** 



---

### formatNumericValues()

**Category:** Loader

**Description:** 

**Parameters:**

**Returns:** 



---

### formatValue()

**Category:** Loader

**Description:** 

**Parameters:**

**Returns:** 



---

### formatValues()

**Category:** Loader

**Description:** 

**Parameters:**

**Returns:** 



---

### getDataset(dsid)

**Category:** Dataset Monitoring

**Description:** Gets the dataset information for the supplied dsid

**Parameters:**
* `dsid` (String) - The full dataset id

**Returns:** Dataset



---

### getDatasetDelivery(dsid, date)

**Category:** Dataset Monitoring

**Description:** Gets the dataset delivery information for the supplied date

**Parameters:**
* `dsid` (String) - The full dataset id
* `date` (String) - The date in the format yyyy-MM-dd

**Returns:** DatasetDelivery



---

### initialiseList()

**Category:** Loader

**Description:** 

**Parameters:**

**Returns:** 



---

### isDatasetComplete(dsid, date)

**Category:** Dataset Monitoring

**Description:** Checks to see if the supplied dataset is 100% complete for the supplied date

**Parameters:**
* `dsid` (String) - The full dataset id to check
* `date` (String) - The date in the format yyyy-MM-dd

**Returns:** Boolean



---

### lastElementOf()

**Category:** Loader

**Description:** 

**Parameters:**

**Returns:** 



---

### matches()

**Category:** Loader

**Description:** 

**Parameters:**

**Returns:** 



---

### missing(series)

**Category:** Data Quality Validation

**Description:** Checks for unexpected missing values in a TimeSeries

**Parameters:**
* `series` (TimeSeries) - The input TimeSeries to validate

**Returns:** TimeSeries



---

### random()

**Category:** Data Generation

**Description:** Creates a random number between 0 and 1

**Parameters:**

**Returns:** Scalar



---

### randomInteger(var)

**Category:** Data Generation

**Description:** Creates a random integer between 0 and the supplied number - 1

**Parameters:**
* `var` (Any Number) - The max limit of the integer number - 1

**Returns:** Scalar



---

### removeDuplicates()

**Category:** Loader

**Description:** 

**Parameters:**

**Returns:** 



---

### removeEmpty()

**Category:** Loader

**Description:** 

**Parameters:**

**Returns:** 



---

### replaceEmptyValues()

**Category:** Loader

**Description:** 

**Parameters:**

**Returns:** 



---

### replaceValues()

**Category:** Loader

**Description:** 

**Parameters:**

**Returns:** 



---

### reverseList()

**Category:** Loader

**Description:** 

**Parameters:**

**Returns:** 



---

### toPropertySet()

**Category:** Loader

**Description:** 

**Parameters:**

**Returns:** 



---

### toUTCDate()

**Category:** Loader

**Description:** 

**Parameters:**

**Returns:** 



---


