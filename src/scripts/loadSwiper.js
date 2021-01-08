import {addEllipsis} from './addEllipsis.js'

export function loadSwiper({gallerySwiper, issuesSwiper, partnersSwiper, eventsSwiper}) {
  const clientHeight = document.documentElement.clientHeight
  const galleryHeight = gallerySwiper.getBoundingClientRect().top
  
  if (clientHeight - galleryHeight > 0) {
    load()
    return true
  }

  function load() {
    import('swiper').then(({Swiper, Navigation, Pagination }) => {

      const swiperOptionsGallery = {
        loop: false,
        slidesPerView: 1,
        slidesPerColumn: 1,
        slidesPerGroup: 1,
        spaceBetween: 0,
        slidesPerColumnFill: `row`,
        navigation: {
          nextEl: '.gallery__btn_next',
          prevEl: '.gallery__btn_prev',
        },
        pagination: {
          el: '.gallery__pagination',
          type: 'fraction',
        },
        breakpoints: {
          324: {
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerGroup: 1,
            spaceBetween: 0,
          },
          576: {
            slidesPerView: 2,
            slidesPerColumn: 2,
            slidesPerGroup: 2,
            spaceBetween: 34,
          },
          768: {
            slidesPerView: 2,
            slidesPerColumn: 2,
            slidesPerGroup: 2,
            spaceBetween: 34,
          },
          1028: {
            slidesPerView: 3,
            slidesPerColumn: 2,
            slidesPerGroup: 3,
            spaceBetween: 34,
          },
          1400: {
            slidesPerView: 3,
            slidesPerColumn: 2,
            slidesPerGroup: 3,
            spaceBetween: 50,
          },
        },
        on: {
          imagesReady: function(){
            gallerySwiper.style.opacity = 1
          },
          breakpoint: function() {
            //refresh margin-top to fix multirow swiper bug when changing slidesPerGroup on breakpoints
            document.querySelectorAll('.gallery__swiper-container .swiper-slide').forEach(item => {
              item.style.setProperty(`margin-top`, `0`)
            })
          }
        }
      }
  
      const swiperOptionsIssues = {
        loop: true,
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 34,
        slidesPerColumnFill: `row`,
        navigation: {
          nextEl: '.issues__btn_next',
          prevEl: '.issues__btn_prev',
        },
        pagination: {
          el: '.issues__pagination',
          type: 'fraction',
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
            slidesPerGroup:2,
            spaceBetween: 34
          },
          940: {
            slidesPerView: 2,
            slidesPerGroup:2,
            spaceBetween: 50
          },
          1400: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 50
          },
        },
        on: {
          imagesReady: function() {
            issuesSwiper.style.opacity = 1
          }
        }
      }
  
      const swiperOptionsPartners = {
        loop: true,
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 50,
        navigation: {
          nextEl: '.partners__btn_next',
          prevEl: '.partners__btn_prev',
        },
        breakpoints: {
          680: {
            slidesPerView: 2,
            slidesPerGroup:2,
            spaceBetween: 34
          },
          769: {
            slidesPerView: 2,
            slidesPerGroup:2,
            spaceBetween: 50
          },
          1400: {
            slidesPerView: 3,
            slidesPerGroup:3,
            spaceBetween: 50
          },
        },
        on: {
          imagesReady: function(){
            partnersSwiper.style.opacity = 1
            addEllipsis()
          }
        }
      }
  
      const swiperOptionsEvents = {
        loop: true,
        slidesPerView: 1,
        slidesPerGroup:1,
        spaceBetween: 0,
        pagination: {
          el: '.events__pagination',
          type: 'bullets',
          clickable: true,
        },
        on: {
          imagesReady: function(){
            eventsSwiper.style.opacity = 1
          }
        }
      }
  
  
      Swiper.use([Navigation, Pagination ])
      
      const swiperGallery = new Swiper('.gallery__swiper-container', swiperOptionsGallery)
      // const swiperIssues = new Swiper('.issues__swiper-container', swiperOptionsIssues)
      const swiperPartners = new Swiper('.partners__swiper-container', swiperOptionsPartners)
  
      import(`./createDestroyEventsSwiper.js`).then(({createDestroyEventsSwiper}) => {
        createDestroyEventsSwiper({Swiper, swiperOptionsEvents})
      })
  
      import(`./createDestroyIssuesSwiper.js`).then(({createDestroyIssuesSwiper}) => {
        createDestroyIssuesSwiper({Swiper, swiperOptionsIssues})
      })
    })
  }
}