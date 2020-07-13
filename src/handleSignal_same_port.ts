import WebSocket from 'ws';



let listGroup = new Map<String, Map<String, WebSocket>>();

export function handleSignal(ws: WebSocket, id_User: string, id_GroupChat: string) {
  function notification(on_off:String) {
    for (let [key] of listGroup.get(id_GroupChat)) {
      listGroup.get(id_GroupChat).get(key).send(id_User + on_off)
    }
  }

  function useronline(){
    if (!listGroup.has(id_GroupChat)) {
      let listuser = new Map<String, WebSocket>();
     listGroup.set(id_GroupChat, listuser).get(id_GroupChat).set(id_User, ws)
    //  listGroup.get(id_GroupChat).set(id_User, ws)
    }
    else {
      if (!listGroup.get(id_GroupChat).has(id_User)) {
        notification("online")
        listGroup.get(id_GroupChat).set(id_User, ws)
      }
    }
  }

  useronline()
  ws.on("message", function (event: WebSocket.Data) {
    let objGroupChat =listGroup.get(id_GroupChat)
    let {to,message} = JSON.parse(String(event))
    try{
      objGroupChat.get(to).send(JSON.stringify({ from :id_User, to, message }))
    }
    catch(err){
      objGroupChat.get(id_User).send("Cannot send!!!")
    }
   
  });

  ws.on("close", function (ws: WebSocket) {
    if (listGroup.get(id_GroupChat).size ==1){
      listGroup.delete(id_GroupChat)
    }
    else{
      listGroup.get(id_GroupChat).delete(id_User)
      notification("offline")
    }
    
  });
}

