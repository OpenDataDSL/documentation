Used to set a session option

#### Syntax
```js
set (precision INT|
    rounding ROUNDING_METHOD|
    missing (ignore|number)?|
    crs (earth|planar)|
    observed (default|beginning|end|averaged|summed|high|low|delta)|
    distribution (none|constant|linear|cubic)|
    autoscale (on|off)|
    credentials for source as user password|
    auto_follow_references (true|false)
    )
```
#### Description

The set command is used to set an option within the current script session. The following options are supported:

*   decimal precision    
*   rounding method    
*   missing value treatment    
*   coordinate reference system
*   timeseries scaling methods
*   credentials for interacting with external systems
*   options for following referenced data
    

##### Setting decimal precision

The decimal precision determines the number of decimal places to use with real numbers, e.g.
```js
set precision 2
```
Sets the decimal places to 2 for all numbers

##### Setting the rounding method

The rounding method determines how numbers are rounded when shortening to meet the decimal precision value, you can select from one of the following methods:

*   ceiling    
*   down    
*   up    
*   floor    
*   half_down    
*   half_up    

##### Setting missing value treatment

Missing values can affect the way calculations are performed and therefore you can set the way that you want missing values to be treated. You can instruct ODSL to ignore missing values using the statement:
```js
set missing ignore
```
Or you can tell ODSL to use a specific value to replace missing values, e.g. if you are summing up a list of values, you can set missing as 0 so that it would not take them into account.

##### Setting the coordinate reference system (CRS)

You can set the CRS to either:

*   earth    
*   planar
    

This affects the way [geospatial data](/docs/odsl/dm/geospatial) is handled

##### Timeseries scaling methods

There are 3 set commands which allow you to define how timeseries are scaled:

* autoscale on|off 
> By default, all timeseries are autoscaled once they reach a certain threshold in terms of number of observations.
> You can turn this off using the following command:

```js
set autoscale off
```

See [this page](/docs/odsl/calendar/scaling#auto-scaling) for more information on autoscaling.

* observed (default|beginning|end|averaged|summed|high|low|delta)
> This defines how numbers are aggregated when a timeseries is scaled from high frequency e.g. hourly to a lower frequency e.g. daily
> 
> See [this page](/docs/odsl/calendar/scaling#observed-setting) for more information on the observed setting.

* distribution (none|constant|linear|cubic)
> This defines how numbers are distributed when a timeseries is scaled from low frequency e.g. daily to a higher frequency e.g. hourly
> 
> See [this page](/docs/odsl/calendar/scaling#distribution) for more information on the distribution setting.

##### Credentials

If you need to define personal credentials to an external system that the OpenDataDSL platform interacts with you use the set credentials command.
This securely stores the credentials in an Azure Vault and only uses them when needed to interact with the external system.

##### Automatically follow references

This command enables or disables automatically retrieving the underlying data from a referenced entity.

For example, if we take the master data record ```#ABN_FX.EURAED```, it has a SPOT reference to the SPOT timeseries data.
In the following example (the default), the information output is the actual timeseries data.

```js
set auto_follow_references true

o = ${object:"#ABN_FX.EURAED"}
print o.SPOT
```

In this example, the information output is the information about the reference link

```js
set auto_follow_references false

o = ${object:"#ABN_FX.EURAED"}
print o.SPOT
```
