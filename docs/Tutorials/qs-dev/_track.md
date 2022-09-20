import { Badge, Card, Container, Button, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCertificate, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'
import styles from '/src/components/StartBuilding.module.css';

<Container className={styles.datablock}>
    <Card className="bg-info text-white" style={{width:"9rem"}}>
        <Card.Header ><b> Basics</b></Card.Header>
            <Card.Body>
              <Card.Text>Basic core language syntax.</Card.Text>
              <br />
              <FontAwesomeIcon icon={faCertificate} />
            </Card.Body>
    </Card>    
    <Card style={{width:"16rem"}}>
        <Card.Header className="bg-info text-white"><FontAwesomeIcon icon={faChevronCircleRight} /><b> ODSL Code Basics</b></Card.Header>
            <Card.Body>
              <Card.Text>An introduction to variables, looping, conditional statements and testing.</Card.Text>
              <Button href="/docs/tutorials/qs/developer/basics">Get Started</Button>
            </Card.Body>
    </Card>    
    <Card style={{width:"16rem"}}>
        <Card.Header className="bg-info text-white"><FontAwesomeIcon icon={faChevronCircleRight} /><b> Variable Types</b></Card.Header>
            <Card.Body>
              <Card.Text>An overview variable types including geometry, dates, durations and objects.</Card.Text>
              <Button href="/docs/tutorials/qs/developer/variables">Get Started</Button>
            </Card.Body>
    </Card>    
    <Card style={{width:"16rem"}}>
        <Card.Header className="bg-info text-white"><FontAwesomeIcon icon={faChevronCircleRight} /><b> Functions</b></Card.Header>
            <Card.Body>
              <Card.Text>A tour of the built-in functions and tutorial on how to create your own.</Card.Text>
              <Button href="/docs/tutorials/qs/developer/functions">Get Started</Button>
            </Card.Body>
    </Card>    
    <Card className="bg-success text-white" style={{width:"9rem"}}>
        <Card.Header ><b> Intermediate</b></Card.Header>
            <Card.Body>
              <Card.Text>Interacting with remote services.</Card.Text>
              <br />
              <FontAwesomeIcon icon={faCertificate} />
              <FontAwesomeIcon icon={faCertificate} />
            </Card.Body>
    </Card>    
    <Card style={{width:"16rem"}}>
        <Card.Header className="bg-success text-white"><FontAwesomeIcon icon={faChevronCircleRight} /><b> Services</b></Card.Header>
            <Card.Body>
              <Card.Text>Connect to the remote services, creating some data and storing it in the cloud.</Card.Text>
              <Button href="/docs/tutorials/qs/developer/services">Get Started</Button>
            </Card.Body>
    </Card>
    <Card style={{width:"16rem"}}>
        <Card.Header className="bg-success text-white"><FontAwesomeIcon icon={faChevronCircleRight} /><b> Searching</b></Card.Header>
            <Card.Body>
              <Card.Text>A comprehensive tutorial on finding and filtering data including geo-spatial queries.</Card.Text>
              <Button href="/docs/tutorials/qs/developer/searching">Get Started</Button>
            </Card.Body>
    </Card>
    <Card style={{width:"16rem"}}>
        <Card.Header className="bg-success text-white"><FontAwesomeIcon icon={faChevronCircleRight} /><b> Data</b></Card.Header>
            <Card.Body>
              <Card.Text>An in-depth guide to working with TimeSeries and Curve data.</Card.Text>
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