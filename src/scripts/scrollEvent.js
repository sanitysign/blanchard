import 'tippy.js/dist/tippy.css'
import 'swiper/swiper-bundle.css'

import {loadTippy} from './loadTippy.js'
import {loadYandexMaps} from './loadYandexMaps.js'
import {loadMaskValidate} from './loadMaskValidate.js'
import {loadSwiper} from './loadSwiper.js'

let prevTime = 0
let timeout

let tippyLoaded = false
const tippyTarget = document.querySelector('.projects__description')

let mapLoaded = false
const map = document.querySelector('.contacts__map')

let maskValidateLoaded = false
const range = document.querySelector('.range__form')

let swiperLoaded = false
const gallerySwiper = document.querySelector('.gallery__swiper')
const issuesSwiper = document.querySelector('.issues__swiper')
const partnersSwiper = document.querySelector('.partners__swiper')
const eventsSwiper = document.querySelector('.events__swiper')


document.addEventListener(`scroll`, function(e) {

  if (e.timeStamp - prevTime < 200) return

  prevTime = e.timeStamp

  load()

  clearTimeout(timeout)
  timeout = setTimeout(load, 250)
})

function load() {
  if (!tippyLoaded) {
    tippyLoaded = loadTippy(tippyTarget)
  }

  if (!mapLoaded) {
    mapLoaded = loadYandexMaps(map)
  }

  if (!maskValidateLoaded) {
    maskValidateLoaded = loadMaskValidate(range)
  }

  if (!swiperLoaded) {
    swiperLoaded = loadSwiper({gallerySwiper, issuesSwiper, partnersSwiper, eventsSwiper})
  }
}

swiperLoaded = loadSwiper({gallerySwiper, issuesSwiper, partnersSwiper, eventsSwiper})
