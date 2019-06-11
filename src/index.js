console.log('%c HI', 'color: firebrick')


document.addEventListener('DOMContentLoaded', () => {

	// Deliverable 1
	// imgURL
	const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
	// Selected dog container
	let dogImgContainer = document.querySelector("#dog-image-container");
	// create an image
	function createImage(url) {
		return `<img src=${url} width=200 height=200>`
	}
	//fetch
	fetch(imgUrl)
	.then((response) => {
		return response.json()
	}).then((urls) => {
		urls.message.forEach((url) => {
			
			dogImgContainer.innerHTML += createImage(url)
		})
	})

	// Deliverable 2
	// breed url
	const breedUrl = "https://dog.ceo/api/breeds/list/all"
	// select dog breed ul
	const dogBreedsUl = document.querySelector('#dog-breeds')
	// create li
	const liTag = document.createElement('li')
	// fetch
	fetch(breedUrl)
	.then((response) => {
		return response.json()
	}).then((breeds) => {
		let dogBreeds = Object.keys(breeds.message)
		dogBreeds.forEach((breed) => {
			dogBreedsUl.innerHTML += `<li data-info="breed">${breed}</li>`
		})
	})

	// Deliverable 3
	dogBreedsUl.addEventListener("click", function(event){
		event.target.style.backgroundColor = 'blue'
	})


	// Deliverable 4

	// grab the dropdown
	const dropdown = document.querySelector('#breed-dropdown')
	// create an event for the dropdown
	dropdown.addEventListener('change', function(event){
		// console.log the event
		console.log(event.target.value)
		// create a fetch to get the breed info
		return fetch(breedUrl)
		.then((response) => {
			return response.json()
		}).then((breeds) => {
			// turn the message into object keys
			let dogBreeds = Object.keys(breeds.message)
			// filter the dog breeds
			let filter = dogBreeds.filter(filtered => {
				// return the dog breed that starts with the same letter as the value of the event
				return filtered.startsWith(event.target.value)
			})
			// empty the ul
			dogBreedsUl.innerHTML = ""
			// iterate through the filtered dog breeds and add the filtered breed to the ul
			filter.forEach((breed) => {
				dogBreedsUl.innerHTML += `<li data-info="breed">${breed}</li>`
			})
		})
	})
});