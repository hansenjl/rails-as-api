class Item {
    static all = []

    constructor({id,price,name,description, categoryId}){
        this.id = id
        this.price = price
        this.name = name
        this.description = description
        this.categoryId = categoryId

        this.element = document.createElement('div')
        this.element.id = `item-${this.id}`
        this.itemList = document.getElementById('item-list')
        this.element.addEventListener('click', (e) => this.handleClick(e))

        Item.all.push(this)
    }

    static findById(id){
        return Item.all.find((item) => item.id === id)
    }

    handleClick = (e)=> {
        if (e.target.className === "delete"){
            let id = e.target.dataset.id
            this.element.remove()
            itemAdapter.deleteItem(id)
        } else if(e.target.className === 'update'){
            // let itemId = e.target.dataset.id
            e.target.className = "save"
            e.target.innerText = "Save"
            this.addUpdateItemFields()
        } else if(e.target.className === 'save'){

            let itemId = e.target.dataset.id
            e.target.className = "update"
            e.target.innerText = "Update"
            itemAdapter.sendPatchRequest(itemId)
        }
    }

    addUpdateItemFields = () => {
        // let item = document.querySelector(`#item-${itemId} li`)
        // let price = item.querySelector('.price').innerText
        // let description = item.querySelector('.description').innerText
        // let name = item.querySelector('strong').innerText

        let updateForm = `
        <input type="number" value="${this.price}" name="price" id="update-price-${this.id}" min="0" step=".01">
        <input type="text" name="name" value="${this.name}" id="update-name-${this.id}">
        <input type="text" name="description" value="${this.description}" id="update-description-${this.id}">
        `

        let formDiv = document.createElement('div')
        formDiv.id = `update-form-${this.id}`
        formDiv.innerHTML = updateForm
        this.element.querySelector('li').append(formDiv)
    }

    attachToDom(){
        this.itemList.append(this.fullRender())
    }

    fullRender(){
        this.element.innerHTML = `
            <li>
            $<span class="price">${this.price}</span>
            <strong class="name">${this.name}</strong>:
            <span class="description">${this.description}</span>
            </li>
            <button class="delete" data-id="${this.id}">Delete</button>
            <button class="update" data-id="${this.id}">Update</button>
        `
        return this.element
    }
}


