export function loadTippy(tippyTarget) {
  const clientHeight = document.documentElement.clientHeight
  const tippyTargetHeight = tippyTarget.getBoundingClientRect().top

  if (clientHeight - tippyTargetHeight > -200) {

    import('tippy.js').then((tippy) => {
  
      const tipp = document.querySelector('.tooltip')
      
      tippy.default('.tooltip', {
        maxWidth: 264
      })
    })

    return true
  }

}