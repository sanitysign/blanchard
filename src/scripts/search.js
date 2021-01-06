let loaded = false

searchInputBottom.addEventListener(`focus`, loadLunr, {once: true, passive: true})
searchInputTop.addEventListener(`focus`, loadLunr, {once: true, passive: true})

function loadLunr() {

  if (loaded) return

  loaded = true

  import('./searchJSON.js').then(({searchJSON}) => {

    import(`lunr`).then((lunr) => {

      lunr = lunr.default

      require("lunr-languages/lunr.stemmer.support")(lunr)
      require('lunr-languages/lunr.multi')(lunr)
      require("lunr-languages/lunr.ru")(lunr)
      
      const searchArray = JSON.parse(searchJSON)
      const searchResultsTop = document.querySelector('.search__results_top')
      const searchResultsBottom = document.querySelector('.search__results_bottom')

      const idx = lunr(function () {
        this.use(lunr.multiLanguage('en', 'ru'))
        this.b(0)
        this.field("text")

        for (const obj of searchArray) {
          this.add(obj)
        }
      })

      searchInputTop.addEventListener(`input`, () => showSearchResult(searchInputTop, searchResultsTop))
      searchInputBottom.addEventListener(`input`, () => showSearchResult(searchInputBottom, searchResultsBottom))

      function showSearchResult(searchInput, searchResultsField) {

        searchResultsField.textContent = ``
      
        if (searchInput.value.trim().length === 0) return
      
        const result = idx.search(searchInput.value.trim())
      
        if (result.length !== 0) {

          for (let i = 0 ; i < result.length ; i++) {
      
            if (i >= 3) break
      
            const searchEntry = searchArray[result[i].ref]

            const searchResult = document.createElement('button')
            searchResult.classList.add(`search__result`, `btn`, `outline`)
            searchResult.dataset.selector = searchEntry.selector
            searchResult.textContent = `Секция: ` + searchEntry.description
            searchResultsField.append(searchResult)
          }
        }
      }
    })
  })
}