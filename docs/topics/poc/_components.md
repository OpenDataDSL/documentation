import { Badge, Card, Container, Button, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlug, faUpload, faDownload, faUser, faGlobe, faLock, faWrench, faBrain, faCode, faTable, faCubes } from '@fortawesome/free-solid-svg-icons'
import { faCertificate, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'
import styles from '/src/components/StartBuilding.module.css';

<Container className={styles.datablock}>
    <Card style={{width:"28rem"}}>
        <Card.Header><a href="/docs/discovery"><b>Master Data or Object</b></a></Card.Header>
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
        <Card.Header><a href="/docs/discovery"><b>Timeseries</b></a></Card.Header>
            <Card.Body>
                <Card.Text>
A timeseries is attached to master data and represents a value or metric which is recorded or observed at a point-in-time. 
Timeseries usually have a calendar which defines the interval size of the timeseries.
                </Card.Text>
                <Card.Subtitle>Examples</Card.Subtitle>
                <ul>
                  <li>The daily FX rates for an FX currency pair</li>
                  <li>The temperature reading at a certain location</li>
                  <li>The GDP of a country</li>
                  <li>Price ticks from an exchange</li>
                </ul>
            </Card.Body>
    </Card>    
    <Card style={{width:"28rem"}}>
        <Card.Header><a href="/docs/discovery"><b>Curve</b></a></Card.Header>
            <Card.Body>
                <Card.Text>
A curve is a structure that represents values at a point-in-time that reference a future time period.
Those values can either be:
<ul>
  <li>The actual value today for a future delivery period</li>
  <li>A forecast value made today for a future period</li>
</ul>
                </Card.Text>
                <Card.Subtitle>Examples</Card.Subtitle>
                <ul>
                  <li>Futures on a commodity exchange - forward curve</li>
                  <li>Weather forecast</li>
                </ul>
            </Card.Body>
    </Card>    
    <Card style={{width:"28rem"}}>
        <Card.Header><a href="/docs/discovery"><b>Matrix</b></a></Card.Header>
            <Card.Body>
                <Card.Text>
A matrix is a table of values that relate 2 items together.
The value in a matrix is usually a calculation or statistic.
                </Card.Text>
                <Card.Subtitle>Examples</Card.Subtitle>
                <ul>
                  <li>A correlation matrix</li>
                  <li>A covariance matrix</li>
                  <li>A set of statistics (min/max/mean/stdev etc.) about various products</li>
                </ul>
            </Card.Body>
    </Card>    
    <Card style={{width:"28rem"}}>
        <Card.Header><a href="/docs/discovery"><b>Event</b></a></Card.Header>
            <Card.Body>
                <Card.Text>
Events are individual observations for a single time-point.
An event has a reference time and a start and end time as well as values and properties.
                </Card.Text>
                <br/>
                <Card.Subtitle>Examples</Card.Subtitle>
                <ul>
                  <li>FX currency pairs for a single day</li>
                  <li>All prices for a single futures contract delivery for 1 day</li>
                  <li>An individual trade (price and volume)</li>
                  <li>A recorded metric such as temperature</li>
                </ul>
            </Card.Body>
    </Card>    
    <Card style={{width:"28rem"}}>
        <Card.Header><a href="/docs/discovery"><b>Report</b></a></Card.Header>
            <Card.Body>
                <Card.Text>
A report can be any data in any structure that is generated and stored for a specific date.
A report can also have a template which defines the way the report is displayed using charts, tables or representation as a specific file format (xml,csv,json etc.)
                </Card.Text>
                <br/>
                <Card.Subtitle>Examples</Card.Subtitle>
                <ul>
                  <li>A price/volume report</li>
                  <li>An aggregated curve</li>
                  <li>A newsletter or documentation</li>
                  <li>An file to be exported to another system in csv</li>
                </ul>
            </Card.Body>
    </Card>    
    <Card style={{width:"28rem"}}>
        <Card.Header><a href="/docs/discovery"><b>Subscription</b></a></Card.Header>
            <Card.Body>
                <Card.Text>
You use subscriptions to trigger an action to be performed after something has been updated.
Subscriptions are the mechanism that makes OpenDataDSL event-driven.
                </Card.Text>
                <br/>
                <Card.Subtitle>Examples</Card.Subtitle>
                <ul>
                  <li>Build a smart curve</li>
                  <li>Build a report</li>
                  <li>Send an email</li>
                  <li>Send the data to a message queue</li>
                </ul>
            </Card.Body>
    </Card>    
    <Card style={{width:"28rem"}}>
        <Card.Header><a href="/docs/discovery"><b>Queue</b></a></Card.Header>
            <Card.Body>
                <Card.Text>
A queue is a conduit for messages which are sent from the platform.
A queue can be listened to by an internal application which can retrieve the data and perform tasks with the data.
                </Card.Text>
                <br/>
                <Card.Subtitle>Examples</Card.Subtitle>
                <ul>
                  <li>Push input data in order to build a curve using your own language</li>
                  <li>Push data to be fed into an ETRM system</li>
                </ul>
            </Card.Body>
    </Card>    
</Container>















