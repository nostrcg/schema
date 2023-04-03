import { html, Component, render } from '../js/spux.js'
import '../js/dior.js'

const json = di.data

function Ontology(props) {
  return html`
          <div>
            <h1>${props.title}</h1>
            <p>Description: ${props.description}</p>
          </div>
        `
}

function Category(props) {
  return html`
          <div>
            <h1 id="${props.label}">${props.label}</h1>
            <p>Comment: ${props.comment}</p>
            <p>Term status: ${props.termStatus}</p>
          </div>
        `
}

function App() {
  const ontology = json.find(
    item => item['@type'] === 'http://www.w3.org/2002/07/owl#Ontology'
  )
  const items = json.filter(item =>
    item['@type'].includes('http://www.w3.org/2002/07/owl#Class')
  )

  const properties = json.filter(item =>
    item['@type'].includes('http://www.w3.org/1999/02/22-rdf-syntax-ns#Property')
  )

  return html`
          <${Ontology}
            title=${ontology['http://purl.org/dc/elements/1.1/title']}
            description=${ontology[
    'http://purl.org/dc/elements/1.1/description'
    ]}
          />
          <hr />
          ${items.map(
      item => html`
              <${Category}
                label="${item['http://www.w3.org/2000/01/rdf-schema#label']}"
                comment=${item['http://www.w3.org/2000/01/rdf-schema#comment']}
                termStatus=${item[
        'http://www.w3.org/2003/06/sw-vocab-status/ns#term_status'
        ]}
              />


              
            `
    )}

    <hr />


    ${properties.map(
      item => html`
              <${Category}
                 label="${item['http://www.w3.org/2000/01/rdf-schema#label']}"
                comment=${item['http://www.w3.org/2000/01/rdf-schema#comment']}
                termStatus=${item[
        'http://www.w3.org/2003/06/sw-vocab-status/ns#term_status'
        ]}
              />
              
            `
    )}

        `
}

render(html`<${App} />`, document.body)
