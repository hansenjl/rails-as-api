const itemList = document.getElementById('item-list')
const itemForm = document.getElementById('item-form')
const itemPrice = document.getElementById('item-price')
const itemDescription = document.getElementById('item-description')
const itemName = document.getElementById('item-name')

function fetchItems(){
    fetch('http://localhost:3000/items')
    .then(res => res.json())
    .then(addItems)
}

function addItems(response){
    response.data.forEach( item => {
        addItemToDom(item)
         })
}

function addItemToDom(item){
    itemList.innerHTML += `
    <div id="item-${item.id}">
        <li>
        $<span class="price">${item.attributes.price}</span>
        <strong class="name">${item.attributes.name}</strong>:
        <span class="description">${item.attributes.description}</span>
        </li>
        <button class="delete" data-id="${item.id}">Delete</button>
    </div>`
}

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

function handleListClick(e){
   if (e.target.className === "delete"){
       let id = e.target.dataset.id
        deleteItem(id)
   }
}


document.addEventListener('DOMContentLoaded', () => {
    fetchItems()
    itemForm.addEventListener('submit', handleFormSubmit)
    itemList.addEventListener('click', handleListClick)
})