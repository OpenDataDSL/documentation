### Overview

![](/img/data/bnm.gif)

The Central Bank of Malaysia (BNM; Malay: Bank Negara Malaysia) is the Malaysian central bank. 
Established on 26 January 1959 as Central Bank of Malaya (Bank Negara Tanah Melayu), its main purpose is to issue currency, 
act as banker and adviser to the Government of Malaysia and regulate the country's financial institutions, credit system 
and monetary policy. Its headquarters is located in Kuala Lumpur, the federal capital of Malaysia.

Rates from the Interbank Foreign Exchange Market in Kuala Lumpur as at 0900, 1200 and 1700.

All the rates are based on the Malaysian Ringgit (MYR) - click [here](/docs/data/fx) for more information on the Foreign Exchange markets.

### File Collection

The file is retrieved from the Bank Negara Malaysia website:  [http://www.bnm.gov.my](http://www.bnm.gov.my)

### Schedule

Schedule the process as below:

|Process|Schedule in GMT|
|-|-|
|BNM_FX_0900|03:00AM,B|
|BNM_FX_1200|05:00AM,B|
|BNM_FX_1700|10:00AM,B|

### Sample File

Below is an example CSV file:

```csv
,USD,GBP,EUR,JPY100,CHF,AUD,CAD,SGD,HKD100
1 Sep 2021,4.1520,5.7117,4.9054,3.7619,4.5256,3.0507,3.2973,3.0839,53.3717
2 Sep 2021,4.1600,5.7354,4.9279,3.7816,4.5435,3.0736,3.3025,3.0951,53.5028
3 Sep 2021,4.1475,5.7379,4.9254,3.7713,4.5370,3.0828,3.3070,3.0902,53.3681
6 Sep 2021,4.1470,5.7403,4.9202,3.7738,4.5288,3.0829,3.3060,3.0903,53.3459
7 Sep 2021,4.1555,5.7425,4.9355,3.7803,4.5455,3.0819,3.3096,3.0932,53.4631
8 Sep 2021,4.1573,5.7218,4.9147,3.7738,4.5192,3.0610,3.2781,3.0887,53.4633
9 Sep 2021,4.1480,5.7288,4.9081,3.7745,4.5131,3.0604,3.2672,3.0871,53.3357
10 Sep 2021,4.1325,5.7351,4.8962,3.7604,4.5147,3.0616,3.2800,3.0874,53.1457
13 Sep 2021,4.1500,5.7336,4.8929,3.7686,4.5040,3.0548,3.2752,3.0904,53.3522
 
,THB100,PHP100,TWD100,KRW100,IDR100,SAR100,SDR,CNY,BND
1 Sep 2021,12.8295,8.2932,14.9676,0.3583,0.0291,110.7023,5.9135,0.6423,3.0839
2 Sep 2021,12.8158,8.3455,15.0235,0.3591,0.0291,110.9185,5.9207,0.6439,3.0951
3 Sep 2021,12.7029,8.3216,14.9946,0.3585,0.0291,110.5853,5.9029,0.6424,3.0902
6 Sep 2021,12.7848,8.3090,15.0423,0.3586,0.0292,110.5749,5.9022,0.6425,3.0903
7 Sep 2021,12.7352,8.2928,15.0447,0.3579,0.0292,110.7986,5.9143,0.6431,3.0932
8 Sep 2021,12.6861,8.2880,14.9941,0.3563,0.0292,110.8423,5.9282,0.6436,3.0887
9 Sep 2021,12.6850,8.3110,14.9839,0.3549,0.0291,110.5956,5.9040,0.6425,3.0871
10 Sep 2021,12.6686,8.2949,14.9755,0.3545,0.0291,110.1824,5.8876,0.6420,3.0874
13 Sep 2021,12.6178,8.3066,14.9749,0.3533,0.0291,110.6460,5.9164,0.6430,3.0904
 
,VND100,KHR100,NZD,MMK100,INR100,AED100,PKR100,NPR100,EGP
1 Sep 2021,0.0182,0.1015,2.9317,0.2529,5.6768,113.0365,2.4844,3.5480,0.2641
2 Sep 2021,0.0183,0.1016,2.9486,0.2533,5.6950,113.2543,2.4872,3.5589,0.2650
3 Sep 2021,0.0182,0.1013,2.9565,0.2526,5.6749,112.9140,2.4797,3.5468,0.2641
6 Sep 2021,0.0182,0.1013,2.9610,0.2526,5.6764,112.9004,2.4818,3.5478,0.2637
7 Sep 2021,0.0183,0.1015,2.9600,0.2531,5.6613,113.1318,2.4739,3.5383,0.2644
8 Sep 2021,0.0183,0.1016,2.9473,0.2532,5.6529,113.1794,2.4779,3.5330,0.2642
9 Sep 2021,0.0182,0.1014,2.9501,0.2526,5.6409,112.9276,2.4691,3.5257,0.2640
10 Sep 2021,0.0182,0.1010,2.9560,0.2408,5.6280,112.5056,2.4569,3.5137,0.2631
13 Sep 2021,0.0182,0.1013,2.9523,0.2418,5.6344,112.9821,2.4666,3.5214,0.2637
```

### Type

The BNM FX Rates are stored under the type #ForeignExchange

### Data ID and Name

Example data id and name

|Data Id|Name|
|-|-|
|BNM\_FX.EURMYR\_0900|Bank Negara Malaysia Exchange Rates Euro Per  Malaysian Ringgit 0900|
|BNM\_FX.EURMYR\_1200|Bank Negara Malaysia Exchange Rates Euro Per  Malaysian Ringgit 1200|
|BNM\_FX.EURMYR\_1700|Bank Negara Malaysia Exchange Rates Euro Per  Malaysian Ringgit 1700|

### Attributes

|Name|Value|
|-|-|
|Source|BNM|
|Source Name|Bank Negara Malaysia|
|Name|Bank Negara Malaysia Exchange Rates Euro Per  Malaysian Ringgit 0900|
|Description|Bank Negara Malaysia Exchange Rates Euro Per  Malaysian Ringgit 0900|
|Dataset|BNM_FX|
|Dataset Name|Bank Negara Malaysia Foreign Exchange Rates|
|Market|Financial|
|Commodity|Exchange Rates|
|Product|FX Spot|
|Location|Malaysia|
|Region|Asia|
|Quote Calendar|HMY|

### Validation

Data is validated for missing data points.

### Licensing

Data is freely available from the BNM website and can be used by clients without permissions

