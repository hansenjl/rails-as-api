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

        Item.all = Item.all.filter((i)=> i.id !== id)
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
        .then(res => res.json())
        .then(json => {
            this.sanitizeAndAddItem(json.data)
        })

    }

    sanitizeAndAddItem(itemObj){
        let sanitized = {...itemObj.attributes, id: itemObj.id }
        let item = new Item(sanitized)
        item.attachToDom()
    }
}