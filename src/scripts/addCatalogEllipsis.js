export function addCatalogEllipsis(text, textWrap) {

  const  maxHeight = parseInt(window.getComputedStyle(textWrap)[`max-height`])

  let textArray = text.textContent
                    .split(` `)
                    .filter(item => {
                      if (item.trim().length !== 0) return true
                    })
  
  const textLength = textArray.length

  for (let i = 1 ; i <= textLength ; i++) {

    if (text.getBoundingClientRect().height <= maxHeight) break

    textArray.pop()
    
    if (textArray.length && textArray[textArray.length - 1].trim().split(``).slice(-1) != `.`) {
      text.textContent = textArray.join(` `) + `...`
    }
  }
}