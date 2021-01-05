import SimpleBar from 'simplebar'
import 'simplebar/dist/simplebar.css'


for (const list of $(`.dropdown__list`)) {
  new SimpleBar(list, {
    autoHide: false,
    scrollbarMaxSize: 28,
    forceVisible: 'y',
  })
  list.dataset.open = `false`
}

$(`.dropdown__btn`).on(`click`, function() {

  if ( $(this).next().attr(`data-open`) === `true`) {

    $(this).next().fadeOut()
    $(this).next().attr(`data-open`, `false`)
    $(this).removeClass(`rotate-chevron`)

  } else {

    $(`.dropdown__list`).not(this).fadeOut()
    $(`.dropdown__list`).not(this).attr(`data-open`, `false`)
    $(`.dropdown__btn`).not(this).removeClass(`rotate-chevron`)

    $(this).next().fadeIn()
    $(this).next().attr(`data-open`, `true`)
    $(this).addClass(`rotate-chevron`)
  }
})

$(`body`).on(`click`, function(e) {
  
  if ($(e.target).closest(`.dropdown`).length !== 0) return

  $(`.dropdown__list`).fadeOut()
  $(`.dropdown__list`).attr(`data-open`, `false`)
  $(`.dropdown__btn`).removeClass(`rotate-chevron`)
})
