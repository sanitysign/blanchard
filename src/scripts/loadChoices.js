import 'choices.js/public/assets/styles/choices.min.css'
import Choices from 'choices.js/public/assets/scripts/choices.min'

const select = new Choices('select', {
  searchEnabled: false,
  itemSelectText: '',
  shouldSort: false,
})

const choices = document.querySelectorAll('.choices[data-type*=select-one]')
const choicesInner = document.querySelectorAll('.choices__inner')
const filters = document.querySelectorAll('.filters__select')

filters.forEach((item, index) => {

  if (item.classList.contains(`active-custom`)) {
    choices[index].classList.add(`active-custom`)
    choicesInner[index].classList.add(`active-custom`)
  }
})
