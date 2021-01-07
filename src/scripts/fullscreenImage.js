const scene = document.querySelector('.fullscreen-scene')

document.addEventListener(`click`, function(e) {

  if (e.target.classList.contains(`gallery__slide`)) {

    const src = e.target.querySelector('.gallery__image').src
    const newSrc = src.replace(`img/`, `img/fullscreen/`)

    if (scene.querySelector(`.fullscreen-image[src='${newSrc}']`)) {
      console.log(1)
      scene.style.display = `block`
      scene.querySelector(`.fullscreen-image[src='${newSrc}']`).closest(`.fullscreen-image-wrap`).style.display = `block`
      return
    }

    const wrap = document.createElement('div')
    const descr = document.createElement('div')
    const image = document.createElement('img')
  
    wrap.classList.add(`fullscreen-image-wrap`)
    descr.classList.add(`fullscreen-image-description`)
    image.classList.add(`fullscreen-image`)

    image.src = newSrc
    descr.textContent = image.src
  
    image.onload = () => {
      scene.style.display = `block`
      scene.append(wrap)
      wrap.append(image)
      wrap.append(descr)
    }
  }

  if (e.target.closest(`.fullscreen-scene`)) {
    scene.style.display = `none`
    scene.querySelectorAll('.fullscreen-image-wrap').forEach(wrap => wrap.style.display = `none`)
  }
})

document.addEventListener(`keydown`, function(e) {
  
  if (e.code !== `Escape` &&  e.code !== `Space`) return

  scene.style.display = `none`
  scene.querySelectorAll('.fullscreen-image-wrap').forEach(wrap => wrap.style.display = `none`)
})