---
title: Writing your own checks
description: Write check functions in ODSL in a private script and use them in validation
slug: /extensions/validation/writing-checks
sidebar_position: 5
tags: [extension, validation, odsl, functions]
---

# Writing your own checks

When the library does not have the check you need, write it as an ODSL function in a private script, then add the script to the configurations that use it.

---

## 1. Create a script

In **Information > Validation**, open the **Functions** tab and select **New private script**. Give it an id, for example `validation\power_checks`. The script starts from a template with one example function, `checkAboveLimit`. Edit it and select **Save**.

Scripts are saved with category `validation`, which is how the extension finds them. You can also write them anywhere you write ODSL, for example in VS Code, as long as the first comment has `@category validation`.

## 2. Use it

In a configuration, add the script under **Scripts**. Its functions then appear in **Add check from a function**, and you can use them in any expression.

:::caution
If you delete a script that configurations use, their checks fail with **Error**. The Functions tab lists the configurations that use a script before deleting it.
:::

---

## A check function

```js
/**
 * Fails when the value is above a limit
 * @scope tenor,point
 * @param limit The highest allowed value
 */
function checkAboveLimit(limit)
	if v_missing(#VALUE)
		checkAboveLimit = "skip"
	else
		checkAboveLimit = "valid"
		if #VALUE > limit
			checkAboveLimit = v_fail("failed", v_label() + " value " + v_fmt(#VALUE) + " is above " + v_fmt(limit))
		end
	end
end
```

- **The result** is set by assigning to the function name: `"valid"`, `"warning"`, `"failed"`, `"severe"` or `"skip"`, or true / false. `"failed"` and false take the severity of the check.
- **Explain failures** with `v_fail(status, message)`. It adds the message to `#LOG.failures` (the first one also becomes `#LOG.message`) and gives back the status. You can set `#LOG.message` yourself, and anything else you put on `#LOG` is kept with the result, for example `#LOG.change = change`.
- **The comment** above the function describes it. `@scope` says where it is offered: `tenor` (run on each contract of a curve), `curve` (run once on the whole curve), `point` (each observation of a timeseries), or several separated by commas. For a tenor check, the messages you give are shown against the tenor in the curve's record. `@param` describes each parameter. Functions marked `@scope helper` are not offered as checks.

:::caution Two ODSL rules
- **Do not use `return`** inside a check function or a function it calls. When one function calls another, a `return` in the inner one also ends the outer one. Assign to the function name instead, as above.
- **Put brackets around arithmetic that mixes operators**, for example `(100 * change) / previous` rather than `change / previous * 100`.
:::

---

## Variables

| Variable | Set for | Value |
|-|-|-|
| `#VALUE` | tenor, point | The value being checked |
| `#PREVIOUS` | tenor, point | The previous value (the same tenor on the previous curve, or the previous observation), or null |
| `#HISTORY` | tenor, point | Earlier values, newest first: the previous observations (**Lookback**) or the tenor on the previous curves (**Previous values**) |
| `#TIME` | point | The time of the observation |
| `#PREVIOUS_TIME` | point | The time of the previous observation, or null |
| `#SERIES` | point | The whole timeseries |
| `#CURVE` | tenor, curve | The curve for the ondate |
| `#ONDATE` | tenor, curve | The ondate, for example `2026-10-12` |
| `#PREVIOUS_CURVE` | tenor, curve | The previous stored curve, or null |
| `#CONTRACT` | tenor | The contract being checked (`tenor`, `value`, `start`, `end`) |
| `#TENOR` | tenor | Its tenor, for example `M01` |
| `#HISTORY` | curve | The previous curves, newest first |
| `#TARGET` | all | The data id |
| `#KIND` | all | `curve` or `timeseries` |
| `#POINT` | all | The data point: the ondate or the observation time |
| `#ITEM` | all | The curve or the timeseries |
| `#CONFIG`, `#CHECK` | all | The configuration and the check being run |
| `#LOG` | all | Where the check explains itself |

## Helpers from the library

| Helper | Gives back |
|-|-|
| `v_fail(status, message)` | Records a failure and gives back the status |
| `v_missing(x)` | true when x is null or missing |
| `v_abs(x)` | The size of a number, without its sign |
| `v_fmt(x)` | A number as text, without trailing zeros |
| `v_label()` | The tenor for a curve, the time for a timeseries |
| `v_history(n)` | The non-missing values of `#HISTORY`, at most n (0 for all) |

---

## A curve check

```js
/**
 * Warns when the front month is below the second month by more than a percentage
 * @scope curve
 * @param pct The allowed backwardation in percent
 */
function checkFrontMonth(pct)
	checkFrontMonth = "skip"
	if #CURVE.contracts.contains("M01") and #CURVE.contracts.contains("M02")
		m1 = #CURVE.contracts.get("M01").value
		m2 = #CURVE.contracts.get("M02").value
		if v_missing(m1) == false and v_missing(m2) == false and m2 > 0
			checkFrontMonth = "valid"
			d = (100 * (m2 - m1)) / m2
			#LOG.difference = d
			if d > pct
				checkFrontMonth = v_fail("warning", "M01 is " + v_fmt(d) + "% below M02")
			end
		end
	end
end
```

---

## Testing a function

Add the check to a configuration and use **Test**: it runs the checks as they are in the editor and saves nothing, so you can change the script, save it and test again. A check that throws an ODSL error, or gives back something other than a result, shows as **Error** with the message.
