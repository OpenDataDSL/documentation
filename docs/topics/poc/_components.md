import { Badge, Card, Container, Button, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlug, faUpload, faDownload, faUser, faGlobe, faLock, faWrench, faBrain, faCode, faTable, faCubes } from '@fortawesome/free-solid-svg-icons'
import { faCertificate, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'
import styles from '/src/components/StartBuilding.module.css';

<Container className={styles.datablock}>
    <Card style={{width:"28rem"}}>
        <Card.Header><b>Master Data or Object</b></Card.Header>
            <Card.Body>
                <Card.Text>
Master Data or Objects in OpenDataDSL are documents that contain descriptive information and properties which represent a specific product, entity or resource.
                </Card.Text>
                <br/>
                <Card.Subtitle>Examples</Card.Subtitle>
                <ul>
                  <li>An FX currency pair from a specific data provider</li>
                  <li>A futures product on a commodity exchange</li>
                  <li>A physical power generation plant</li>
                  <li>A weather station</li>
                </ul>
            </Card.Body>
    </Card>    
    <Card style={{width:"28rem"}}>
        <Card.Header><b>Timeseries</b></Card.Header>
            <Card.Body>
                <Card.Text>
A timeseries is attached to master data and represents a value or metric recorded or observed at a point in time.
Timeseries have a calendar which defines the expected interval between observations.
                </Card.Text>
                <Card.Subtitle>Examples</Card.Subtitle>
                <ul>
                  <li>The daily FX rates for an FX currency pair</li>
                  <li>The temperature reading at a weather station</li>
                  <li>The GDP of a country</li>
                  <li>Price ticks from an exchange</li>
                </ul>
            </Card.Body>
    </Card>    
    <Card style={{width:"28rem"}}>
        <Card.Header><b>Curve</b></Card.Header>
            <Card.Body>
                <Card.Text>
A curve is a structure that represents values at a point in time that reference a future delivery period.
Those values can either be:
<ul>
  <li>The market price today for a future delivery period</li>
  <li>A forecast value made today for a future period</li>
</ul>
                </Card.Text>
                <Card.Subtitle>Examples</Card.Subtitle>
                <ul>
                  <li>Futures prices on a commodity exchange — forward curve</li>
                  <li>A weather forecast</li>
                </ul>
            </Card.Body>
    </Card>    
    <Card style={{width:"28rem"}}>
        <Card.Header><b>Matrix</b></Card.Header>
            <Card.Body>
                <Card.Text>
A matrix is a table of values that relate two dimensions together.
The values in a matrix are usually calculations or statistics derived from other data.
                </Card.Text>
                <Card.Subtitle>Examples</Card.Subtitle>
                <ul>
                  <li>A correlation matrix between asset prices</li>
                  <li>A covariance matrix</li>
                  <li>A statistical summary (min/max/mean/stdev) across multiple products</li>
                </ul>
            </Card.Body>
    </Card>    
    <Card style={{width:"28rem"}}>
        <Card.Header><b>Event</b></Card.Header>
            <Card.Body>
                <Card.Text>
An event is an individual observation for a single time point.
Each event has a reference time, a start and end time, and a set of values and properties.
                </Card.Text>
                <br/>
                <Card.Subtitle>Examples</Card.Subtitle>
                <ul>
                  <li>All FX rates for a single publication date</li>
                  <li>All delivery prices for a single futures contract on one day</li>
                  <li>An individual trade — price and volume</li>
                  <li>A discrete sensor reading such as temperature</li>
                </ul>
            </Card.Body>
    </Card>    
    <Card style={{width:"28rem"}}>
        <Card.Header><b>Report</b></Card.Header>
            <Card.Body>
                <Card.Text>
A report is any data in any structure that is generated and stored for a specific date.
Reports can have a template that defines how the data is displayed — as charts, tables, or exported file formats such as XML, CSV, or JSON.
                </Card.Text>
                <br/>
                <Card.Subtitle>Examples</Card.Subtitle>
                <ul>
                  <li>A daily price and volume summary</li>
                  <li>An aggregated forward curve</li>
                  <li>A newsletter or commentary document</li>
                  <li>A CSV export for a downstream system</li>
                </ul>
            </Card.Body>
    </Card>    
    <Card style={{width:"28rem"}}>
        <Card.Header><b>Automation</b></Card.Header>
            <Card.Body>
                <Card.Text>
An automation triggers a delivery action automatically whenever a watched data item changes.
You define a condition (which item and which action) and a target (where to send the data), and the platform handles the rest.
                </Card.Text>
                <br/>
                <Card.Subtitle>Examples</Card.Subtitle>
                <ul>
                  <li>Send an email when a Smart Curve is rebuilt</li>
                  <li>Push updated data to a downstream queue</li>
                  <li>POST a webhook when a timeseries is updated</li>
                  <li>Trigger a curve build when settlement data arrives</li>
                </ul>
            </Card.Body>
    </Card>    
    <Card style={{width:"28rem"}}>
        <Card.Header><b>Queue</b></Card.Header>
            <Card.Body>
                <Card.Text>
A queue is a conduit for messages sent from the platform to external systems.
An application listening on the queue can retrieve messages and act on the data they contain.
                </Card.Text>
                <br/>
                <Card.Subtitle>Examples</Card.Subtitle>
                <ul>
                  <li>Deliver curve input data to an external curve-building application</li>
                  <li>Feed market data into an ETRM system</li>
                  <li>Trigger a downstream processing job</li>
                </ul>
            </Card.Body>
    </Card>
    <Card style={{width:"28rem"}}>
        <Card.Header><b>Calendar</b></Card.Header>
            <Card.Body>
                <Card.Text>
A calendar defines the valid observation intervals for a timeseries or curve — which dates or times are expected to have values, and which are not.
Calendars can be built-in or custom, and can include holiday rules to exclude specific days.
                </Card.Text>
                <Card.Subtitle>Examples</Card.Subtitle>
                <ul>
                  <li>Daily — one value per calendar day</li>
                  <li>Business — one value per weekday, weekends excluded</li>
                  <li>Monthly — one value per calendar month</li>
                  <li>Exchange — follows the holiday schedule of a specific exchange</li>
                </ul>
            </Card.Body>
    </Card>
    <Card style={{width:"28rem"}}>
        <Card.Header><b>Type</b></Card.Header>
            <Card.Body>
                <Card.Text>
A type (or declared type) is a reusable schema that defines the properties, expressions, and methods shared by all objects created from it.
Types enforce structure and consistency across your master data.
                </Card.Text>
                <Card.Subtitle>Examples</Card.Subtitle>
                <ul>
                  <li>A Company type with name and registration number</li>
                  <li>A PowerPlant type with capacity, fuel type, and location</li>
                  <li>A CurrencyPair type with base and quote currency</li>
                  <li>A WeatherStation type with coordinates and operator</li>
                </ul>
            </Card.Body>
    </Card>
    <Card style={{width:"28rem"}}>
        <Card.Header><b>Transformer</b></Card.Header>
            <Card.Body>
                <Card.Text>
A transformer is a mapping definition that converts extracted source data into the structure of a declared type.
It is the T in ETL — separating the transformation logic from the extraction and loading steps.
                </Card.Text>
                <Card.Subtitle>Examples</Card.Subtitle>
                <ul>
                  <li>Map an XML response from a data vendor into a PowerPlant type</li>
                  <li>Convert a CSV row into a CurrencyPair object with timeseries</li>
                  <li>Restructure a nested JSON object into a flat list of rows</li>
                </ul>
            </Card.Body>
    </Card>
    <Card style={{width:"28rem"}}>
        <Card.Header><b>Action</b></Card.Header>
            <Card.Body>
                <Card.Text>
An action is a self-contained, reusable task written in ODSL that performs a single step within a workflow — such as fetching data from a URL, transforming it, or loading it into the platform.
A public library of actions is available, and you can create your own.
                </Card.Text>
                <Card.Subtitle>Examples</Card.Subtitle>
                <ul>
                  <li>Extract XML from an HTTP URL</li>
                  <li>Apply a transformer to map raw data into a declared type</li>
                  <li>Save a batch of objects to the platform</li>
                  <li>Send a notification on failure</li>
                </ul>
            </Card.Body>
    </Card>
    <Card style={{width:"28rem"}}>
        <Card.Header><b>Workflow</b></Card.Header>
            <Card.Body>
                <Card.Text>
A workflow chains actions together into a multi-step automated process, with routing logic to handle different outcomes at each step — including retries and error handling.
Workflows can themselves be used as actions inside other workflows.
                </Card.Text>
                <Card.Subtitle>Examples</Card.Subtitle>
                <ul>
                  <li>Extract, transform, and load data from an external source</li>
                  <li>Fetch data, validate quality, and trigger a curve build on success</li>
                  <li>Retry a failed load up to three times before alerting</li>
                </ul>
            </Card.Body>
    </Card>
    <Card style={{width:"28rem"}}>
        <Card.Header><b>Process</b></Card.Header>
            <Card.Body>
                <Card.Text>
A process is a scheduled or event-driven workflow or script that runs in the cloud.
Processes are the mechanism by which automation is triggered — either on a cron schedule or in response to a data event.
                </Card.Text>
                <Card.Subtitle>Examples</Card.Subtitle>
                <ul>
                  <li>Run an ETL workflow every weekday at 17:00</li>
                  <li>Trigger a curve build whenever settlement data arrives</li>
                  <li>Run a quality check script after each data load</li>
                </ul>
            </Card.Body>
    </Card>
    <Card style={{width:"28rem"}}>
        <Card.Header><b>Script</b></Card.Header>
            <Card.Body>
                <Card.Text>
A script is an ODSL code file saved to the platform. Scripts can be run directly as a process, used to define reusable functions, or referenced in Smart Curve expressions.
                </Card.Text>
                <Card.Subtitle>Examples</Card.Subtitle>
                <ul>
                  <li>A library of custom curve-building functions</li>
                  <li>A data quality checking routine</li>
                  <li>A one-off data migration or backfill script</li>
                  <li>Helper utilities shared across multiple workflows</li>
                </ul>
            </Card.Body>
    </Card>
    <Card style={{width:"28rem"}}>
        <Card.Header><b>Policy</b></Card.Header>
            <Card.Body>
                <Card.Text>
A policy defines who can perform which actions on which data.
Policies control read, write, and delete access across your private data, and can restrict or deny access to specific datasets or services.
                </Card.Text>
                <Card.Subtitle>Examples</Card.Subtitle>
                <ul>
                  <li>Grant full access to a named set of admin users</li>
                  <li>Allow all users to read private data but not modify it</li>
                  <li>Deny access to data from a specific licensed vendor</li>
                  <li>Allow specific users to manage queues and automations</li>
                </ul>
            </Card.Body>
    </Card>
    <Card style={{width:"28rem"}}>
        <Card.Header><b>Data Identity</b></Card.Header>
            <Card.Body>
                <Card.Text>
A data identity is a named external reference attached to a data item — timeseries, curve, Smart Curve, matrix, or event.
Each identity maps the item to the ID used by a specific downstream system, so that system can identify the data without a separate mapping table.
                </Card.Text>
                <Card.Subtitle>Examples</Card.Subtitle>
                <ul>
                  <li>A Smart Curve with a SAP commodity code and an ETRM reference</li>
                  <li>A timeseries with a Bloomberg ticker and an internal risk system ID</li>
                  <li>A forward curve with identities for three different downstream consumers</li>
                </ul>
            </Card.Body>
    </Card>
</Container>
