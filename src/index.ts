// let bagged : number =10;
// class Gold{
//     value:number;
//     weight:number;
// }
// var arr :Gold[][];
// //dummy data
// let goldArray : Gold[] = [{"value":2,"weight":1},
// {"value":6,"weight":3},{"value":7,"weight":5},{"value":1,"weight":4},
// {"value":3,"weight":8}];
// for(let i=0; i<goldArray.length-1;i++){
//     let temp:number = goldArray[i].weight;
//     for(let j=i;j<goldArray.length;j++){
//         // tempvar += goldArray[j].weight;

//         if(goldArray[j].weight<bagged){
//            arr[i].push();
//         }

//     }
// }
// function groupvalue(obj : Gold) {

//     return;
// }

import http, { IncomingMessage } from 'http'
import { Socket } from 'net';
import url from 'url'
import querystring from 'querystring'
import wsSignal from "./wsEndpoint"


const server = http.createServer()
const PORT = process.env.PORT || 8080


server.on(
    'upgrade',
    (request: IncomingMessage, socket: Socket, head: Buffer) => {
        
        const query = { ...querystring.parse(url.parse(request.url).query) }
        
        wsSignal.handleUpgrade(request, socket, head, function done(ws) {
            wsSignal.emit('connection', ws,query);
        });
    });

server.listen(PORT, function() {
    console.log((new Date()) + " Server started on port "
        + PORT);
  });
