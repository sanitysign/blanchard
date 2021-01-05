const TRANSITION = 1000
const CYCLE = 15000
let slideTimeoutId

function changeSlide() {

  const SLIDE_WIDTH = $(`.special__slide.active`).width()

  if ($(`.special`).data(`animation`)) return

  $(`.special`).data(`animation`, true)

  if ($(`.special__slide.active`).next().length) {

    $(`.special__slide.active`)
      .next()
      .css(`left`, `${SLIDE_WIDTH}px`)
      .css(`opacity`, `0`)
      .addClass("active")
      .animate({left: `0`, opacity: `1`}, TRANSITION)
  
    $(`.special__slide.active`)
      .first()
      .css(`left`, `0`)
      .animate({
      left: `-${SLIDE_WIDTH}`,
      }, TRANSITION, function() {
        $(`.special__slide.active`).first().removeClass("active")
        $(`.special`).data(`animation`, false)
        timeoutSlide(CYCLE)
      })

  } else {

    $(`.special__slide`)
      .first()
      .css(`left`, `${SLIDE_WIDTH}px`)
      .css(`opacity`, `0`)
      .addClass("active")
      .animate({left: `0`, opacity: `1`}, TRANSITION)
  
    $(`.special__slide.active`)
      .last()
      .css(`left`, `0`)
      .animate({
      left: `-${SLIDE_WIDTH}`,
      }, TRANSITION, function() {
        $(`.special__slide.active`).last().removeClass("active")
        $(`.special`).data(`animation`, false)
        timeoutSlide(CYCLE)
      })
  }
}

function timeoutSlide(ms) {

  clearTimeout(slideTimeoutId)

  slideTimeoutId = setTimeout(() => {

    changeSlide()

    timeoutSlide(ms)
  }, ms)
}

timeoutSlide(CYCLE)

$(`.special`).on(`click`, function(e) {

  if (e.target.closest(`a`)) return

  changeSlide()
})