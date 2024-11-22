import React from 'react';
import styles from './Functions.module.css';
import { Card, Container, Button, Col } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
var Data = require('/data/functions.json');
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function FunctionTable() {
    return (
        <div>
            <table>
                <thead>
                    <th>Class</th>
                    <th>Function</th>
                    <th>Returns</th>
                    <th>Applies To</th>
                </thead>
                <tbody>
                    {Data.map((props, idx) => (
                      <Row key={idx} {...props} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function Row(props) {
  return (
    <tr>
        <td>
            {props.class}
        </td>
        <td>
            <a href={props.link}><b>{props.constructor}</b></a><br />
            <sub>{props.description}</sub>
        </td>
        <td>
            {props.returns}
        </td>
        <td>
            {props.tags.flatMap((t) => <span className={styles.tag}>{t}</span>)}
        </td>
    </tr>
  )
}

function params(props) {
return (
        <td>
            <table>
                <tbody>
                    {props.params.map((props, idx) => (
                        <Param key={idx} {...props} />
                    ))}
                </tbody>
            </table>
        </td>
)
}

function Param(props) {
return (
    <tr>
        <td>
            {props.name}<br />
            <sub>{props.description}</sub>
        </td>
        <td>
            <sub>{props.type}</sub>
        </td>
    </tr>
    )
}