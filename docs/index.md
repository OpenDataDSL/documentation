---
id: home
title: Documentation Home
sidebar_position: 1
hide_title: true
tags:
  - product
  - home
---
import { Badge, Card, Container, Button, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlug, faUpload, faDownload, faUser, faGlobe, faLock, faWrench, faBrain, faCode, faTable, faCubes } from '@fortawesome/free-solid-svg-icons'
import styles from '/src/components/DataCatalog.module.css';
import StartBuilding from '/src/components/StartBuilding.js';
import Tutorials from '/src/components/Tutorials.js';
import DiscoveryPages from '/docs/discovery/_discovery.md';
import {Introduction} from '/src/components/Discovery.js';

<Introduction text="Start your OpenDataDSL discovery here" />


## What is OpenDataDSL?
OpenDataDSL is THE Data Management Programming Language - the tool that makes managing data easy!

The OpenDataDSL components and API's let you quickly and seamlessly build your own world-scale data management platform in the cloud.
We load any data that can be freely distributed and make it available to you - you can model, collect, load, check and report 
on any data you own or subscribe to using the same tools and user experience.

### Tutorials

<Tutorials />

### Discover OpenDataDSL

#### Follow these Quick Discovery Guides to familiarise yourself with OpenDataDSL

<DiscoveryPages />
