export function createDestroyEventsSwiper({Swiper, swiperOptionsEvents}) {
  let numberOfHidden = 0
  let swiperEvents = null

  manageEventsSection(window.matchMedia(`(max-width: 680px)`).matches)

  window.matchMedia(`(max-width: 680px)`).onchange = function(e) {
    return manageEventsSection(e.matches)
  }

  function manageEventsSection(less680) {

    if (less680) {

      $(`.events .events__swiper-container`).addClass(`swiper-container`)
      $(`.events .events__swiper-wrapper`).addClass(`swiper-wrapper`)
      $(`.events .events__swiper-wrapper`).removeClass(`events__grid`)
      $(`.events .events__slide`).addClass(`swiper-slide`)
      numberOfHidden = $(`.events .events__slide.hidden`).length
      $(`.events .events__slide`).removeClass(`hidden`)
      $(`.events .events__all`).hide()

      swiperEvents = new Swiper('.events__swiper-container', swiperOptionsEvents)

    } else {

      if (typeof Swiper === `undefined` || typeof swiperEvents === `undefined` || swiperEvents === null) return

      swiperEvents.destroy()
      swiperEvents = null

      $(`.events .events__swiper-container`).removeClass(`swiper-container`)
      $(`.events .events__swiper-wrapper`).removeClass(`swiper-wrapper`)
      $(`.events .events__swiper-wrapper`).addClass(`events__grid`)
      $(`.events .events__slide`).removeClass(`swiper-slide`)
      $(`.events .events__pagination`).html(``)

      if (numberOfHidden) {
        let slides = Array.from($(`.events .events__slide`))

        for (let i = slides.length - 1 ; i >= slides.length - numberOfHidden ; i--) {
          slides[i].classList.add(`hidden`)
        }

        slides = []

        $(`.events .events__all`).show()
      }
    }
  }
}