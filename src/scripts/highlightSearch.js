$(`.search__button`).on(`focus`, function() {
  $(`.search`).addClass(`active`)
})

$(`.search__button`).on(`blur`, function() {
  $(`.search`).removeClass(`active`)
})

$(`.search__input`).on(`focus`, function() {
  $(this).attr(`placeholder`, ``)
  $(`.search__button`).addClass(`active`)
})

$(`.search__input`).on(`blur`, function() {
  $(this).attr(`placeholder`, `Поиск по сайту`)
  $(`.search__button`).removeClass(`active`)
}) 