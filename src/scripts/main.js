import './scrollEvent.js'
import './handleBurger&Nav.js'
import './expandSearch.js'
// import './generateIndex'
import './search'
import './scrollToSearch'
import './customScroll.js'
import './highlightSearch.js'
import './changeHeroBg.js'
import './subscribeBtn.js'
import './loadChoices.js'
import './toggleActiveChoices.js'
import './switchCatalog.js'
import './wikiRequests.js'
import './addEllipsis.js'
import './createDestroyEventsSwiper.js'
import './showAllEvents.js'
import './handleCheckboxes.js'
import './handleDropdown.js'
import './createCategoriesColumns.js'
import './fullscreenImage.js'

import '../styles/main.scss'

document.body.onsubmit = (e) => {
  e.preventDefault()
}

$(`a`).on(`click`, function(e) {
  e.preventDefault()
})

// document.body.contentEditable = true