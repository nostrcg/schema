;(() => {
  globalThis.qs = Object.fromEntries(
    new URLSearchParams(document.location.search)
  )

  globalThis.di = new Proxy(
    Array.from(
      document.querySelectorAll(
        'script[type="application/ld+json"], script[type="application/json"]'
      )
    )
      .map(island => [island.id, JSON.parse(island.text || JSON.stringify(''))])
      .reduce((obj, item) => {
        obj[item[0]] = item[1]
        return obj
      }, {}),
    {
      set: (obj, prop, value) => {
        obj[prop] = value
        var island = document.getElementById(prop)
        island.text = JSON.stringify(value, null, 2)
        return true
      }
    }
  )
})()
