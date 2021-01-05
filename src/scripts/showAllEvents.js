import {addEllipsis} from './addEllipsis.js'

showHideEventsCards(window.matchMedia(`(max-width: 940px)`).matches)

window.matchMedia(`(max-width: 940px)`).onchange = function(e) {
  showHideEventsCards(e.matches)
}

function showHideEventsCards(less940) {
  
  if (less940) {

    $(`.events .events__card`).slice(2).addClass(`hidden`)
    addEllipsis()

  } else {
    
    $(`.events .events__card`).slice(0, 3).removeClass(`hidden`)
    $(`.events .events__card`).slice(3).addClass(`hidden`)
    addEllipsis()
    
  }
}

$(`.events__all`).on(`click`, function() {
  $(`.events__grid .events__card.hidden`).show(0, function() {
    $(`.events__grid .events__card.hidden`).fadeIn(1000)
    $(`.events__grid .events__card.hidden`).removeClass(`hidden`)
    $(`.events__all`).hide()

    addEllipsis()
  })
})