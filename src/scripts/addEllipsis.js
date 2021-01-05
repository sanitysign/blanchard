export function addEllipsis() {

  document.querySelectorAll('.events-text__center').forEach(element => {

    const heading = element.querySelector('.events-text__heading')
    const headingMarginBottom = parseInt(window.getComputedStyle(heading)[`margin-bottom`])
    const text = element.querySelector('.events-text__description')
    const liheHeight = window.getComputedStyle(text)[`line-height`]
    const height = element.getBoundingClientRect().height - heading.getBoundingClientRect().height - headingMarginBottom
    text.style.height = `unset`

    if (!element.querySelector('.events-text_original')) {
      const originalText = document.createElement('div')
      originalText.classList.add(`events-text_original`)
      originalText.textContent = text.textContent
      originalText.style.display = `none`
      element.append(originalText)
    }

    text.textContent = element.querySelector('.events-text_original').textContent

    let textArray = text.textContent
                      .split(` `)
                      .filter(item => {
                        if (item.trim().length !== 0) return true
                      })
    
    const textLength = textArray.length

    for (let i = 1 ; i <= textLength ; i++) {

      if (text.getBoundingClientRect().height <= height) break

      textArray.pop()
      
      if (textArray.length && textArray[textArray.length - 1].trim().split(``).slice(-1) != `.`) {
        text.textContent = textArray.join(` `) + `...`
      }
      
    }
  })
}

window.matchMedia(`(max-width: 1920px)`).onchange = addEllipsis
window.matchMedia(`(max-width: 1400px)`).onchange = addEllipsis
window.matchMedia(`(max-width: 1024px)`).onchange = addEllipsis
window.matchMedia(`(max-width: 940px)`).onchange = addEllipsis
window.matchMedia(`(max-width: 768px)`).onchange = addEllipsis
window.matchMedia(`(max-width: 640px)`).onchange = addEllipsis
window.matchMedia(`(max-width: 576px)`).onchange = addEllipsis
window.matchMedia(`(max-width: 480px)`).onchange = addEllipsis
window.matchMedia(`(max-width: 320px)`).onchange = addEllipsis

setTimeout(addEllipsis, 1000)
