const itemAdapter = new ItemAdapter("http://localhost:3000/items")
const webSocketUrl = 'ws://localhost:3000/cable'

function createWebSocketConn(){
    socket = new WebSocket(webSocketUrl)

    socket.onopen = function(event){
        console.log('Websocket connection opened')

        const configObj = {
            command: 'subscribe',
            identifier: JSON.stringify({
                channel: 'ItemChannel'
            })
        }
        socket.send(JSON.stringify(configObj))
    }

    socket.onclose = function(e){
        console.log('websocket closed')
    }

    socket.onmessage = function(event){

        const response = JSON.parse(event.data)

        // ignore the pings
        if (response.type === 'ping'){
            return
        }
        debugger
        console.log("Websocket response:" , response)
        if(response.message){
            if(response.message.type === 'create'){
                // response.message.item
                // update the dom
                itemAdapter.sanitizeAndAddItem(response.message.item.data)
            }else if(response.message.type === 'destroy'){
                //find item
                let item = Item.findById(response.message.id)
                item.element.remove()
                Item.all = Item.all.filter((i)=> i.id != item.id)
            }
        }





    }
}





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
    createWebSocketConn()
    itemAdapter.fetchItems()
    itemForm.addEventListener('submit', handleFormSubmit)

})
