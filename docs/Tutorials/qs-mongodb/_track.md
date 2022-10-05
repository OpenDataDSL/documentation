import { Badge, Card, Container, Button, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCertificate, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'
import styles from '/src/components/StartBuilding.module.css';

<Container className={styles.datablock}>
    <Card className="bg-info text-white" style={{width:"9rem"}}>
        <Card.Header ><b> Core</b></Card.Header>
            <Card.Body>
              <Card.Text>Core functionality.</Card.Text>
              <br />
              <FontAwesomeIcon icon={faCertificate} />
            </Card.Body>
    </Card>    
    <Card style={{width:"16rem"}}>
        <Card.Header className="bg-info text-white"><FontAwesomeIcon icon={faChevronCircleRight} /><b> Connecting</b></Card.Header>
            <Card.Body>
              <Card.Text>A tutorial helping you to connect to your MongoDB clusters.</Card.Text>
              <Button href="/docs/tutorials/qs/mongodb/connecting">Get Started</Button>
            </Card.Body>
    </Card>    
    <Card style={{width:"16rem"}}>
        <Card.Header className="bg-info text-white"><FontAwesomeIcon icon={faChevronCircleRight} /><b> Modelling Data</b></Card.Header>
            <Card.Body>
              <Card.Text>An overview on how to use ODSL types to model the data in your MongoDB collections.</Card.Text>
              <Button href="/docs/tutorials/qs/mongodb/modelling">Get Started</Button>
            </Card.Body>
    </Card>    
    <Card style={{width:"16rem"}}>
        <Card.Header className="bg-info text-white"><FontAwesomeIcon icon={faChevronCircleRight} /><b> Loading Data</b></Card.Header>
            <Card.Body>
              <Card.Text>A tour of the various methods you can use to load data into MongoDB.</Card.Text>
              <Button href="/docs/tutorials/qs/mongodb/loading">Get Started</Button>
            </Card.Body>
    </Card>    
    <Card className="bg-success text-white" style={{width:"9rem"}}>
        <Card.Header ><b> Intermediate</b></Card.Header>
            <Card.Body>
              <Card.Text>Searching, aggregating and Timeseries.</Card.Text>
              <br />
              <FontAwesomeIcon icon={faCertificate} />
              <FontAwesomeIcon icon={faCertificate} />
            </Card.Body>
    </Card>    
    <Card style={{width:"16rem"}}>
        <Card.Header className="bg-success text-white"><FontAwesomeIcon icon={faChevronCircleRight} /><b> Searching</b></Card.Header>
            <Card.Body>
              <Card.Text>A comprehensive tutorial on finding and filtering data including geo-spatial queries.</Card.Text>
              <Button href="/docs/tutorials/qs/mongodb/searching">Get Started</Button>
            </Card.Body>
    </Card>
    <Card style={{width:"16rem"}}>
        <Card.Header className="bg-success text-white"><FontAwesomeIcon icon={faChevronCircleRight} /><b> Aggregating</b></Card.Header>
            <Card.Body>
              <Card.Text>A tutorial on using the MongoDB aggregation pipeline in ODSL.</Card.Text>
              <Button href="/docs/tutorials/qs/developer/aggregation">Get Started</Button>
            </Card.Body>
    </Card>
    <Card style={{width:"16rem"}}>
        <Card.Header className="bg-success text-white"><FontAwesomeIcon icon={faChevronCircleRight} /><b> Timeseries</b></Card.Header>
            <Card.Body>
              <Card.Text>An in-depth guide to working with TimeSeries, Curve and Event data.</Card.Text>
              <Button href="/docs/tutorials/qs/developer/data">Get Started</Button>
            </Card.Body>
    </Card>
    <Card className="bg-danger text-white" style={{width:"9rem"}}>
        <Card.Header ><b> Advanced</b></Card.Header>
            <Card.Body>
              <Card.Text>Loading data, analytics and automation.</Card.Text>
              <br />
              <FontAwesomeIcon icon={faCertificate} />
              <FontAwesomeIcon icon={faCertificate} />
              <FontAwesomeIcon icon={faCertificate} />
            </Card.Body>
    </Card>    
    <Card style={{width:"16rem"}}>
        <Card.Header className="bg-danger text-white"><FontAwesomeIcon icon={faChevronCircleRight} /><b> Analysis</b></Card.Header>
            <Card.Body>
              <Card.Text>Utilise aggregation pipelines and statistical functions to analyse your data.</Card.Text>
              <Button href="/docs/tutorials/qs/developer/analysis">Get Started</Button>
            </Card.Body>
    </Card>
    <Card style={{width:"16rem"}}>
        <Card.Header className="bg-danger text-white"><FontAwesomeIcon icon={faChevronCircleRight} /><b> ETL</b></Card.Header>
            <Card.Body>
              <Card.Text>A tutorial on extracting data from remote services, transforming and loading it.</Card.Text>
              <Button href="/docs/tutorials/qs/developer/etl">Get Started</Button>
            </Card.Body>
    </Card>
    <Card style={{width:"16rem"}}>
        <Card.Header className="bg-danger text-white"><FontAwesomeIcon icon={faChevronCircleRight} /><b> Automation</b></Card.Header>
            <Card.Body>
              <Card.Text>A tutorial taking you through automation using workflows and processes.</Card.Text>
              <Button href="/docs/tutorials/qs/developer/automation">Get Started</Button>
            </Card.Body>
    </Card>
</Container>