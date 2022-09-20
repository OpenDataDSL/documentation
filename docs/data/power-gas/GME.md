---
slug: /company/GME
tags:
  - ipex
  - gme
  - power
  - gas
  - italy
---

GME
============================================================
Gestore dei Mercati Energetici S.p.A

## Overview

![](/img/data/ipex_gme.gif)

Gestore dei Mercati Energetici S.p.A (GME) was set up by Gestore dei Servizi Energetici S.p.A. (GSE), a company wholly owned by the Italian Ministry of Economy and Finance.GME operates power, gas, fuel and environmental markets. As part of the liberalisation process of the electricity sector, GME was initially vested with the organisation and economic management of the wholesale power market under the principles of neutrality, transparency, objectivity and competition.

Power markets

On the power market platform managed by GME (also known as Italian Power Exchange, IPEX), producers and purchasers sell and buy wholesale electricity. Regarding power, GME operates a forward physical market (MTE), a day-ahead hourly auction market (MGP), a daily products market (MPEG) – the venue for trading daily products with delivery obligation – and an intraday auction market (MI) structered in seven sessions. It also operates, on behalf of Terna, the Italian TSO, a platform for ancillary services (MSD), which collects the bids and communicates the results as well as a platform for the registration of OTC transactions (PCE).

website: https://www.mercatoelettrico.org/En/Default.aspx

## Datasets
import IpexElFut from './_IPEX(GME)_EL_FUT.md';
import IpexElIdm from './_IPEX(GME)_EL_IDM.md';
import IpexElDam from './_IPEX (GME)_EL_DAM.md';
import IpexElDm from './_IPEX(GME)_EL_DM.md';
import GmeNgDam from './_GME_NG_DAM.md';

### IPEX_EL_FUT
<details>
<summary>IPEX (GME) Power Forward Physical Market Data, MTE</summary>
<IpexElFut />
</details>

### IPEX_EL_IDM
<details>
<summary>IPEX (GME) Power Intra Day Market Price, MI</summary>
<IpexElIdm />
</details>

### IPEX_EL_DAM
<details>
<summary>IPEX (GME) Power Day-Ahead Market Data, MGP</summary>
<IpexElDam />
</details>

### IPEX_EL_DM
<details>
<summary>IPEX (GME) Power Daily Market Price, MPEG</summary>
<IpexElDm />
</details>

### GME_NG_DAM
<details>
<summary>Gestore Mercati Energetici Natural Gas Day Ahead Market Price, MGPGAS</summary>
<GmeNgDam />
</details>