//communicate with the backend
// post,patch, delete requests made here

class ItemsAdapter{
    constructor(){
        this.baseUrl = "http://localhost:3000/items"
    }

    // GET
    fetchItems(){
        fetch(this.baseUrl)
        .then(res => res.json())
        .then(json => {
            json.data.forEach((el)=>{
                new Item(el.attributes)
                // item.attachToDom()
            })
            //iterate overthe array
            // for each element, make a new item
            // append that element to the dom
        })
    }

    // UPDATE
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

        fetch(this.baseUrl + `/${itemId}`, configObj)
        .then(res => res.json())
        .then(response => {
            let item = Item.all.find((i) => i.id === response.data.attributes.id )
            item.updateItemOnDom(response.data.attributes)

        })
        // remove form

        let form = document.getElementById(`update-form-${itemId}`)
        form.remove()
    }

    // CREATE
    createItem(e){
        e.preventDefault()


        const price = document.getElementById('item-price').value
        const description = document.getElementById('item-description').value
        const name = document.getElementById('item-name').value

        let newItemObj = {
            name,
            description,
            price
        }

        let configObj = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(newItemObj)
        }

        //pessimistic rendering (we don't attach to DOM until we get a response back)
        fetch('http://localhost:3000/items', configObj)
            .then(res => res.json())
            .then(json => {
                let item = new Item(json.data.attributes)
                item.attachToDom()
            })
        itemForm.reset()
        const newForm = document.getElementById('new-form-container')
        newForm.hidden = true
        const newFormBtn = document.getElementById('new-form-btn')
        newFormBtn.hidden = false

    }

    // DELETE
    deleteItem(id){
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
    }

}