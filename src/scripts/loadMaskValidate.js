export function loadMaskValidate(range) {
  const clientHeight = document.documentElement.clientHeight
  const rangeHeight = range.getBoundingClientRect().top
  
  if (clientHeight - rangeHeight > -200) {

    import('imask/esm/imask').then((IMask) => {

      import('imask/esm/masked/number')
  
      import('just-validate/dist/js/just-validate.min').then((JustValidate) => {
        
        import('./formMaskValidate.js').then(({formMaskValidate}) => formMaskValidate(IMask.default, JustValidate.default))
      })
    })
    return true
  }
}