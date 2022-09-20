import React from 'react';
import styles from './DataCatalog.module.css';
var Data = require('/data/codelibrary.json');
import Accordion from 'react-bootstrap/Accordion';

export function CodeLibraryByType() {
        // Categorise by type
        var entries = {};

        for (var e of Data) {
            var t = e.type;
            var en = entries[t];
            if (!en) {
                en = [];
                entries[t] = en;
            }
            en.push(e);
        }
        return showEntries(entries, "type");
    }

export function CodeLibraryByCategory() {
        // Categorise by type
        var entries = {};

        for (var e of Data) {
            var t = e.category;
            var en = entries[t];
            if (!en) {
                en = [];
                entries[t] = en;
            }
            en.push(e);
        }
        return showEntries(entries, "cat");
    }

function showEntries(entries, tag) {
    return (
        <Accordion>
              {Object.keys(entries).sort().map((key, index) =>
                 (
                 <Accordion.Item eventKey={key}>
                    <Accordion.Header>{key}</Accordion.Header>
                    <Accordion.Body className="w-100">
                        <table>
                            <tbody>
                                {entries[key].sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).map((props, idx) => (
                                    <TableRow key={tag+idx} {...props} />
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

function TableRow({type,category,name,link,description}) {
  return (
    <tr>
        <td>
            <a href={link}><b>{category}</b></a><br />
            <sub>{type}</sub><br />
        </td>
        <td>
            <a href={link}><i>{name}</i></a>
        </td>
        <td>
            {description}
        </td>
    </tr>
  )
}
