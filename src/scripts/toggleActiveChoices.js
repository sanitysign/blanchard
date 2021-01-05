$(`.choices`).on(`click`, function() {
  $(this).addClass(`active-custom`)
  $(`.choices`).not(this).removeClass(`active-custom`)
})