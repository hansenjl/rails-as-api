const itemsAdapter = new ItemsAdapter
const categoriesAdapter = new CategoriesAdapter
const itemForm = document.getElementById('item-form')
let currentCategory

function hideBtnLoadForm(e){
    debugger
    e.target.hidden = true
    const newForm = document.getElementById('new-form-container')
    newForm.hidden = false
}

document.addEventListener('DOMContentLoaded', () => {
    categoriesAdapter.fetchCategories()
    itemsAdapter.fetchItems()
    itemForm.addEventListener('submit', itemsAdapter.createItem)
    const newFormBtn = document.getElementById('new-form-btn')
    newFormBtn.addEventListener('click', hideBtnLoadForm)
    // itemList.addEventListener('click', handleListClick)
})