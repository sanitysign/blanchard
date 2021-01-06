import 'jquery-ui/ui/widgets/accordion'

$(function() {
  $(`.catalog__accordion`).accordion({

    heightStyle: "content",

    beforeActivate: function(e) {
      $(`.catalog__accordion .accordion__row .accordion__name-wrap`).animate({
        opacity: 0
      }, 150)
    },
    activate: function() {

      $(`.catalog__accordion .accordion__row.ui-accordion-content-active .accordion__name-wrap`).animate({
        opacity: 1
      }, 300)
    }
  })

  let resizeTimeout

  $(window).on(`resize`, function() {

    clearTimeout(resizeTimeout)

    resizeTimeout = setTimeout(() => {
      $(`.catalog__grid.active .catalog__accordion`).accordion("refresh")
      
    }, 200)
  })
})

$(`.catalog__flag`).on(`click`, function() {

  if ($(this).hasClass(`active`)) return

  $(this).addClass(`active`)
  $(`.catalog__flag`).not(this).removeClass(`active`)

  const lang = $(this).data().lang

  $(`.catalog__grid`)
    .animate({
      opacity: 0
    }, 500, function() {
      switchTab(lang)
      $(`.catalog__accordion`).accordion("refresh")
    })          
    .animate({
      opacity: 1
    }, 500)
})

function switchTab(lang) {
  const tab = $(`.catalog__tab[data-lang=${lang}]`)

  $(`.catalog__text`).text(tab.find(`.tab__description`).text())
  $(`.card__image`).attr(`src`, tab.find(`.tab__image`).attr(`src`))
  $(`.card__heading`).text(tab.find(`.tab__heading`).text())
  $(`.card__date`).text(tab.find(`.tab__date`).text())
  $(`.card__text`).text(tab.find(`.tab__text`).text())
}