// Item class

class Item{

    static all = []

    constructor({name, description, price, id}){
        this.name = name
        this.description = description
        this.price = price
        this.id = id

        this.element = document.createElement('div')
        this.element.id = `item-${this.id}`
        this.itemList = document.getElementById('item-list')
        this.element.addEventListener('click', this.handleListClick)

        Item.all.push(this)
    }

    handleListClick = (e) => {

        if (e.target.className === "delete"){
            let id = e.target.dataset.id
             deleteItem(id)
        } else if(e.target.className === 'update'){
             let itemId = e.target.dataset.id
             e.target.className = "save"
             e.target.innerText = "Save"
             addUpdateItemFields(itemId)
         } else if(e.target.className === 'save'){
             let itemId = e.target.dataset.id
             e.target.className = "update"
             e.target.innerText = "Update"
             itemsAdapter.sendPatchRequest(itemId)
         }
     }

    attachToDom(){
        this.itemList.append(this.fullRender())
    }

    fullRender(){
        this.element.innerHTML =
        `
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

    updateItemOnDom({price,name,description}){
        // let liItem = document.querySelector(`#item-${item.id} li`)
        this.price = price
        this.description = description
        this.name = name
        this.fullRender()
    }


}