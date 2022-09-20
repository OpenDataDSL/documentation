import { Badge, Card, Container, Button, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faTable, faCubes } from '@fortawesome/free-solid-svg-icons'
import styles from '/src/components/StartBuilding.module.css';


<Container className={styles.datablock}>
    <Card style={{width:"18rem"}}>
        <Card.Header className="bg-primary text-white"><FontAwesomeIcon icon={faCode} /><b> OpenDataDSL Developer</b></Card.Header>
            <Card.Body>
              <Card.Text>Take this track to learn how to code in the OpenDataDSL programming language.</Card.Text>
              <Button href="/docs/tutorials/qs/developer">Get Started</Button>
            </Card.Body>
    </Card>    
    <Card style={{width:"18rem"}}>
        <Card.Header className="bg-success text-white"><FontAwesomeIcon icon={faTable} /><b> Data Modeller</b></Card.Header>
            <Card.Body>
              <Card.Text>Take this track to learn how to model and store data in OpenDataDSL.</Card.Text>
              <Button href="/docs/tutorials/qs/modeller">Get Started</Button>
            </Card.Body>
    </Card>
    <Card style={{width:"18rem"}}>
        <Card.Header className="bg-danger text-white"><FontAwesomeIcon icon={faCubes} /><b> API Developer</b></Card.Header>
            <Card.Body>
              <Card.Text>Take this track to learn the OpenDataDSL API's and build your own applications.</Card.Text>
              <Button href="/docs/tutorials/qs/api">Get Started</Button>
            </Card.Body>
    </Card>
</Container>