const itemAdapter = new ItemAdapter("http://localhost:3000/items")
const webSocketUrl = 'ws://localhost:3000/cable'

function createGameWebSocketConn(){
    socket = new WebSocket(webSocketUrl)

    socket.onopen = function(event) {
      console.log('WebSocket Connected')

      const msg = {
        command: 'subscribe',
        identifier: JSON.stringify({
          channel: 'ItemChannel'
          // game: `game_${gameId}`
        })
      }

      // sending the subscribe command
      socket.send(JSON.stringify(msg))
    }

    socket.onclose = function(event){
      console.log('websocket closed')
    }

    socket.onmessage = function(event) {

      const response = event.data
      const msg = JSON.parse(response)
    //   Ignores pings
      if(msg.type == 'ping'){
        return
      }
      console.log("FROM RAILS: ", msg);
      if (msg.message){
            if (msg.message.message === "create"){
                const item = new Item(msg.message.item)
                item.attachToDom()
            } else if (msg.message.message === "update"){
                const item = Item.findById(msg.message.item.id.toString())
                debugger
                item.updateAttributes(msg.message.item)
                item.fullRender()
            }

      }
    }
    // When an error occurs through the websocket connection, this code is run printing the error message.
    socket.onerror = function(error) {
      console.log('WebSocket Error: ' + error);
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
    itemAdapter.fetchItems()
    itemForm.addEventListener('submit', handleFormSubmit)
    createGameWebSocketConn()
})
