import {addCatalogEllipsis} from './addCatalogEllipsis.js'

const image = document.querySelector('.card__image')
const title = document.querySelector('.card__heading')
const date = document.querySelector('.card__date')
const text = document.querySelector('.card__text')
const textWrap = document.querySelector('.card__text-wrap')

const localeOptions = {
  day: `numeric`,
  month: `long`,
  year: `numeric`,
}

document.addEventListener(`click`, function(e) {

  if (!e.target.classList.contains(`accordion__name-link`)) return

  e.target.closest(`.accordion__row`).querySelectorAll('.accordion__name-link.active')
      .forEach(link => link.classList.remove(`active`))

  e.target.classList.add(`active`)

  let name = e.target.textContent

  title.textContent = name

  getImage(name, xhrImage).then(response => image.src = response, reject => image.src = './img/hero-bg-3.webp')

  getText(name, xhrText).then(response => {

    text.textContent = response

    addCatalogEllipsis(text, textWrap)
    
  }, reject => text.textContent = `Отсутствует информация`)

  getDate(name, xhrDate, xhrWikibase).then(response => {
    
    let birth = new Date(response.birth.slice(1, 11))
                    .toLocaleDateString(`ru-RU`, localeOptions)
                    .slice(0, -3)

    let death = new Date(response.death.slice(1, 11))
                    .toLocaleDateString(`ru-RU`, localeOptions)

    if (birth === `Invalid D` || birth === `Invalid Date`) {
      birth = response.birth.slice(1, 5)
    }

    if (death === `Invalid D` || death === `Invalid Date`) {
      death = response.death.slice(1, 5) + ` г.`
    }

    date.textContent = birth + ` — ` + death

  }, reject => date.textContent = ` `)
})

let xhrImage = new XMLHttpRequest()
let xhrText = new XMLHttpRequest()
let xhrDate = new XMLHttpRequest()
let xhrWikibase = new XMLHttpRequest()

function getImage(name, xhr) {

  return new Promise((response, reject) => {

    let base = "https://ru.wikipedia.org/w/api.php?origin=*"
  
    let parameters = {
      action: "query",
      format: "json",
      prop: "pageimages",
      piprop: "thumbnail",
      pithumbsize: "600",
      titles: name,
    }
  
    let urlImage = base
  
    Object.keys(parameters).forEach(key => {
      urlImage += "&" + key + "=" + parameters[key]
    })
  
    xhr.open(`get`, urlImage)
  
    xhr.onload = function() {

      if (!Object.values(JSON.parse(this.response).query.pages)[0].thumbnail) {

        reject()

      } else {

        let srcImg = Object.values(JSON.parse(this.response).query.pages)[0].thumbnail.source
        response(srcImg)
      }
    }
  
    xhr.send()
  })
}

function getText(name, xhr) {

  return new Promise((response, reject) => {

    let base = "https://ru.wikipedia.org/w/api.php?origin=*"
  
    let parameters = {
      action: "query",
      format: "json",
      titles: name,
      prop: "extracts&explaintext",
      // prop: "extracts&explaintext&exintro",
    }
  
    let urlText = base
  
    Object.keys(parameters).forEach(key => {
      urlText += "&" + key + "=" + parameters[key]
    })
  
    xhr.open(`get`, urlText)
  
    xhr.onload = function() {

      if (!Object.values(JSON.parse(this.response).query.pages)[0].extract) {

        reject()

      } else {

        let data = Object.values(JSON.parse(this.response).query.pages)[0].extract
        response(data)
      }
    }
    xhr.send()
  })
}

function getDate(name, xhr, xhrWikibase) {

  return new Promise((response, reject) => {

    let base = "https://ru.wikipedia.org/w/api.php?origin=*"
  
    let parameters = {
      action: "parse",
      format: "json",
      page: name,
    }
  
    let urlText = base
  
    Object.keys(parameters).forEach(key => {
      urlText += "&" + key + "=" + parameters[key]
    })
  
    xhr.open(`get`, urlText)
  
    xhr.onload = function() {

      let data = Object.values(JSON.parse(this.response))[0].properties[1][`*`]

      let base = "https://www.wikidata.org/w/api.php?origin=*"
  
      let parameters = {
        action: "wbgetentities",
        format: "json",
        ids: data,
        // titles: name,
        sites: "enwiki",
      }
    
      let urlText = base
    
      Object.keys(parameters).forEach(key => {
        urlText += "&" + key + "=" + parameters[key]
      })
    
      xhrWikibase.open(`get`, urlText)
    
      xhrWikibase.onload = function() {

        if (JSON.parse(this.response).error) {

          reject()

        } else if (!Object.values(JSON.parse(this.response).entities)[0].claims) {

          reject()

        } else {

          let data = Object.values(JSON.parse(this.response).entities)[0].claims

          let birth = data.P569[0].mainsnak.datavalue.value.time
          let death = data.P570[0].mainsnak.datavalue.value.time

          response({birth, death})
        }
      }
      xhrWikibase.send()
    }
    xhr.send()
  })
}
