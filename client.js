const connection = new WebSocket(`ws://${window.location.hostname}:8080`)
const button = document.querySelector("#send")

function showMessage(content, isMine = false)
{
    const chat = document.querySelector("#chat")
    chat.innerHTML +=   `<div class="flex flex-col gap-3 w-full ${isMine ? 'items-end' : ''}">
                            <p class="${isMine ? 'bg-blue-500 rounded-tr-none' : 'bg-gray-500 rounded-tl-none'} 
                            w-max max-w-[10rem] md:max-w-xs p-3 rounded-xl text-xl text-white break-all">${content}</p>
                        </div>`
}

connection.onopen = (event) => 
{
    console.log(event)
    console.log("WebSocket is open now.")
}

connection.onclose = (event) => 
{
    console.log("WebSocket is closed now.")
}

connection.onerror = (event) => 
{
    console.error("WebSocket error observed:", event)
}

connection.addEventListener('message', event => {
    event.data.text().then(showMessage)
})

button.addEventListener("click", (event) => 
{
    const message = document.querySelector("#message")

    if(message.value !== "")
    {
        connection.send(message.value);
        showMessage(message.value, true)
        message.value = ""
    }
})