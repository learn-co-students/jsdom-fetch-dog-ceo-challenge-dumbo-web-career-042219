console.log('%c HI', 'color: firebrick')
document.addEventListener('DOMContentLoaded', () => {
  const imgUrl = 'https://dog.ceo/api/breeds/image/random/4'
  const breedUrl = 'https://dog.ceo/api/breeds/list/all'
  const divTag = document.querySelector("#dog-image-container")
  const ulTag = document.querySelector("#dog-breeds")
  const selectTag = document.querySelector("#breed-dropdown")

  const fontColor = {
    "red":"",
    "":"red"
  }

  fetch(imgUrl)
  .then(resp => resp.json())
  .then(images => {
    images.message.forEach(img => {
      divTag.innerHTML += `<img src="${img}" />`
    })
  })

  fetch(breedUrl)
  .then(resp => resp.json())
  .then(dogs => {
    let list = Object.keys(dogs.message)
    list.forEach(dog => {
      ulTag.innerHTML += `<li> ${dog} </li>`
    })
  })

  ulTag.addEventListener('click', (e) => {
    if(e.target.tagName === "LI") {
      e.target.style.color = fontColor[e.target.style.color]
    }
  })
//For IE support, attachEvent 'onchange'?
  selectTag.addEventListener('change', (e) => {
    let filterLetter = e.target.value
    ulTag.innerHTML = ""
    fetch(breedUrl)
    .then(resp => resp.json())
    .then(dogs => {
      let list = Object.keys(dogs.message)
      list.forEach(dog => {
        if(dog.startsWith(filterLetter)) {
          ulTag.innerHTML += `<li> ${dog} </li>`
        }
      })
    })
// Or you could do it this way
    // .then(dogs => {
    //   let list = Object.keys(dogs.message)
    //   let filteredDogs = list.filter(dog => dog.startsWith(filterLetter))
    //   filteredDogs.forEach(dog => {
    //     ulTag.innerHTML += `<li> ${dog} </li>`
    //   })
    // })
  })

})
