import React from 'react';
import { Card, Container } from 'react-bootstrap';
import styles from '/src/components/StartBuilding.module.css';

export default function StartBuilding(props) {
    return (
        <Container className={styles.datablock}>
            <a href="/SignUp">
                <Card style={{width:"18rem"}}>
                        <Card.Body>
                          <img src="/img/home/enhancements.png" />
                          <Card.Title>Start building for FREE today</Card.Title>
                          <Card.Text>No credit card required</Card.Text>
                        </Card.Body>
                </Card>
            </a>
        </Container>
    );
}
