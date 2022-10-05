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
              <Button href="/docs/tutorials/qs/mongodb/aggregation">Get Started</Button>
            </Card.Body>
    </Card>
    <Card style={{width:"16rem"}}>
        <Card.Header className="bg-success text-white"><FontAwesomeIcon icon={faChevronCircleRight} /><b> Data Quality</b></Card.Header>
            <Card.Body>
              <Card.Text>A tutorial showing you how to ensure the data in your collections is of high quality</Card.Text>
              <Button href="/docs/tutorials/qs/developer/data">Get Started</Button>
            </Card.Body>
    </Card>
</Container>