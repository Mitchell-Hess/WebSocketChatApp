const { stringify } = require('css');
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => 
{
    ws.on('message', (data) => 
    {
        [...wss.clients]
            .filter(client => client !== ws)
            .forEach(client => client.send(data))
    })
})
