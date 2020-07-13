import http, { IncomingMessage } from 'http'
import { Socket } from 'net';
import url from 'url'
import querystring from 'querystring'
import wsSignal from "./wsEndpoint"
import express, { Request, Response } from 'express'
// import historychat from "./handleSignal";

const app = express()
const server = http.createServer(app)
const PORT = process.env.PORT || 8080
server.on(
    'upgrade',
    (request: IncomingMessage, socket: Socket, head: Buffer) => {
        const query = { ...querystring.parse(url.parse(request.url).query) }
        wsSignal.handleUpgrade(request, socket, head, function done(ws) {
            wsSignal.emit('connection', ws, query);
        });
    });


// app.get('/chat/:id', function (req: Request, res: Response) {
//     let id = req.params.id
//     const result = historychat.filter(item => (item.from !== id && item.to === id));
//     res.json(result) //res.json = res.send
// })

server.listen(PORT, function () {
    console.log((new Date()) + " Server started on port "
        + PORT);
});

// app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))
