import 'jquery-ui/ui/widgets/accordion'

$(function() {
  $(`.catalog__accordion`).accordion({

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

  const block = $(this).data().lang

  $(`.catalog .catalog__grid.active`)
    .animate({
      opacity: 0
    }, 500, function() {
      $(`.catalog .catalog__grid.active`).removeClass(`active`)

      $(`.catalog .catalog__grid[data-block=${block}]`)
          .addClass(`active`)
          .css(`opacity`, 0)
          .animate({
            opacity: 1
          }, 500)
  
      $(`.catalog__grid.active .catalog__accordion`).accordion("refresh")
    })
})