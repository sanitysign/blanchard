$(`.hero__btn`).on(`click`, function() {

  $(`html, body`).animate({
    scrollTop: $(`#map`).offset().top + 1000
  }, 500)
})