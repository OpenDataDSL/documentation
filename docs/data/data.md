---
sidebar_position: 1
slug: /data/catalog
hide_title: true
---
import { DataCatalog2 } from '/src/components/DataCatalog'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faCalendarDay, faGlobe, faMoneyBill } from '@fortawesome/free-solid-svg-icons'
import {DataCatalog} from '/src/components/Discovery.js';

<DataCatalog text="This page contains a list of the data and loaders we have available now" />

## Complete Data List
If you cannot find what you are looking for:
* Check the current Data [Roadmap](RoadMap)
* Log a data loader request in the [Portal](https://portal.opendatadsl.com)

<DataCatalog2 />

## Data List Notation

### <FontAwesomeIcon icon={faMoneyBill} />  Distribution

The data catalog contains 2 different flavours of data: FREE and BYOL

#### FREE
*Free-to-distribute*

This data is provided in the **public** space and is available free to everyone

#### BYOL 
*Bring-your-own-license/login*

We provide all the components required for you to load into your **private** space, all you need to provide are your credentials to collect the data

### <FontAwesomeIcon icon={faPlay} /> Start

For public data, this is the start year of the data history we have stored

### <FontAwesomeIcon icon={faCalendarDay} /> Frequency

This is the publish frequency of the data

