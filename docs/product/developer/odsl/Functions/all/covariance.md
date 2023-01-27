---
slug: /odsl/function/covariance
---

Unbiased covariances are given by the formula
```cov(X, Y) = sum [(xi - E(X))(yi - E(Y))] / (n - 1)``` 

where ```E(X)``` is the mean of ```X``` and ```E(Y)``` is the mean of the ```Y``` values. 

Non-bias-corrected estimates use ```n``` in place of ```n - 1```. 
Whether or not covariances are bias-corrected is determined by the optional parameter, **biasCorrected** which defaults to true.

#### Syntax
```js
covariance(list)
covariance(list, biasCorrected)
```

The list parameter is a list of variables which can be one of:
* Timeseries
* Reference to a Timeseries
* String id of a Timeseries

The biasCorrected parameter is a boolean.

#### Example

```js
Con = TimeSeries("2021-10-01", "BUSINESS", [8.12,1.19,2.82,4.1,-6.31,6.87,1.16,-0.63,1.25,0.93])
Man = TimeSeries("2021-10-01", "BUSINESS", [8.98,4.23,0.71,2.47,-8.29,7.34,-0.39,-2.18,3.86,-0.84])
Tech = TimeSeries("2021-10-01", "BUSINESS", [8.97,5.32,3.31,6,-7.75,7.51,3.38,-2.33,1.01,3.06])
Health = TimeSeries("2021-10-01", "BUSINESS", [5.25,3.23,0.48,-3.13,-3.37,6.84,-2.19,-0.61,-0.94,4.73])

lts = [Con, Man, Tech, Health]

mc = covariance(lts)
print mc
mc = covariance(lts, false)
print mc
```

#### Output
```
        Con	        Man	        Tech	    Health
Con	    16.141200	18.532833	18.617622	9.361344
Man	    18.532833	24.777610	22.158876	12.199110
Tech	18.617622	22.158876	24.256440	11.423153
Health	9.361344	12.199110	11.423153	13.777943

	    Con	        Man	        Tech	    Health
Con	    14.527080	16.679550	16.755860	8.425210
Man	    16.679550	22.299849	19.942988	10.979199
Tech	16.755860	19.942988	21.830796	10.280838
Health	8.425210	10.979199	10.280838	12.400149
```