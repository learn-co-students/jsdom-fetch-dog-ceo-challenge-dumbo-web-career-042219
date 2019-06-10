console.log('%c HI', 'color: firebrick')

document.addEventListener("DOMContentLoaded", function() {

  let dogContainer = document.getElementById('dog-image-container');
  let ulTag = document.getElementById('dog-breeds')
  let selectTag = document.getElementById('breed-dropdown')

  fetch("https://dog.ceo/api/breeds/image/random/4")
  .then(response => {
    return response.json()
  }).then(jsonObj => {
    let dogsArr = jsonObj.message;
    dogsArr.forEach(url => {
      dogContainer.innerHTML += makeImageTag(url)
    })
  })

  fetch("https://dog.ceo/api/breeds/list/all")
  .then(response => response.json())
  .then(response => {
    let breedsArr = Object.keys(response.message)
    breedsArr.forEach(breed =>{
      ulTag.innerHTML += `<li>${breed}</li>`
    })
  })

  ulTag.addEventListener("click", (e) => {
    if (event.target.tagName === "LI") {
      event.target.style.color = "purple"
    }
  })

  selectTag.addEventListener("change", (e) => {
    fetch("https://dog.ceo/api/breeds/list/all")
    .then(response => response.json())
    .then(response => {
      let breedsArr = Object.keys(response.message)
      let filterArr = breedsArr.filter(breed => {
        return breed.startsWith(e.target.value)
      })
      ulTag.innerHTML = ""
      filterArr.forEach(breed => {
        ulTag.innerHTML += `<li>${breed}</li>`
      })
    })
  })

})


const makeImageTag = (url) => {
  return `<img src="${url}"/>`
}
