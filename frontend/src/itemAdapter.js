class ItemAdapter{
    constructor(baseurl){
        this.baseurl = baseurl
    }

    fetchItems(){
        fetch(this.baseurl)
            .then(res => res.json())
            .then(resObj => {
                resObj.data.forEach((item) => this.sanitizeAndAddItem(item))
            })
    }

    deleteItem(id){
        let configObj = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        }

        fetch(`http://localhost:3000/items/${id}`, configObj)
            .then(res => res.json())
            .then(json => alert(json.message))

       
    }

    sendPatchRequest(itemId){
        const price = document.getElementById(`update-price-${itemId}`).value
        const description = document.getElementById(`update-description-${itemId}`).value
        const name = document.getElementById(`update-name-${itemId}`).value


        let itemObj = {
            name,
            description,
            price
        }

        let configObj = {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json"
            },
            body: JSON.stringify(itemObj)
        }

        fetch(`http://localhost:3000/items/${itemId}`, configObj)
        .then(res => res.json())
        .then(response => this.updateDom(response.data))
        // remove form
        const form = document.getElementById(`update-form-${itemId}`)
        form.remove()

    }

    updateDom(itemData){
        const item = Item.findById(itemData.id)
        item.name = itemData.attributes.name
        item.description = itemData.attributes.description
        item.price = itemData.attributes.price
        item.fullRender()
    }


    newItem(newItemObj){
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
        // .then(res => res.json())
        // .then(json => {
        //     this.sanitizeAndAddItem(json.data)
        // })
    }

    sanitizeAndAddItem(itemObj){
        let sanitized = {...itemObj.attributes, id: itemObj.id }
        let item = new Item(sanitized)
        item.attachToDom()
    }
}