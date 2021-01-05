$(`.categories__link`).on(`click`, function() {

  if ($(this).siblings(`input`).prop(`checked`)) {
    $(this).siblings(`input`).prop(`checked`, false)
  } else {
    $(this).siblings(`input`).prop(`checked`, true)
  }

  $(this).blur()
})
