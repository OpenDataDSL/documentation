---
slug: /odsl/function/simpleRegression
---
SimpleRegression provides ordinary least squares regression with one independent variable estimating the linear model: `y = intercept + slope * x` or `y = slope * x`

Standard errors for `intercept` and `slope` are available as well as ANOVA, r-square and Pearson's r statistics.

Observations (x,y pairs) are added as time=x and value=y

The function result can also be used to predict other values given a Date input as shown in the example

#### Syntax
var = simpleRegression(TimeSeries)
#### Result
The output from this function is an [Object](https://opendatadsl.atlassian.net/wiki/spaces/DOCUMENTAT/pages/2719912/Object) with properties representing some statistical calculations on the input time-series as shown in the table below:

|**Property**|**Description**|
|-|-|
|intercept|The **intercept** (often labeled the constant) is the expected mean value of Y when all X=0. Start with a regression equation with one predictor, X. If X sometimes equals 0, the **intercept** is simply the expected mean value of Y at that value. If X never equals 0, then the **intercept** has no intrinsic meaning.|
|slope|**Slope** is calculated by finding the ratio of the "vertical change" to the "horizontal change" between (any) two distinct points on a line. Sometimes the ratio is expressed as a quotient ("rise over run"), giving the same number for every two distinct points on the same line.|
|slopeStdErr|The **standard error** of the regression **slope**, s (also called the **standard error** of estimate) represents the average distance that your observed values deviate from the regression line. The smaller the “s” value, the closer your values are to the regression line.|
|interceptStdErr|The **standard error** of the the **intercept** allows you to test whether or not the estimated **intercept** is statistically significant from a specified(hypothesized) value ... normally 0.0 . If you test against 0.0 and fail to reject then you can then re-**estimate** your model without the **intercept** term being present.|
|meanSquareErr|The **mean squared error** (MSE) or **mean squared deviation** (MSD) of an estimator (of a procedure for estimating an unobserved quantity) measures the average of the **squares** of the **errors**—that is, the average **squared** difference between the estimated values and the actual value|
|N|N is the number of elements in a population|
|R|The Pearson correlation coefficient, also referred to as Pearson's r, the Pearson product-moment correlation coefficient, or the bivariate correlation, is a statistic that measures linear correlation between two variables X and Y. It has a value between +1 and −1.|
|regressionSumSquares|**Regression sum** of **squares** (also known as the **sum** of **squares** due to **regression** or explained **sum** of **squares**) The **regression sum** of **squares** describes how well a **regression** model represents the modeled **data**. A higher **regression sum** of **squares** indicates that the model does not fit the **data** well.|
|RSquare|**R**-**squared** (**R2**) is a **statistical** measure that represents the proportion of the variance for a dependent variable that's explained by an independent variable or variables in a regression model. ... So, if the **R2** of a model is 0.50, then approximately half of the observed variation can be explained by the model's inputs|
|significance|**Statistical significance** is a determination that a relationship between two or more variables is caused by something other than chance. Statistical hypothesis testing is used to determine whether the result of a data set is statistically **significant**.|
|slopeConfidenceInterval|With simple linear regression, to compute a **confidence interval** for the **slope**, the critical value is a t score with degrees of freedom equal to n - 2. ... df = n - 2 = 101 - 2 = 99. The critical value is the t **statistic** having 99 degrees of freedom and a cumulative probability equal to 0.995.|
|sumOfCrossProducts|The **sum of cross products** between all the elements of columns j and k is represented by Σ XrjXrk, summed over r. A matrix of **sums** of squares and **sums of cross products** is represented by X' X, as shown below. Thus, the diagonal elements of X' X are **sums** of squares, and the off-diagonal elements are **cross products**.|
|sumSquaredErrors|In **statistics**, the residual **sum** of **squares** (RSS), also known as the **sum** of **squared residuals** (SSR) or the **sum** of **squared** estimate of **errors** (SSE), is the **sum** of the **squares** of **residuals** (deviations predicted from actual empirical values of **data**).|
|totalSumSquares|The **Total** SS (TSS or SST) tells you how much variation there is in the dependent variable. **Total** SS = Σ(Yi – mean of Y)2. Note: Sigma (Σ) is a mathematical term for **summation** or “adding up.” It's telling you to add up all the possible results from the rest of the equation|
|XSumSquares|The **sum** of **squares** is a measure of deviation from the mean. In **statistics**, the mean is the average of a set of numbers and is the most commonly used measure of central tendency. The arithmetic mean is simply calculated by **summing** up the values in the **data** set and dividing by the number of values|

The result also has methods as detailed in the following table:

|**Method**|**Description**|
|-|-|
|predict(date)|Use the regression model to predict the y value for a new x (Date) value|

#### Example
```js
input = TimeSeries("DAILY")
input.add("2020-11-01", 12.5)
input.add("2020-11-02", 12.8)
input.add("2020-11-03", 12.9)
input.add("2020-11-04", 11.5)
input.add("2020-11-05", 11.9)

reg = simpleRegression(input)

print reg.slope
print reg.slopeStdErr
print reg.slopeConfidenceInterval
print reg.intercept
print reg.interceptStdErr
print reg.meanSquareErr
print reg.N
print reg.R
print reg.regressionSumSquares
print reg.RSquare
print reg.significance
print reg.sumOfCrossProducts
print reg.sumSquaredErrors
print reg.totalSumSquares
print reg.XSumSquares

// Predict the next value
print reg.predict(Date("2020-11-06"))
```