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
            <span><Button className="btn-sm" key={item}>{item}</Button>&nbsp;</span>
          ))}
        </Card.Body>
      </Card>
    );
  }

function ProviderRow(props) {
    return (
      <tr style={{ width: '18rem' }}>
        <td><Logo logo={props.logo} /></td>
        <td>{props.provider}</td>
        <td>{props.links.map((l) => <span key={l.text}><a href={l.link}>{l.text}</a><br/></span>)}</td>
      </tr>
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

  export function DataProviders() {
    var sorted = Data.sort((a,b) => a.provider.localeCompare(b.provider));
    var list = [];
    var last = null;
    for (var item of sorted) {
        if (last != null) {
            if (last.provider == item.provider) {
                last.links.push({link: item.link, text: item.text})
            } else {
                item.links = [{link: item.link, text: item.text}];
                list.push(item);
                last = item;
            }
        } else {
            last = item;
        }
    }
    return (
        <div>
          <Container className={styles.datablock}>
            <table>
                <thead><tr><th>Logo</th><th>Provider</th><th>Data Sets</th></tr></thead>
                <tbody>
                    {list.map((props, idx) => (
                      <ProviderRow key={idx} {...props} />
                    ))}
                </tbody>
            </table>
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
