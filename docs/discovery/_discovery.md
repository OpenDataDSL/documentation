import { Badge, Card, Container, Button, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlug, faUpload, faDownload, faUser, faGlobe, faLock, faWrench, faBrain, faCode, faTable, faCubes } from '@fortawesome/free-solid-svg-icons'
import { faCertificate, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'
import styles from '/src/components/StartBuilding.module.css';

<Container className={styles.datablock}>
    <Card style={{width:"18rem"}}>
        <Card.Header><a href="/docs/discovery"><FontAwesomeIcon icon={faPlug} /><b> Getting Started</b></a></Card.Header>
            <Card.Body>
              <Card.Text>A brief introduction to the features and ecosystem of OpenDataDSL with an overview of what OpenDataDSL can do and how it works.</Card.Text>
              <ul>
                  <li><a href="/docs/discovery#what-is-opendatadsl">What is OpenDataDSL</a></li>
                  <li><a href="/docs/discovery#why-choose-opendatadsl">Why choose OpenDataDSL</a></li>
              </ul>
            </Card.Body>
    </Card>    
    <Card style={{width:"18rem"}}>
        <Card.Header><a href="/docs/discovery/uploading-data"><FontAwesomeIcon icon={faUpload} /><b> Uploading Data</b></a></Card.Header>
            <Card.Body>
              <Card.Text>An overview on how to prepare, send, and update your data, along with guidance on how to automate data loading and data environments.</Card.Text>
              <ul>
                  <li><a href="/docs/discovery/uploading-data#data-environments">Data Environments</a></li>
                  <li><a href="/docs/discovery/uploading-data#create-your-data-model">Create your data model</a></li>
                  <li><a href="/docs/discovery/uploading-data#data-loading">Automating data uploads</a></li>
              </ul>
            </Card.Body>
    </Card>
    <Card style={{width:"18rem"}}>
        <Card.Header><a href="/docs/discovery/subscribing-to-data"><FontAwesomeIcon icon={faDownload} /><b> Subscribing to Data</b></a></Card.Header>
            <Card.Body>
              <Card.Text>A guide on how to integrate both the public data and your proprietary data into other cloud systems or your local database infrastructure.</Card.Text>
              <ul>
                  <li><a href="/docs/discovery/subscribing-to-data#introduction-to-queues">Introduction to Queues</a></li>
                  <li><a href="/docs/discovery/subscribing-to-data#subscribing-to-data">Subscribing to Data</a></li>
                  <li><a href="/docs/discovery/subscribing-to-data#integration-examples">Some integration examples</a></li>
              </ul>
            </Card.Body>
    </Card>
    <Card style={{width:"18rem"}}>
        <Card.Header><a href="/docs/discovery/personalisation"><FontAwesomeIcon icon={faUser} /><b> Personalisation</b></a></Card.Header>
            <Card.Body>
              <Card.Text>Learn how you can personalize your users' experience with a custom domain, company logo and colour scheme.</Card.Text>
              <ul>
                  <li><a href="/docs/discovery/personalisation#what-is-personalisation">What is Personalisation</a></li>
                  <li><a href="/docs/discovery/personalisation#custom-domain">Custom Domain</a></li>
                  <li><a href="/docs/discovery/personalisation#logo-and-scheme">Logo and Scheme</a></li>
              </ul>
            </Card.Body>
    </Card>
    <Card style={{width:"18rem"}}>
        <Card.Header><a href="/docs/discovery/automation"><FontAwesomeIcon icon={faGlobe} /><b> Automation</b></a></Card.Header>
            <Card.Body>
              <Card.Text>Discover how you can build scripts and workflows to automate tasks and use processes to configure and trigger them.</Card.Text>
              <ul>
                  <li><a href="/docs/discovery/automation#scripts">Scripts</a></li>
                  <li><a href="/docs/discovery/automation#workflows">Workflows</a></li>
                  <li><a href="/docs/discovery/automation#processes">Processes</a></li>
              </ul>
            </Card.Body>
    </Card>
    <Card style={{width:"18rem"}}>
        <Card.Header><a href="/docs/discovery/performance-and-scaling"><FontAwesomeIcon icon={faUser} /><b> Performance and Scaling</b></a></Card.Header>
            <Card.Body>
              <Card.Text>Discover the infrastructure that powers OpenDataDSL and the options available for you to optimise performance.</Card.Text>
              <ul>
                  <li><a href="/docs/discovery/performance-and-scaling#technical-overview">Technical Overview</a></li>
                  <li><a href="/docs/discovery/performance-and-scaling#improving-data-performance">Improving Data Performance</a></li>
                  <li><a href="/docs/discovery/performance-and-scaling#process-optimisation">Process Optimisation</a></li>
              </ul>
            </Card.Body>
    </Card>
    <Card style={{width:"18rem"}}>
        <Card.Header><a href="/docs/discovery/security"><FontAwesomeIcon icon={faLock} /><b> Security</b></a></Card.Header>
            <Card.Body>
              <Card.Text>We take security seriously. Take some time to check our security basics and recommendations, including system users, roles and other best practices.</Card.Text>
              <ul>
                  <li><a href="/docs/discovery/security#security-basics">Security Basics</a></li>
                  <li><a href="/docs/discovery/security#security-best-practices">Security Best Practices</a></li>
                  <li><a href="/docs/discovery/security#application-and-data-roles">Application and Data Roles</a></li>
              </ul>
            </Card.Body>
    </Card>
    <Card style={{width:"18rem"}}>
        <Card.Header><a href="/docs/discovery/tools"><FontAwesomeIcon icon={faWrench} /><b> Tools</b></a></Card.Header>
            <Card.Body>
              <Card.Text>Find solutions to specific problems, discover practical examples of what OpenDataDSL can do, and find inspiration for your data management experience.</Card.Text>
              <ul>
                  <li><a href="/docs/discovery/tools#portal-overview">Portal Overview</a></li>
                  <li><a href="/docs/discovery/tools#excel-add-in">Excel Add-in</a></li>
                  <li><a href="/docs/discovery/tools#miscellaneous-opensource-tools">Miscellaneous FREE Tools</a></li>
              </ul>
            </Card.Body>
    </Card>
    <Card style={{width:"18rem"}}>
        <Card.Header><a href="/docs/discovery/machine-learning-and-rules"><FontAwesomeIcon icon={faBrain} /><b> Machine Learning and Rules</b></a></Card.Header>
            <Card.Body>
              <Card.Text>An overview of how you can use our machine learning features to categorise and forecast data or apply business rules for event-driven automation of tasks.</Card.Text>
              <ul>
                  <li><a href="/docs/discovery/machine-learning-and-rules#machine-learning-overview">Machine Learning Overview</a></li>
                  <li><a href="/docs/discovery/machine-learning-and-rules#business-rules">Business Rules</a></li>
                  <li><a href="/docs/discovery/machine-learning-and-rules#other-insights">Other Insights</a></li>
              </ul>
            </Card.Body>
    </Card>
    <Card style={{width:"100%"}}>
        <Card.Header><a href="/docs/discovery/quick-start"><FontAwesomeIcon icon={faChevronCircleRight} /><b> QuickStart Tracks</b></a></Card.Header>
            <Card.Body>
              <Card.Text>Choose one of our QuickStart Tracks to gain some practical, real-world experience of using OpenDataDSL.</Card.Text>
            </Card.Body>
    </Card>
</Container>