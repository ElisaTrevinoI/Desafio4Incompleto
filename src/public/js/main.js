const socket = io()

const formProduct = document.getElementById("idForm")

formProduct.addEventListener('submit', (e) => {
  e.preventDefault()
  const prodsIterator = new FormData(e.target)
  const prod = Object.fromEntries(prodsIterator)
  console.log(prod)
})

//socket.emit('mensaje', "Hola buenos dias")




/*
const form = document.querySelector('form')
form.addEventListener('submit', (e) => {
  e.preventDefault()
  const formData = new FormData(form)
  for (const pair of formData.entries()) {
    console.log(pair)
  }
})*/