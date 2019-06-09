console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

document.addEventListener('DOMContentLoaded', () => {
  let dogImageContainer = document.getElementById('dog-image-container')
  let dogUL = document.getElementById('dog-breeds')
  let dogSelect = document.getElementById('breed-dropdown')

  fetch(imgUrl)
  .then(response => response.json())
  .then(jsonObject => {
    let arrayOfDogURLs = jsonObject.message
    arrayOfDogURLs.forEach(url => {
      dogImageContainer.innerHTML += makeImageTagString(url)
      // dogImageContainer.append(makeImageTagElement(url))
    })
  })

  fetch(breedUrl)
  .then(response => response.json())
  .then(response => {
    let arrayOfBreeds = Object.keys(response.message)
    arrayOfBreeds.forEach((breed) => {
      dogUL.innerHTML += `<li data-info="breed">${breed}</li>`
    })
  })

  dogUlParent = addEventListener('click', (event) => {
    if (event.target.dataset.info === "breed") {
      event.target.style.color = "crimson"
    }
  })

  dogSelect.addEventListener('change', (event) => {
    fetch(breedUrl)
    .then(response => response.json())
    .then(response => {
      let arrayOfBreeds = Object.keys(response.message)

      let filteredArray = arrayOfBreeds.filter(breed => {
        return breed.startsWith(event.target.value)
      })

      dogUL.innerHTML = ""

      filteredArray.forEach((breed) => {
        dogUL.innerHTML += `<li data-info="breed">${breed}</li>`
      })

    })
  })

  // DOMContentLoaded
})

function makeImageTagString(url){
  return `<img src="${url}"/>`
}

// function makeImageTagElement(url){
//   let imageTag = document.createElement("img")
//   imageTag.src = url
//   return imageTag
// }
