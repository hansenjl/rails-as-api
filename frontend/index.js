const itemList = document.getElementById('item-list')
const itemForm = document.getElementById('item-form')
const itemPrice = document.getElementById('item-price')
const itemDescription = document.getElementById('item-description')
const itemName = document.getElementById('item-name')

const itemsAdapter = new ItemsAdapter


function handleFormSubmit(e){
    e.preventDefault()

    let newItemObj = {
        name: itemName.value,
        description: itemDescription.value,
        price: itemPrice.value
    }

    let configObj = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(newItemObj)
    }

    //pessimistic rendering
    fetch('http://localhost:3000/items', configObj)
    .then(res => res.json())
    .then(json => {
        addItemToDom(json.data)
    })

    itemForm.reset()
}

function addUpdateItemFields(itemId){
    let item = document.querySelector(`#item-${itemId} li`)
    let price = item.querySelector('.price').innerText
    let description = item.querySelector('.description').innerText
    let name = item.querySelector('strong').innerText


    let updateForm = `
    <input type="number" value="${price}" name="price" id="update-price-${itemId}" min="0" step=".01">
    <input type="text" name="name" value="${name}" id="update-name-${itemId}">
    <input type="text" name="description" value="${description}" id="update-description-${itemId}">
    `

    let formDiv = document.createElement('div')
    formDiv.id = `update-form-${itemId}`
    formDiv.innerHTML = updateForm
    item.append(formDiv)
}





function deleteItem(id){
// remove from db
    let configObj = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }

    fetch(`http://localhost:3000/items/${id}`, configObj)
    .then(res => res.json())
    .then(json => {
        alert(json.message)
    })


// remove from dom
// optimistic rendering
    let item = document.getElementById(`item-${id}`)
    item.remove()
}




document.addEventListener('DOMContentLoaded', () => {
    itemsAdapter.fetchItems()
    itemForm.addEventListener('submit', handleFormSubmit)
    // itemList.addEventListener('click', handleListClick)
})