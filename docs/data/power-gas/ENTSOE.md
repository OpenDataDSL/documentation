---
slug: /company/ENTSOE
tags:
  - entsoe
  - power
  - fundamentals
  - europe
---
ENTSOE
=========
The European Network of Transmission System Operators for Electricity

![](/img/data/entsoe.svg)


ENTSO-E, the European Network of Transmission System Operators for Electricity ([https://www.entsoe.eu/](https://www.entsoe.eu/)), represents 42 electricity transmission system operators (TSOs) from 35 countries across Europe. ENTSO-E was established and given legal mandates by the EU’s Third Legislative Package for the Internal Energy Market in 2009, which aims at further liberalizing the gas and electricity markets in the EU.

## The ENTSO-E Transparency Platform

In accordance with Regulation 543/2013, the ENTSO-E Transparency Platform was launched on 5 January 2015.

Central collection and publication of electricity generation, transportation and consumption data and information for the pan-European market.

ENTSO-E Transparency Platform is available in following link: [https://transparency.entsoe.eu/](https://transparency.entsoe.eu/)

## Information Published

The information published by ENTSO-E is collected from data providers such as TSOs, power exchanges or other qualified third parties. Information on the generation, load, transmission and balancing data which is specified in the Transparency Regulation is described in further detail in the  [‘Detailed Data Descriptions,’](https://www.entsoe.eu/fileadmin/user_upload/_library/resources/Transparency/02_MoP%20Ref02%20-%20DDD_V2R5.pdf) as referenced in the Manual of Procedures.

Example: Physical cross-border flows in Germany

## Datasets
import TlActFc from './_ENTSOE_TL_ACTFC.md';

import GnGenfc from './_ENTSOE_GN_GENFC.md';
import GnGenunit from './_ENTSOE_GN_GENUNIT.md';
import GnProdType from './_ENTSOE_GN_PRODTYPE.md';
import GnFcws from './_ENTSOE_GN_FCWS.md';

import EntsoeBlImbpr from './_ENTSOE_BL_IMBPR.md';
import EntsoeBlImbvol from './_ENTSOE_BL_IMBVOL.md';
import EntsoeBlCrsbrd from './_ENTSOE_BL_CRSBRD.md';
import EntsoeBlEnergyPr from './_ENTSOE_BL_ENERGY_PR.md';
import EntsoeBlContractReservePr from './_ENTSOE_BL_CONTRACT_RESERVES_PR.md';

import EntsoeTrCapfx from './_ENTSOE_TR_CAPFC.md';
import EntsoeTrCrsbrd from './_ENTSOE_TR_CRSBRD_FLOW.md';

import OtCons from './_ENTSOE_OT_CONS.md';
import OtTrans from './_ENTSOE_OT_TRANS.md';
import OtOffShr from './_ENTSOE_OT_OFFSHR.md';
import OtGen from './_ENTSOE_OT_GEN.md';
import OtProd from './_ENTSOE_OT_PROD.md';

## Load
### ENTSOE_EL_TL_ACTCF
<details>
<summary>Total Load Actual and Forecast - Actual and Day Ahead</summary>
<TlActFc/>
</details>

## Generation
### ENTSOE_EL_GN_GENFC
<details>
<summary>Generation Forecast - Day ahead</summary>
<GnGenfc />
</details>

### ENTSOE_EL_GN_GENUNIT
<details>
<summary>Actual Generation per Generation Unit</summary>
<GnGenunit />
</details>

### ENTSOE_EL_GN_CONS_PRODTYPE
<details>
<summary>Actual Consumption per Production Type</summary>
<GnProdType />
</details>

### ENTSOE_EL_GN_FCWS
<details>
<summary>Generation Forecasts for Wind and Solar - Day ahead</summary>
<GnFcws />
</details>

## Transmission
### ENTSOE_EL_TR_CAPFC
<details>
<summary>Transmission - Transfer Capacities Forecast Day Ahead</summary>
<EntsoeTrCapfx />
</details>

### ENTSOE_EL_TR_CRSBRD_FLOW
<details>
<summary>Transmission - Cross-Border Physical Flow</summary>
<EntsoeTrCrsbrd />
</details>

## Balancing
### ENTSOE_EL_BL_IMBPR
<details>
<summary>Balancing - Imbalance Prices</summary>
<EntsoeBlImbpr />
</details>

### ENTSOE_EL_BL_IMVOL
<details>
<summary>Balancing - Total Imbalance Volumes</summary>
<EntsoeBlImbvol />
</details>

### ENTSOE_EL_BL_CRSBRD
<details>
<summary>Balancing - Cross-Border Balancing</summary>
<EntsoeBlCrsbrd />
</details>

### ENTSOE_EL_BL_ENERGY_PR
<details>
<summary>Balancing - Prices of Activated Balancing Energy</summary>
<EntsoeBlEnergyPr/>
</details>

### ENTSOE_BL_CONTRACT_RESERVES_PR
<details>
<summary>Balancing - Volumes and Prices of Contracted Reserves</summary>
<EntsoeBlContractReservePr/>
</details>

## Outages

### ENTSOE_EL_OT_CONS
<details>
<summary>Outages - Aggregated Unavailability of Consumption Units</summary>
<OtCons />
</details>

### ENTSOE_EL_OT_TRANS
<details>
<summary>Outages - Unavailability in Transmission Grid</summary>
<OtTrans />
</details>

### ENTSOE_EL_OT_OFFSHR
<details>
<summary>Outages - Unavailability of Offshore Grid</summary>
<OtOffShr />
</details>

### ENTSOE_EL_OT_GEN
<details>
<summary>Outages - Unavailability of Generation Units</summary>
<OtGen />
</details>

### ENTSOE_EL_OT_PROD
<details>
<summary>Outages - Aggregated Unavailability of Production Units</summary>
<OtProd />
</details>