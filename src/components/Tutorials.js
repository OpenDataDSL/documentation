import React from 'react';
import { Card, Container } from 'react-bootstrap';
import styles from '/src/components/Tutorials.module.css';

export default function Tutorials(props) {
    return (
        <Container className={styles.tutdatablock}>
                <Card style={{width:"100%"}}>
                        <Card.Body>
                            <a href="/docs/tutorials/tutorials">
                            <img src="/img/tutorials.png" />
                            </a>
                          <Card.Text>

<a href="/docs/tutorials/gettingstartedodsl">Getting started with ODSL</a>
<p>Ease your way into programming with ODSL with a simple tutorial that walks through the language basics</p>

<a href="/docs/tutorials/smart-curves">Create a Smart Curve</a>
<p>This tutorial introduces you to Smart Curves and walks you through creating curves in ODSL or REST API calls</p>

<a href="/docs/tutorials/searching">Searching using the find command</a>
<p>This guide details the syntax of the find command and shows many examples of using it</p>

<a href="/docs/tutorials/localsqlserver">Create a custom local SQL Server loader</a>
<p>This tutorial takes a detailed look at subscribing to some data in OpenDataDSL which will trigger a message to be sent to a queue. We will write a client side C# application to listen for those messages and load the data into a local SQL Server</p>

<a href="/docs/tutorials/workingtimeseries">Working with TimeSeries in OpenDataDSL</a>
<p>This tutorial explores a few aspects of TimeSeries in the OpenDataDSL language</p>

<a href="/docs/tutorials/workingenvironments">Working with Data Environments</a>
<p>This tutorial teaches you about data environments and how to use them</p>


                          </Card.Text>
                        </Card.Body>
                </Card>
        </Container>
    );
}
