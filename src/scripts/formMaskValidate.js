export function formMaskValidate(IMask, JustValidate) {
  const inputFrom = document.querySelector('.range__form [name="inputFrom"]')
  const inputTo = document.querySelector('.range__form [name="inputTo"]')
  const inputPhone = document.querySelector('.contacts-form [name="contactsPhone"]')
  
  const rangeOptions = {
    mask: Number,
    min: 50,
    max: 25000,
    thousandsSeparator: ' '
  }
  
  const inputFromMask = IMask(inputFrom, rangeOptions)
  const inputToMask = IMask(inputTo, rangeOptions)
  const phoneMask = IMask(inputPhone, {
    mask: '+7 000 000-00-00'
  })
  
  const formOptions = {
    rules: {
      name: {
        required: true,
        minLength: 3,
        function: (name, value) => {
          const letters = /^[a-z, а-я, A-Z, А-Я, " "]+$/
          return value.match(letters)
        },
      },
      phone: {
        required: true,
        function: (name, value) => {
  
          if (phoneMask.unmaskedValue) {
            console.log(phoneMask.unmaskedValue)
            return phoneMask.unmaskedValue.length === 10
          }
        },
      },
    },
    messages: {
      name: {
        required: 'Поле обязательно для заполнения',
        minLength: 'Минимальная длина имени: 3 символа',
        function: 'Имя может содержать только буквы'
      },
      phone: {
        required: 'Поле обязательно для заполнения',
        function: 'Введите полный номер'
      },
    },
    tooltip: {
      selectorWrap: '.contacts-form__input-wrap',
      fadeOutTime: 6000
    },
    submitHandler: function (form, values, ajax) {
      return
    }
  }
  
  new window.JustValidate('.contacts-form', formOptions)
}