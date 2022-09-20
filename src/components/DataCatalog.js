import React from 'react';
import styles from './DataCatalog.module.css';
var Data = require('/data/catalog.json');
import { Card, Container, Button, Col } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faCalendarDay, faGlobe, faMoneyBill } from '@fortawesome/free-solid-svg-icons'

var filters = {tags: ["Financial"]};

function Logo(logo) {
  var src = "/img/data/" + logo.logo;
  return (
    <Card.Img variant="top" src={src} className={styles.logo} />
  )
}
function Block(props) {
    return (
      <Card style={{ width: '18rem' }}>
        <Logo logo={props.logo} />
        <Card.Header>{props.provider}</Card.Header>
        <Card.Body>
          <Card.Title><a href={props.link}>{props.dataset}</a></Card.Title>
          <Card.Text>{props.text}</Card.Text>
          <i>{props.providerType}</i><br />
          <FontAwesomeIcon icon={faPlay} />&nbsp;{props.start}&nbsp;
          <FontAwesomeIcon icon={faCalendarDay} />&nbsp;{props.frequency}&nbsp;
          <FontAwesomeIcon icon={faMoneyBill} />&nbsp;{props.type}
          <br />
          <FontAwesomeIcon icon={faGlobe} />&nbsp;{props.region}
          <hr />
          {props.tags.map((item) => (
            <Button key={item}>{item}</Button>
          ))}
        </Card.Body>
      </Card>
    );
  }

  export function DataCatalog() {
    return (
        <div>
          <Container className={styles.datablock}>
            {Data.map((props, idx) => (
              <Block key={idx} {...props} />
            ))}
          </Container>
        </div>
    );
  }

    export function DataCatalog2() {
        // Categorise by tags
        var entries = {};

        for (var e of Data) {
            for (var t of e.tags) {
                var en = entries[t];
                if (!en) {
                    en = [];
                    entries[t] = en;
                }
                en.push(e);
            }
        }

      return (
        <Accordion>
              {Object.keys(entries).sort().map((key, index) =>
                 (
                 <Accordion.Item eventKey={key}>
                    <Accordion.Header>{key}</Accordion.Header>
                    <Accordion.Body className="w-100">
                        <table>
                            <tbody>
                                {entries[key].sort((a,b) => (a.provider > b.provider) ? 1 : ((b.provider > a.provider) ? -1 : 0)).map((props, idx) => (
                                    <TableRow key={idx} props={props} />
                                ))}
                            </tbody>
                        </table>
                    </Accordion.Body>
                 </Accordion.Item>
                 )
              )}
        </Accordion>
      );
    }

function TableRow(props) {
  return (
    <tr>
        <td>
            <a href={props.props.link}><b>{props.props.provider}</b></a><br />
            <sub>{props.props.text}</sub><br />
            <FontAwesomeIcon icon={faGlobe} /> {props.props.region}
        </td>
        <td>
            <i>{props.props.providerType}</i><br />
            {props.props.dataset}
        </td>
        <td>
          <FontAwesomeIcon icon={faPlay} /> {props.props.start}<br />
          <FontAwesomeIcon icon={faCalendarDay} /> {props.props.frequency}<br />
          <FontAwesomeIcon icon={faMoneyBill} /> {props.props.type}
        </td>
        <td style={{backgroundColor: "White"}}>
            <Logo logo={props.props.logo} />
        </td>
    </tr>
  )
}
