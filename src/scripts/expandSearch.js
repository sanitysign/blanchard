$(`.search__button_top`).on(`click`, function() {

  if ($(this).hasClass(`expanded`)) {

    $(this).removeClass(`expanded`)

    $(`.search__input_top`)
        .animate({
          width: 0
        }, 500, function() {

          $(this).hide()

          $(`.header__logo`).show()

          $(`.header__logo`)
          .animate({
            opacity: 1
          }, 200)
        })

  } 
  else {

    $(this).addClass(`expanded`)

    $(`.header__logo`)
        .animate({
          opacity: 0
        }, 300, function() {

          $(this).hide()

          $(`.search__input_top`)
                  .show()
                  .focus()
                  .animate({
                    width: 218
                  }, 500)
        })
  }
})
