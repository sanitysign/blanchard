let highlightTimeout

$(`body`).on(`click`, function(e) {

  if ($(e.target).closest(`.search`).length === 0) {
    $(`.search__results`).text(` `)
  }

  if ($(e.target).closest(`.search__result`).length !== 0 || $(e.target).closest(`.search__submit`).length !== 0) {

    if ($(`.search__result`).length === 0) return
    
    const selector = $(e.target).closest(`.search__result`).length !== 0 ?
                        $(e.target).closest(`.search__result`).data().selector :
                        $(`.search__result`).first().data().selector

    if ($(selector).length !== 0) {

      const scroll = $(selector).closest(`div`).length !==0 ? 
                        $(selector).closest(`div`).offset().top : 
                        $(selector).offset().top

      $(`body, html`).animate({
        scrollTop: scroll - 10
      }, 500)

      $(selector).addClass(`highlighted`)
      highlightTimeout = setTimeout(() => {

        $(selector).removeClass(`highlighted`)
        clearTimeout(highlightTimeout)

      }, 3000)
    }
  }
})