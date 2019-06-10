console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', (event) => {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
  let imgDiv = document.querySelector('#dog-image-container')
  const breedUrl = 'https://dog.ceo/api/breeds/list/all'
  const ulTag = document.querySelector('#dog-breeds')
  const list = ulTag.querySelectorAll("li")
  const select = document.querySelector('select')

//add random image list to DOM
  fetch(imgUrl)
  .then(res => res.json())
  .then(data => {
    data.message.forEach(image => {
      console.log(image)
      imgDiv.innerHTML += `<img src = "${image}"/>`
    })
  })

//load list of dog breeds
  fetch(breedUrl)
  .then(res => res.json())
  .then(data => {
    let list = Object.keys(data.message)
    // console.log(list)
    list.forEach(dog => {
      ulTag.innerHTML += `<li id = "list"> ${dog} </li>`
    })
  })

//change li tag font color when clicked
  ulTag.addEventListener('click', (e) => {
    let fontColor = {
    "purple":"",
    "":"purple"
    }
      e.target.style.color = fontColor[e.target.style.color]
  })

  //// filter dogs by first letter
  select.addEventListener('change', (e) => {
    let filter = e.target.value
    ulTag.textContent = ""
    fetch(breedUrl)
    .then(res => res.json())
    .then(data => {
      let list = Object.keys(data.message)
      list.forEach(dog => {
        if(dog.startsWith(filter)) {
           ulTag.innerHTML += `<li> ${dog} </li>`
        }
      })
  })
})

})
