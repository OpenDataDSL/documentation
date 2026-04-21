---
slug: /training/technical/quality-checks
title: "Module 07: Quality Checks in ODSL"
sidebar_position: 8
tags: [training, quality-checks, odsl, dataset]
---

# Module 07: Quality Checks in ODSL

In this module you will write quality check scripts in ODSL, upload them to the platform, and attach them to the dataset you configured in Module 06.

## What is a Quality Check Script?

A quality check script is an ODSL script stored in the `script` service. It contains **functions** that the platform calls when evaluating dataset delivery. Each function has access to two global variables:

| Variable | Description |
|----------|-------------|
| `#EVENTS` | An array of all the events being checked for this delivery |
| `#LOG` | A log object for recording failure details |
| `#DSID` | The dataset ID being checked |
| `#ONDATE` | The delivery date being evaluated |
| `#DATASET` | The dataset information object |

Each function must return one of three strings:

| Return value | Meaning |
|---|---|
| `"valid"` | All checks passed |
| `"warning"` | A potential issue was found — data is flagged but not blocked |
| `"failed"` | A check failed — for critical checks this blocks downstream use |

The platform supports two categories of check script:

| Category | Description |
|----------|-------------|
| `dataset-quality` | Quality checks — return `"warning"` or `"valid"` |
| `dataset-critical` | Critical checks — return `"failed"` or `"valid"` |

---

## Step 1: Create the Script Files

Create two script files in your local project folder or VS Code ODSL extension workspace. Scripts uploaded to the server must **not** be wrapped in `//#region` blocks — add the test code at the bottom of each file inside a `//#region` for local debugging instead.

### File 1: `my_gas_hub_quality_checks.odsl`

```js
/**
 * Quality check functions for MY.GAS.HUB settlement price dataset
 * Script: my_gas_hub_quality_checks
 * @category dataset-quality
 */

// ============================================================
// Quality Check: Validate settlement price is within range
// ============================================================
function checkSettlementPrice()
    checkSettlementPrice = "valid"
    #LOG.failures = []
    print "Checking " + #EVENTS.size() + " events for settlement price range for dataset: " + #DSID + " for " + #ONDATE

    if #EVENTS.size() == 0
        log warn "No events to check"
        checkSettlementPrice = "warning"
        return
    end

    for evt in #EVENTS
        price = evt.price

        if price == null
            checkSettlementPrice = "warning"
            #LOG.failures.add("Missing price on event " + evt.id)
        elseif price < 0.5
            checkSettlementPrice = "warning"
            #LOG.failures.add("Price " + price + " below minimum threshold of 0.5 for event " + evt.id)
        elseif price > 5
            checkSettlementPrice = "warning"
            #LOG.failures.add("Price " + price + " exceeds maximum threshold of 5 for event " + evt.id)
        end
    next
end


// ============================================================
// Quality Check: Detect suspicious day-on-day price change
// ============================================================
function checkPriceMovement()
    checkPriceMovement = "valid"
    #LOG.failures = []
    print "Checking " + #EVENTS.size() + " events for price movement for dataset: " + #DSID + " for " + #ONDATE

    if #EVENTS.size() == 0
        log warn "No events to check"
        checkPriceMovement = "warning"
        return
    end

    for evt in #EVENTS
        price = evt.price
        prevPrice = evt.prevPrice

        if price == null or prevPrice == null
            // Cannot check movement without both values — skip
            checkPriceMovement = "warning"
            #LOG.failures.add("Insufficient data for movement check on event " + evt.id)
        elseif prevPrice != 0
            change = abs((price - prevPrice) / prevPrice) * 100
            if change > 20
                checkPriceMovement = "warning"
                #LOG.failures.add("Price moved " + formatNumber(change, "0.00") + "% vs previous day for event " + evt.id)
            end
        end
    next
end


//#region Test checkSettlementPrice
use training
#EVENTS = ${event:"MY.GAS.HUB:SETTLEMENTS"}
#DSID = "TRAINING.MYGASHUB.SETTLEMENTS"
#ONDATE = "2025-03-03"
#LOG = Object()

result = checkSettlementPrice()
print "Settlement price check: " + result
if #LOG.failures != null
    print #LOG.failures
end
//#endregion

//#region Test checkPriceMovement
use training
#EVENTS = ${event:"MY.GAS.HUB:SETTLEMENTS"}
#DSID = "TRAINING.MYGASHUB.SETTLEMENTS"
#ONDATE = "2025-03-03"
#LOG = Object()

result = checkPriceMovement()
print "Price movement check: " + result
if #LOG.failures != null
    print #LOG.failures
end
//#endregion
```

### File 2: `my_gas_hub_critical_checks.odsl`

Critical checks must be in a separate file with the `dataset-critical` category.

```js
/**
 * Critical check functions for MY.GAS.HUB settlement price dataset
 * Script: my_gas_hub_critical_checks
 * @category dataset-critical
 */

// ============================================================
// Critical Check: Confirm events are present for the date
// ============================================================
function criticalPriceCheck()
    criticalPriceCheck = "valid"
    #LOG.failures = []
    print "Checking " + #EVENTS.size() + " events for critical price check for dataset: " + #DSID + " for " + #ONDATE

    if #EVENTS.size() == 0
        criticalPriceCheck = "failed"
        #LOG.failures.add("No settlement events found for " + #ONDATE + " — downstream processes blocked")
        return
    end

    for evt in #EVENTS
        if evt.price == null
            criticalPriceCheck = "failed"
            #LOG.failures.add("Missing price on event " + evt.id + " — downstream processes blocked")
        end
    next
end


//#region Test criticalPriceCheck
use training
#EVENTS = ${event:"MY.GAS.HUB:SETTLEMENTS"}
#DSID = "TRAINING.MYGASHUB.SETTLEMENTS"
#ONDATE = "2025-03-03"
#LOG = Object()

result = criticalPriceCheck()
print "Critical price check: " + result
if #LOG.failures != null
    print #LOG.failures
end
//#endregion
```

---

## Step 2: Upload the Scripts to the Platform

Because we are working in the training environment, scripts must be uploaded using an ODSL script rather than the VS Code right-click upload, so that the training environment is correctly targeted.

Create a third file called `upload_scripts.odsl` and run it using **Debug Region**:

```js
//#region
use training

s1 = ${script:file/"/src/odsl-demo/Training/my_gas_hub_quality_checks.odsl"}
s1._id = "my_gas_hub_quality_checks"
save s1

s2 = ${script:file/"/src/odsl-demo/Training/my_gas_hub_critical_checks.odsl"}
s2._id = "my_gas_hub_critical_checks"
save s2

//#endregion
```

:::note File Paths
Update the file paths to match the location of your script files within your project. The `_id` values set here are what will be used to reference the scripts everywhere else.
:::

### Verify the Upload

```js
//#region
use training
// Confirm both scripts are available
qs = find ${script} where _id = "my_gas_hub_quality_checks"
print qs

cs = find ${script} where _id = "my_gas_hub_critical_checks"
print cs
//#endregion
```

---

## Step 3: Test the Functions Locally

The test regions at the bottom of each script file let you debug directly without needing to trigger a full dataset run. In VS Code, right-click anywhere inside a `//#region` block and select **Debug Region** to run just that section.

The test code sets up the global variables (`#EVENTS`, `#DSID`, `#ONDATE`, `#LOG`) to simulate what the platform would pass at runtime, then calls the function and prints the result.

:::tip Testing with Bad Data
To test a failing check, temporarily modify a settlement event to have an out-of-range or missing price, then re-run the test region. Confirm the function returns `"warning"` or `"failed"` with the expected failure message logged, then restore the correct value.
:::

---

## Step 4: Attach the Scripts to the Dataset

### Option A: Using the Portal

Once both scripts are uploaded, open the dataset in the portal and attach the checks via the dropdown selectors:

1. Go to **Data Management → Datasets → TRAINING.MYGASHUB.SETTLEMENTS**
2. Click **Edit**
3. In the **Quality Checks** section, add two checks:
   - Script: `my_gas_hub_quality_checks` / Function: `checkSettlementPrice`
   - Script: `my_gas_hub_quality_checks` / Function: `checkPriceMovement`
4. In the **Critical Checks** section, add:
   - Script: `my_gas_hub_critical_checks` / Function: `criticalPriceCheck`
5. Click **Save**

### Option B: Using ODSL Code

```js
//#region
use training
// Fetch the dataset configuration
ds = ${dataset:"TRAINING.MYGASHUB.SETTLEMENTS"}

// Add quality checks
qualityCheck1 = SimpleObject()
qualityCheck1.type = "function"
qualityCheck1.script = "my_gas_hub_quality_checks"
qualityCheck1.name = "Check settlement price"
qualityCheck1.expression = "checkSettlementPrice()"

qualityCheck2 = SimpleObject()
qualityCheck2.type = "function"
qualityCheck2.script = "my_gas_hub_quality_checks"
qualityCheck2.name = "Check price movement"
qualityCheck2.expression = "checkPriceMovement()"

// Add critical checks
criticalCheck1 = SimpleObject()
criticalCheck1.type = "function"
criticalCheck1.script = "my_gas_hub_critical_checks"
criticalCheck1.name = "Critical price check"
criticalCheck1.expression = "criticalPriceCheck()"

ds.checks = [qualityCheck1, qualityCheck2]
ds.criticalChecks = [criticalCheck1]

// Save the updated dataset
save ${dataset:ds}

print "Quality checks attached to dataset"
//#endregion
```

---

## Step 5: Trigger and Review Checks in the Portal

1. Go to **Data Management → Dataset Monitoring → TRAINING.MYGASHUB.SETTLEMENTS**
2. Click on a date cell for which you have settlement data
3. Click **Re-run Quality Checks**
4. The panel will refresh and show:
   - A green tick ✅ for each passing check
   - A yellow warning ⚠️ for failing quality checks
   - A red cross ❌ for failing critical checks

---

## Step 6: Query Dataset Status in a Script

```js
//#region
use training
// Check if the dataset is complete for today
today = format(Date(), "yyyy-MM-dd")
isComplete = isDatasetComplete("TRAINING.MYGASHUB.SETTLEMENTS", today)

if isComplete
    print "Dataset is complete for " + today
else
    // Get detailed delivery info
    delivery = getDatasetDelivery("TRAINING.MYGASHUB.SETTLEMENTS", today)
    print "Dataset not complete. Details:"
    print delivery
end
//#endregion
```

---

## Summary

You have now completed the full training path:

| Module | What You Did |
|--------|-------------|
| 01 | Understood the core platform concepts |
| 02 | Created and updated events using ODSL |
| 03 | Created and updated events using Excel |
| 04 | Built EventTimeSeries from event data |
| 05 | Created SmartTimeSeries for currency and unit conversion |
| 06 | Configured dataset monitoring in the portal |
| 07 | Wrote quality check functions and attached them to the dataset |

## Next Steps

- Explore **automations** to trigger event loading and quality checks automatically on a schedule
- Investigate the public reference data available in OpenDataDSL (FX rates, commodity benchmarks, holiday calendars)
- Review the ODSL language reference for advanced scripting patterns

:::tip Getting Help
You can ask the **Fusion AI** assistant in the portal for help writing ODSL scripts, explaining platform concepts, or diagnosing quality check failures.
:::
