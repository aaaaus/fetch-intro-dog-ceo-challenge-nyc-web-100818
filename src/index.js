console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', () => {

  let allBreeds = []

  const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
  const breedUrl = "https://dog.ceo/api/breeds/list/all"

  //DOM nodes

  const dogDiv = document.querySelector('#dog-image-container') //selects the div with the id of dog-image-container
  const breedDiv = document.querySelector('#dog-breeds') //selects the ul with ID of dog-breeds
  const dropdown = document.querySelector('#breed-dropdown')


  fetch(imgUrl, { method: 'GET' })
    .then( responseObject => {
      return responseObject.json();
    })
    .then( dogImgData => {
      dogImgData.message.forEach( dogUrl => {
        dogDiv.innerHTML += `<img src="${dogUrl}"><br>`
      })
    })

  fetch(breedUrl, { method: 'GET' })
    .then( responseObject => {
      return responseObject.json();
    })
    .then( dogList => {
      allBreeds = Object.keys(dogList.message)

      breedDiv.innerHTML = allBreeds.map( (breed) => {
         return `<li>${breed}</li>`
       }).join("")

    })

  breedDiv.addEventListener('click', (event) => {
    // console.log(event.target);
    if (event.target.tagName === "LI") {
      event.target.style.color = "red";
    }
  })

  dropdown.addEventListener('change', (event) => {
    console.log(event.target.value)
    let startingLetter = event.target.value
    let filteredBreeds = allBreeds.filter( (breed) => {
      return breed.startsWith(startingLetter)
    })
    // console.log(filteredBreeds);
    breedDiv.innerHTML = filteredBreeds.map( (breed) => {
       return `<li>${breed}</li>`
     }).join("")
  })



}) //end DOMContentLoaded
