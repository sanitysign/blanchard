showHideCheckboxesList(window.matchMedia(`(max-width: 680px)`).matches)

window.matchMedia(`(max-width: 680px)`).onchange = function(e) {
  showHideCheckboxesList(e.matches)
}

function showHideCheckboxesList(less680) {

  if(!less680) {

    $(`.categories__checkboxes`).css(`display`, `flex`)

  } else {

    $(`.categories__checkboxes`).css(`display`, `none`)

    for (const item of $(`.categories__checkboxes .categories__label`).find(`input`)) {

      if (item.checked) {
        appendSelectedCheckboxes(item.closest(`.categories__label`))
      }
    }
  }
}

$(`.categories__btn`).on(`click`, function() {

  if ($(this).hasClass(`is-open`)) {

    $(this).blur()
    $(this).removeClass(`is-open`)
    $(`.categories__checkboxes`).css(`display`, `none`)

  } else {

    $(this).blur()
    $(this).addClass(`is-open`)
    $(`.categories__checkboxes`).css(`display`, `flex`)
    $(`.categories__checkboxes input`).prop(`checked`, false)
    $(`.categories__selects`).html(``)
  }
})

$(`body`).on(`click`, function(e) {

  if ($(window).width() > 680) return

  if($(e.target).closest(`.categories`).length === 0) {
    $(`.categories__btn`).removeClass(`is-open`)
    $(`.categories__checkboxes`).css(`display`, `none`)
  }

  if($(e.target).closest(`.categories__close`).length !== 0 || $(e.target).closest(`.categories__label`).length !== 0) {
    $(e.target).closest(`.categories__select`).remove()
  }
})

$(`.categories__checkboxes .categories__label`).on(`click`, function() {

  if ($(window).width() > 680) return

  if ($(this).find(`.categories__checkbox`).prop(`checked`)) {

    appendSelectedCheckboxes($(this)[0])
  } else {
    $(`.categories__selects .categories__label[data-index=${$(this).attr(`data-index`)}]`).closest(`.categories__select`).remove()
  }
})

function appendSelectedCheckboxes(item) {

  let clone = item.cloneNode(true)
  let select = document.createElement('div')
  select.classList.add(`categories__select`)

  select.innerHTML = `<button class="categories__close btn outline">
  <span class="categories__line categories__line_horizontal"></span>
  <span class="categories__line categories__line_vertical"></span>
  </button>`

  if ($(`.categories__selects .categories__label[data-index=${item.dataset.index}]`).length !== 0) return
  select.prepend(clone)
  $(`.categories__selects`).append(select)

  if ($(`.categories__selects .categories__select`).length >= 5) {
    $(`.categories__selects .categories__select`).first().remove()
  }
}