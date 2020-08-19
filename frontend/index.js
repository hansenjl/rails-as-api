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
    




document.addEventListener('DOMContentLoaded', () => {
    const itemForm = document.getElementById('item-form')
    // const itemList = document.getElementById('item-list')
    // fetchItems()
    itemAdapter.fetchItems()
    itemForm.addEventListener('submit', handleFormSubmit)

})
