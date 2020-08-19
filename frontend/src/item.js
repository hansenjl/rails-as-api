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

        Item.all.push(this)
    }

    attachToDom(){
        const itemList = document.getElementById('item-list')
        itemList.innerHTML += this.fullRender()
    }

    fullRender(){
        return this.element.innerHTML = `
            <li>
            $<span class="price">${this.price}</span>
            <strong class="name">${this.name}</strong>:
            <span class="description">${this.description}</span>
            </li>
            <button class="delete" data-id="${this.id}">Delete</button>
        `
    }
}


