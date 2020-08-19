//communicate with the backend
// post,patch, delete requests actually made

class ItemsAdapter{
    constructor(){
        this.baseUrl = "http://localhost:3000/items"
    }

    fetchItems(){
        fetch(this.baseUrl)
        .then(res => res.json())
        .then(json => {
            json.data.forEach((el)=>{
                let item = new Item(el.attributes)
                item.attachToDom()
            })
            //iterate overthe array
            // for each element, make a new item
            // append that element to the dom
        })
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
}