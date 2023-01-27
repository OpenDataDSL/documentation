---
slug: /odsl/function/correlation
---

PearsonsCorrelation computes correlations defined by the formula:

```cor(X, Y) = sum[(xi - E(X))(yi - E(Y))] / [(n - 1)s(X)s(Y)]```

where ```E(X)``` and ```E(Y)``` are means of ```X``` and ```Y``` and ```s(X)```, ```s(Y)``` are standard deviations.

#### Syntax
```js
correlation(list)
```

The list parameter is a list of variables which can be one of:
* Timeseries
* Reference to a Timeseries
* String id of a Timeseries

#### Example

```js
Con = TimeSeries("2021-10-01", "BUSINESS", [8.12,1.19,2.82,4.1,-6.31,6.87,1.16,-0.63,1.25,0.93])
Man = TimeSeries("2021-10-01", "BUSINESS", [8.98,4.23,0.71,2.47,-8.29,7.34,-0.39,-2.18,3.86,-0.84])
Tech = TimeSeries("2021-10-01", "BUSINESS", [8.97,5.32,3.31,6,-7.75,7.51,3.38,-2.33,1.01,3.06])
Health = TimeSeries("2021-10-01", "BUSINESS", [5.25,3.23,0.48,-3.13,-3.37,6.84,-2.19,-0.61,-0.94,4.73])

lts = [Con, Man, Tech, Health]

print correlation(lts)
```

#### Output

```
	    Con	        Man	        Tech	    Health
Con	    1	        0.926711	0.940898	0.627738
Man	    0.926711	1	        0.903867	0.660247
Tech	0.940898	0.903867	1	        0.624856
Health	0.627738	0.660247	0.624856	1


```