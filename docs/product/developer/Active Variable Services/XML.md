---
slug: /odsl/service/xml
tags:
  - service
  - xml
---
XML
===================

A service to read XML format files as an [object](/docs/odsl/variable/object) or [list](/docs/odsl/variable/list) variable

This service is used to convert XML files into variables to be used within an OpenDataDSL script.

## Syntax

The standard active variable syntax is followed with the **id** part being the URL of the XML file, e.g.
```js
xmldata = ${xml:"https://domain/example.xml", options}
```

## Options

The following options affect the way that the XML data is processed into the variable:

|**Option**|**Description**|**Example**|
|-|-|-|
|selector|This is an XML selector which allows you to filter the xml data. It is a CSS-like element selector, that finds elements matching a query. If a selector is used, the output variable is a [list](/docs/odsl/variable/list)|```selector=[type=”test”]```|
|ignoreContentType|Set this to true if the document content type is causing exceptions|ignoreContentType=true|
|xslt|Transforms the input XML data using the supplied XSLT transformer|"xslt="+xslt|

## Example

This example uses the following XML format file of FX Rates from the European Central Bank obtainable from

[https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml](https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<gesmes:Envelope xmlns:gesmes="http://www.gesmes.org/xml/2002-08-01" xmlns="http://www.ecb.int/vocabulary/2002-08-01/eurofxref">
	<gesmes:subject>Reference rates</gesmes:subject>
	<gesmes:Sender>
		<gesmes:name>European Central Bank</gesmes:name>
	</gesmes:Sender>
	<Cube>
		<Cube time='2021-06-03'>
			<Cube currency='USD' rate='1.2187'/>
			<Cube currency='JPY' rate='133.81'/>
			<Cube currency='BGN' rate='1.9558'/>
			<Cube currency='CZK' rate='25.448'/>
			<Cube currency='DKK' rate='7.4365'/>
			<Cube currency='GBP' rate='0.85955'/>
			<Cube currency='HUF' rate='345.82'/>
			<Cube currency='PLN' rate='4.4520'/>
			<Cube currency='RON' rate='4.9220'/>
			<Cube currency='SEK' rate='10.1145'/>
			<Cube currency='CHF' rate='1.0961'/>
			<Cube currency='ISK' rate='146.30'/>
			<Cube currency='NOK' rate='10.1501'/>
			<Cube currency='HRK' rate='7.5013'/>
			<Cube currency='RUB' rate='89.2163'/>
			<Cube currency='TRY' rate='10.5650'/>
			<Cube currency='AUD' rate='1.5792'/>
			<Cube currency='BRL' rate='6.1894'/>
			<Cube currency='CAD' rate='1.4710'/>
			<Cube currency='CNY' rate='7.7910'/>
			<Cube currency='HKD' rate='9.4551'/>
			<Cube currency='IDR' rate='17420.91'/>
			<Cube currency='ILS' rate='3.9598'/>
			<Cube currency='INR' rate='88.8755'/>
			<Cube currency='KRW' rate='1357.75'/>
			<Cube currency='MXN' rate='24.3300'/>
			<Cube currency='MYR' rate='5.0241'/>
			<Cube currency='NZD' rate='1.6915'/>
			<Cube currency='PHP' rate='58.208'/>
			<Cube currency='SGD' rate='1.6141'/>
			<Cube currency='THB' rate='37.938'/>
			<Cube currency='ZAR' rate='16.5218'/>
		</Cube>
	</Cube>
</gesmes:Envelope>
```

### Retrieving the XML

Running the following code:
```js
xmldata=${xml:"https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml"}
print xmldata
```
Produces an object looking something like this:
```json
{
  "_id": "xmldata",
  "Cube": {
    "_id": "Cube",
    "Cube": {
      "_id": "Cube",
      "Cube": \[
        {
          "_id": "Cube",
          "content": "",
          "currency": "USD",
          "rate": 1.2187
        },
        {
          "_id": "Cube",
          "content": "",
          "currency": "JPY",
          "rate": 133.81
        }
        
        ...
        
      \],
      "content": "",
      "time": "2021-06-03"
    },
    "content": ""
  },
  "Sender": {
    "_id": "Sender",
    "content": "European Central Bank",
    "name": {
      "_id": "name",
      "content": "European Central Bank"
    }
  },
  "subject": {
    "_id": "subject",
    "content": "Reference rates"
  }
}
```

### Using a selector
If you use a selector to only select nodes that have a currency attribute:
```js
xmldata=${xml:"https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml", "selector=\[currency\]"}
print xmldata
```
You get a list of objects containing only the currencies and rates like this:
```json
[
{
  "content": "",
  "currency": "USD",
  "rate": 1.2187
}
{
  "content": "",
  "currency": "JPY",
  "rate": 133.81
}

...

]
```

### Using an XSLT

You can create an XSLT that transforms the XML, see the example below:

```js
xslt=`<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="xml" encoding="utf-8" indent="no"/>

<xsl:template match="/">
<xsl:variable name="time" select="//@time"/>
<currencies time="{$time}">
<xsl:for-each select="//@currency">
<currency code="{.}" rate="{../@rate}" />
</xsl:for-each>
</currencies>
</xsl:template>

</xsl:stylesheet>
`

xmldata=${xml:"https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml","xslt="+xslt}

print json(xmldata)
```