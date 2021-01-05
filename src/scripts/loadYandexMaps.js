export function loadYandexMaps(map) {
  const clientHeight = document.documentElement.clientHeight
  const mapHeight = map.getBoundingClientRect().top
  
  if (clientHeight - mapHeight > -1000) {
    
    loadMap()
    return true
  }

  function loadMap() {
    const script = document.createElement('script')
    script.defer = true
    script.src = "https://api-maps.yandex.ru/2.1/?&lang=ru_RU"
    document.head.append(script)
  
    script.onload = () => ymaps.ready(init)
  }
  
  function init(){
  
    const myMap = new ymaps.Map("map", {
        center: [55.758471, 37.606],
        zoom: 15,
        controls: ['zoomControl', 'geolocationControl']
    }, {
  
      suppressMapOpenBlock: true,
  
      geolocationControlPosition: {
        top: '325px',
        right: '10px'
      },
  
      zoomControlSize: 'small',
  
      zoomControlPosition: {
        top: '260px',
        right: '10px'
      },
    })
  
    const myGeoObject = new ymaps.Placemark([55.758471, 37.601514], {}, {
      iconLayout: 'default#image',
      iconImageHref: 'img/map-marker.svg',
      iconImageSize: [20, 20],
      iconImageOffset: [-10, -10]
    }, {
    });
    myMap.geoObjects.add(myGeoObject);
  
    myMap.behaviors.disable('scrollZoom')
  }
}

