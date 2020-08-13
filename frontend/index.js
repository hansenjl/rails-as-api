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
    </div>`
}


document.addEventListener('DOMContentLoaded', () => {
    fetchItems()
})
