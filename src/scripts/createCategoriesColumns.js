const checkboxesWrap = document.querySelector('.categories__checkboxes')

createCategoriesColumns(window.matchMedia(`(max-width: 940px)`).matches)

window.matchMedia(`(max-width: 940px)`).onchange = function(e) {
  createCategoriesColumns(e.matches)
}

function createCategoriesColumns(less940) {

  if (less940) {

    if ($(`.categories .categories__label-wrap`).length !== 0) return

    let labels = Array.from(checkboxesWrap.querySelectorAll('.categories__label'))
    const rowNumber = Math.ceil(labels.length / 3)

    for (let i = 0 ; i < 3 ; i++) {

      let group = labels.slice(rowNumber * i, checkLastIndex(rowNumber * (i + 1)))

      const wrap = document.createElement('div')
      wrap.classList.add(`categories__label-wrap`)

      for (const item of group) {
        wrap.append(item)
      }

      checkboxesWrap.append(wrap)
      group = []
    }

    labels = []

    function checkLastIndex(index) {
      return index <= labels.length ? index : labels.length
    }

  } else {

    if ($(`.categories .categories__label-wrap`).length === 0) return

    let labels = Array.from(checkboxesWrap.querySelectorAll('.categories__label-wrap .categories__label'))

    for (const item of labels) {
      checkboxesWrap.append(item)
    }

    let wraps = checkboxesWrap.querySelectorAll('.categories__label-wrap')

    for (const item of wraps) {
      item.remove()
    }

    labels = []
    wraps = []
  }
}