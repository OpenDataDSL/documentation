---
title: Documentation Home
sidebar_position: 1
hide_title: true
hide_table_of_contents: true
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

> **OpenDataDSL is a Data Management System for MongoDB - the database for modern apps!**

The OpenDataDSL components and API's let you quickly and seamlessly build your own world-scale data management platform in the cloud using [MongoDB Atlas](https://www.mongodb.com/atlas/database)


## Quick start for MongoDB Users
If you are an existing MongoDB User, click [here](/docs/tutorials/qs/mongodb) to get started.

### Tutorials

<Tutorials />

<br/>

### Discover OpenDataDSL

#### Follow these Quick Discovery Guides to familiarise yourself with OpenDataDSL

<DiscoveryPages />


