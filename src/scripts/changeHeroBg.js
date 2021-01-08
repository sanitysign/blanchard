const hero = document.querySelector('.hero__bg')

const INTERVAL = 5000
let index = 0
let transition

const bgUrl = [
  'img/hero-bg-1.webp',
  'img/hero-bg-2.webp',
  'img/hero-bg-3.webp',
]

function cycleIndex() {
  if (index >= bgUrl.length) index = 0
  return index
}

setInterval(() => {

  hero.classList.add(`hero-bg-fade`)

  hero.addEventListener(`transitionend`, function() {

    hero.style.setProperty(`background-image`, `url(${bgUrl[cycleIndex(index++)]})`)
    hero.classList.remove(`hero-bg-fade`)

  }, {once: true})

}, INTERVAL)
