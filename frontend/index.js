const itemAdapter = new ItemAdapter("http://localhost:3000/items")

function handleFormSubmit(e){
    e.preventDefault()
    const price = document.getElementById('item-price').value
    const description = document.getElementById('item-description').value
    const name = document.getElementById('item-name').value
    const itemForm = document.getElementById('item-form')

    let newItemObj = {
        name,
        description,
        price
    }
    //call on adapter
    itemAdapter.newItem(newItemObj)
    itemForm.reset()
}

function deleteItem(id){
// remove from db
    itemAdapter.deleteItem(id)
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
    const itemForm = document.getElementById('item-form')
    const itemList = document.getElementById('item-list')
    // fetchItems()
    itemAdapter.fetchItems()
    itemForm.addEventListener('submit', handleFormSubmit)
    itemList.addEventListener('click', handleListClick)
})
