import {searchJSON} from './searchJSON.js'
// import {generateIndex} from './generateIndex.js'

const lunr = require('lunr')
require("lunr-languages/lunr.stemmer.support")(lunr)
require('lunr-languages/lunr.multi')(lunr)
require("lunr-languages/lunr.ru")(lunr)

const searchArray = JSON.parse(searchJSON)
const searchResults = document.querySelector('.search__results')

const idx = lunr(function () {
  this.use(lunr.multiLanguage('en', 'ru'))
  this.b(0)
  this.field("text")

  for (const obj of searchArray) {
    this.add(obj)
  }
})

searchInput.oninput = (e) => {

  searchResults.textContent = ``

  if (searchInput.value.trim().length === 0) return

  const result = idx.search(searchInput.value.trim())

  if (result.length !== 0) {

    for (let i = 0 ; i < result.length ; i++) {

      if (i >= 3) break

      const searchEntry = searchArray[result[i].ref]

      const searchResult = document.createElement('button')
      searchResult.classList.add(`search__result`)
      searchResult.dataset.selector = searchEntry.selector

      const searchSection = document.createElement('span')
      searchSection.classList.add(`search__section`)
      searchSection.textContent = searchEntry.section

      const searchType = document.createElement('span')
      searchType.classList.add(`search__type`)
      searchType.textContent = searchEntry.type

      searchResult.append(searchSection, searchType)
      searchResults.append(searchResult)
    }
    
  }
  
}
