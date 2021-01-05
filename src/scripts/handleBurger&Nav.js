import "wicg-inert"

const burger = document.querySelector('.header__burger')
const nav = document.querySelector('.header__nav')
const close = document.querySelector('.nav__close')
const logo = document.querySelector('.header__logo')
let activeElem

burger.onclick = () => {
  nav.style.display = `flex`
  setTimeout(() => nav.classList.add(`open`))
  makeInert()
}

close.onclick = () => {
  nav.classList.remove(`open`)
  resetInert()
  setTimeout(() => nav.style.display = ``, 300)
}

window.addEventListener(`keydown`, (e) => {

  if (!nav.classList.contains(`open`)) return

  if (e.code === `Escape`) {

    nav.classList.remove(`open`)
    resetInert()
    setTimeout(() => nav.style.display = ``, 300)
  }
})

$(`.header__nav a`).on(`click`, function() {

  if (nav.classList.contains(`open`)) {
    nav.classList.remove(`open`)
    resetInert()
    
    setTimeout(() => {
      nav.style.display = ``

      const id = $(this).attr(`href`)

      if (id.length <= 1 || $(id).length === 0) return

      const top = $(id).offset().top

      $(`html, body`).animate({
        scrollTop: top
      }, 500)

    }, 300)
  } else {
      const id = $(this).attr(`href`)

      if (id.length <= 1 || $(id).length === 0) return

      const top = $(id).offset().top

      $(`html, body`).animate({
        scrollTop: top
      }, 500)
  }
})

window.matchMedia(`(max-width: 1024px)`).onchange = function(e) {

  if (e.matches) return

  logo.style.opacity = 1
  logo.style.display = `block`

  if (!nav.classList.contains(`open`)) return
  nav.classList.remove(`open`)

  resetInert()
  setTimeout(() => nav.style.display = ``, 300)
}

function makeInert() {

  activeElem = document.activeElement

  activeElem.blur()

  document.querySelector('main').inert = true
  document.querySelector('footer').inert = true
  document.querySelector('.header__bottom').inert = true

  for (const elem of document.querySelector('.header__container_top').children) {

    if (elem.closest(`.header__nav`)) continue

    elem.inert = true
  }

  document.body.style.overflow = `hidden`
}

function resetInert() {

  document.querySelector('main').inert = false
  document.querySelector('footer').inert = false
  document.querySelector('.header__bottom').inert = false

  for (const elem of document.querySelector('.header__container_top').children) elem.inert = false

  document.body.style.overflow = ``

  if (activeElem) activeElem.focus()
  
}