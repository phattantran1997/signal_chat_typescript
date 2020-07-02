import WebSocket from 'ws';
import fetch from 'node-fetch'
import { resolve } from 'path';


let mapuser = new Map<string, WebSocket>();

export function handleSignal(ws: WebSocket, id: string) {
  if (!mapuser.has(id)) {
    mapuser.set(id, ws);
  }
  ws.on("message", function (event: WebSocket.Data) {

    let obj_to = JSON.parse("" + event)
    if (obj_to.to.toString() !== id && mapuser.has(obj_to.to.toString())) {
      try {
        //recived
        let received = {from:id, message: obj_to.message}
        mapuser.get(obj_to.to.toString()).send(JSON.stringify(received))
      } catch (error) { }
    }


  });
  ws.on("close", function (event: WebSocket.Data) {

    mapuser.delete(id)

  });
  ws.on("ping", (evt : WebSocket)=>{
    console.log("ping")
  })
}

