export function createDestroyIssuesSwiper({Swiper, swiperOptionsIssues}) {
  let swiperIssues = null

  manageIssuesSection(window.matchMedia(`(max-width: 480px)`).matches)

  window.matchMedia(`(max-width: 480px)`).onchange = function(e) {
    return manageIssuesSection(e.matches)
  }

  function manageIssuesSection(less480) {

    if (less480) {

      $(`.issues .issues__swiper-container`).removeClass(`swiper-container`)
      $(`.issues .issues__swiper-wrapper`).removeClass(`swiper-wrapper`)
      $(`.issues .issues__swiper-wrapper`).addClass(`issues__swiper-grid`)
      $(`.issues .issues__slide`).removeClass(`swiper-slide`)

      if (typeof Swiper === `undefined` || typeof swiperIssues === `undefined` || swiperIssues === null) return

      swiperIssues.destroy()
      swiperIssues = null

    } else {

      $(`.issues .issues__swiper-container`).addClass(`swiper-container`)
      $(`.issues .issues__swiper-wrapper`).addClass(`swiper-wrapper`)
      $(`.issues .issues__swiper-wrapper`).removeClass(`issues__swiper-grid`)
      $(`.issues .issues__slide`).addClass(`swiper-slide`)

      swiperIssues = new Swiper('.issues__swiper-container', swiperOptionsIssues)
    }
  }
}