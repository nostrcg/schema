import { html, Component, render } from '../js/spux.js'
import '../js/dior.js'

const json = di.data['@graph']

async function getVersion() {
  const response = await fetch('https://nostrcg.github.io/schema/package.json')
  const data = await response.json()
  return data.version
}

function Ontology(props) {
  return html`
    <div>
      <h1>${props.title}</h1>
      <p>${props.description}</p>
      <p style="font-style: italic;">Version: ${version}</p>
    </div>
  `
}

function Category(props) {
  function handleHeadingClick(e) {
    e.preventDefault()
    const id = e.target.id
    window.history.pushState(null, null, `#${id}`)
  }

  return html`
    <div>
      <h1 id="${props.label}" onClick=${handleHeadingClick}>${props.label}</h1>
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

  const communityGroupUrl = 'https://www.w3.org/community/nostr/'

  return html`
    <header class="w3c-header">
      <h1><a style="text-decoration: none" href="${communityGroupUrl}" target="_blank" rel="noopener noreferrer">W3C Nostr Community Group</a></h1>


      <h2>Community Draft</h2>
    </header>
    <div class="container">
      <${Ontology} title=${ontology.title} description=${ontology.description} />
      <hr />
      ${items.map(
    item => html`
          <div class="property-block">
            <${Category}
              label="${item.label}"
              comment=${item.comment}
              termStatus=${item.term_status}
            />
          </div>
        `
  )}

      <hr />

      ${properties.map(
    item => html`
          <div class="property-block">
            <${Category}
              label="${item.label}"
              comment=${item.comment}
              termStatus=${item.term_status}
            />
          </div>
        `
  )}
    </div>
  `
}

var version = await getVersion()
// console.log('version', version)

render(html`<${App} />`, document.body)
