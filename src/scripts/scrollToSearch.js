$(`body`).on(`click`, function(e) {

  if (!$(e.target).hasClass(`search__result`)) return

  const section = $(e.target).attr(`data-selector`)
  const sectionTop = $(`.${section}`).offset().top

  $(`body, html`).animate({
    scrollTop: sectionTop
  }, 500)
})

$(`.search__button`).on(`click`, function() {

  const searchResult = $(this).siblings(`.search__results`).find(`.search__result`).first()

  if (searchResult.length === 0) return

  const section = searchResult.attr(`data-selector`)
  const sectionTop = $(`.${section}`).offset().top

  $(this).siblings(`.search__results`).html(``)
  $(this).siblings(`.search__input`).val(``)

  $(`body, html`).animate({
    scrollTop: sectionTop
  }, 500)
})