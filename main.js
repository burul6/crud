
const addBtnEl = document.querySelector('#new-toy-btn')
const toyFormContainerEl = document.querySelector('.container')
const toyFormEl = document.querySelector('.add-toy-form')

const toyCollectionEl = document.querySelector('#toy-collection')

const toyNameInput = document.querySelector('input[name=name]')
const toyAboutInput = document.querySelector('input[name=about]')
const toyImageInput = document.querySelector('input[name=image]')

let addToy = false


const apiURL = 'http://localhost:8000/toys'


addBtnEl.addEventListener('click', () => {
  addToy = !addToy
  if (addToy) {
  
    toyFormContainerEl.style.display = 'block'
  } else {
    
    toyFormContainerEl.style.display = 'none'
  }
})

const fetchToys = () => {
  return fetch(apiURL)
    .then(response => response.json())
    .then(renderAllToys)
}

const renderAllToys = toys => {
  toys.forEach(renderSingleToy)

}

const renderSingleToy = toy => {
  const toyEl = document.createElement('div')
  toyEl.className = 'card'
  toyEl.dataset.id= toy.id
  toyEl.innerHTML = `
      <h2 class="card-title">${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar" width="175px" height="192px"/>
      <h6>${toy.about}</h6>
      <p>${toy.likes} Likes </p>
      <button class="like-btn heart"></button>
      <button class="delete-btn" data-id="${toy.id}" style='display:inline;' >Delete</button>`

  toyEl.querySelector('.like-btn').addEventListener('click', handleToyLike)
  toyEl.querySelector('.delete-btn').addEventListener('click', handleToyDelete)
  toyCollectionEl.appendChild(toyEl)
}

const handleNewToySubmit = event => {
  event.preventDefault()

  fetch(apiURL, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body:JSON.stringify({
      "name": toyNameInput.value,
      "image": toyImageInput.value,
      "about": toyAboutInput.value,
      "likes": 0
    })
  })
  .then(response => response.json())
  .then(newToy => {
    renderSingleToy(newToy)
    toyFormEl.reset()
  })
}
toyFormEl.addEventListener('submit', handleNewToySubmit)


const handleToyLike = event => {
  const toyCardEl = event.target.parentElement
  const toyId = toyCardEl.dataset.id

  const likesText = toyCardEl.querySelector('p').innerText
  let likesNr = parseInt(likesText)
  likesNr++

  fetch(`${apiURL}/${toyId}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body:JSON.stringify({
      "likes": likesNr
    })
  })
  .then(response => response.json())
  .then(toy => {
    toyCardEl.querySelector('p').innerText = `${toy.likes} Likes`
  })
}

const handleToyDelete = (event) => {
  const confirmDelete = confirm('Вы действительно хотите удалить этого студента?')
  if(!confirmDelete) return
  const toyId = event.target.dataset.id

  fetch(`${apiURL}/${toyId}`, {
    method: 'DELETE'
  })
  .then(res => res.json())
  .then(toy => {
    event.target.parentElement.remove()
  })
}

fetchToys()


