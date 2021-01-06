export function generateIndex() {
  const content = document.querySelectorAll('main *')
  const socials = [`whatsapp`, `telegram`, `вконтакте`, `instagram`, `facebook`]
  let index = []
  let counter = 0

  main: for (const item of content) {

    if (item.classList.contains(`search__label`) || item.classList.contains(`issues-slide__btn`)) continue
    if (item.classList.contains(`issues-slide__btn`) || item.classList.contains(`issues-slide__price`)) continue
    if (item.textContent.length < 5) continue
    
    if ({}.toString.call(item.firstChild) === `[object Text]` && item.firstChild.textContent.trim().length !== 0) {
      let content = Array.from(item.textContent.trim().replaceAll(`\n`, `, `).replaceAll(`\t`, ` `))

      for (let i = content.length - 1 ; i >= 0 ; i--) {
        if (i >= 1 && content[i] === ` ` && content[i - 1] === ` `) {
          content.splice(i, 1)
        }
      }

      const section = item.closest(`section`).querySelector('h2') ? 
                      item.closest(`section`).querySelector('h2').textContent : 
                      `Верхняя секция`

      const description = item.closest(`.filters`) ?
                          `(фильтры)` :
                          item.closest(`.gallery__swiper`) ?
                          `(слайдер)` :
                          item.closest(`.catalog__tab`) ?
                          `(${item.closest(`.catalog__tab`).dataset.descr} язык)` :
                          item.closest(`.accordion__row`) ?
                          `(аккордион)` :
                          item.closest(`.issues__swiper`) ?
                          `(книга)` :
                          item.closest(`.events__swiper`) ?
                          `(карточка)` :
                          ` `

      if (description === `(аккордион)`) {

        for (const obj of index) {

          if (obj.text === content.join(``)) continue main
        }
      }

      index.push((
        {
          id: counter++,
          selector: item.closest(`.header`) ? `header` : item.closest(`section`).className.replaceAll(` `, `.`),
          description: section + ' ' + description,
          text: content.join(``),
        }
      ))
    }
  }

  for (const item of socials) {

    index.push((
      {
        id: counter++,
        selector: `footer`,
        description: `подвал`,
        text: item,
      }
    ))
  }
  
  // console.log(index)
  console.table(index)

  function downloadIndex() {
    const link = document.createElement('a')
    link.download = `index.txt`
    let indexBlob = new Blob([JSON.stringify(index)], {type: 'text/plain'})
    link.href = URL.createObjectURL(indexBlob)
    link.click()
  }

  // downloadIndex() 
}
generateIndex()
