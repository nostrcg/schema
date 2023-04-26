import { html, Component, render } from '../js/spux.js'
import '../js/dior.js'

const json = di.data['@graph']

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
  const ontology = json.find(item => item['@type'] === 'owl:Ontology')
  const items = json.filter(item => item['@type'].includes('rdfs:Class'))

  const properties = json.filter(item =>
    item['@type'].includes('rdfs:Property')
  )

  return html`
    <${Ontology}
      title=${ontology.title}
      description=${ontology.description}
    />
    <hr />
    ${items.map(
    item => html`
        <${Category}
          label="${item.label}"
          comment=${item.comment}
          termStatus=${item['term_status']}
        />
      `
  )}

    <hr />

    ${properties.map(
    item => html`
        <${Category}
          label="${item.label}"
          comment=${item.comment}
          termStatus=${item.term_status}
        />
      `
  )}
  `
}

render(html`<${App} />`, document.body)
