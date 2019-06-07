console.log('%c WOOF WOOF', 'color: firebrick')

document.addEventListener("DOMContentLoaded", function(){

  const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
  const breedUrl = 'https://dog.ceo/api/breeds/list/all'

  let dogUl = document.querySelector("#dog-breeds")

// #1
  fetch(imgUrl)
  .then(response => response.json())
  .then(handleDogImages)

  function handleDogImages(jsonObject){
    console.log("promises promises"); //
    console.log(jsonObject.message); //
      let dogImageContainer = document.getElementById('dog-image-container')
      let dogsArrayUrls = jsonObject.message
         console.log("variable of doggie image url array");
         console.log(dogsArrayUrls);
         dogsArrayUrls.forEach(url => {
           dogImageContainer.innerHTML += makeImageTagString(url)
         }) //
  }

  function makeImageTagString(url) {
    return `<img src="${url}"/>`
  }

// #2
  fetch(breedUrl)
  .then(response => response.json())
  .then(response => {
    let dogBreedsArray = Object.keys(response.message)
    dogBreedsArray.forEach((breed) => {
      dogUl.innerHTML += `<li data-info="breed">${breed}</li>`

    })
    console.log("getting the list of dog breeds from fetch done and fed to the li AND adding dataset so #3 works"); //
    console.log(response); //
  })
  // .then(handleBreedData)

// #3 Change color
dogUl.addEventListener("click", function(event){
  if (event.target.dataset.info === "breed") {
  event.target.style.color = "purple"
  }
})


// #4
  let dogSelect = document.getElementById('breed-dropdown')
  dogSelect.addEventListener("change", (event) => {
    makeFetchHappen()
    .then(res => {
      let dogBreedsArray = Object.keys(res.message)
console.log("here are the object keys for breed list"); // 
      let filteredArray = dogBreedsArray.filter(breed => {
        return breed.startsWith(event.target.value)
      })

      dogUl.innerHTML = ""

      filteredArray.forEach(addLI)


    })
  })

  console.log("DOM is Loaded")
});

// Things for #4
function makeFetchHappen(){
  return fetch("https://dog.ceo/api/breeds/list/all")
  .then(response => response.json())
}

function addLI(breed){
  let dogUl = document.querySelector("#dog-breeds")
  dogUl.innerHTML += `<li data-info="breed">${breed}!</li>`
}
