export function generateIndex() {
    const content = document.querySelectorAll('body *')
  let index = []
  let counter = 0

  const header = document.querySelector('.header')

  for (const item of content) {

    if (item.closest(`.special`)) continue

    if ({}.toString.call(item.firstChild) === `[object Text]` && item.firstChild.textContent.trim().length !== 0) {
      let content = Array.from(item.textContent.trim().replaceAll(`\n`, `, `).replaceAll(`\t`, ` `))

      for (let i = content.length - 1 ; i >= 0 ; i--) {
        if (i >= 1 && content[i] === ` ` && content[i - 1] === ` `) {
          content.splice(i, 1)
        }
      }

      const section = item.closest(`h2`) ? 
                      item.closest(`h2`).textContent : 
                      item.closest(`section`) ? 
                      item.closest(`section`).querySelector('h2').textContent : 
                      item.closest(`header`) ?
                      `Шапка сайта` :
                      `Подвал сайта`

    let type
    switch (item.tagName) {
      case `A`: type = `ссылка`
      break

      case `BUTTON`: type = `кнопка`
      break

      case `H1`:
      case `H2`:
      case `H3`:
      case `H4`: type = `оглавление`
      break

      case `LABEL`: type = `поле для ввода`
      break

      default: type = `текст`
      break
      }

      index.push((
        {
          id: counter++,
          selector: `.` + item.className.replaceAll(` `, `.`),
          type: type,
          section: section,
          text: content.join(``),
        }
      ))
    }
  }
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
// generateIndex()
