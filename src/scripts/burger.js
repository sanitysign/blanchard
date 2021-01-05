const burger = document.querySelector('.nav__burger ')
const navList = document.querySelector('.nav__list ')
const transition = 300
let timeoutId

burger.onclick = () => {

  if (navList.classList.contains(`hide`)) {

    navList.classList.remove(`hide`)

    timeoutId = setTimeout(() => {
      navList.classList.add(`active`)
      clearTimeout(timeoutId)
    }, 30)

  } else {

    navList.classList.remove(`active`)

    timeoutId = setTimeout(() => {
      navList.classList.add(`hide`)
      clearTimeout(timeoutId)
    }, 300)

  }

  document.body.onclick = (e) => {

    if (!e.target.closest(`.nav__burger`)) {
      navList.classList.remove(`active`)

      timeoutId = setTimeout(() => {
        navList.classList.add(`hide`)
        clearTimeout(timeoutId)
      }, 300)
    }
  }
}