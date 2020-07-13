//import { handleLiveConnection } from './handleLiveStatus';
import { handleSignal } from './handleSignal_same_port';
import WebSocket from "ws"
// import {event,userOnline} from "./publish_chat"

export const websocket = new WebSocket.Server({ noServer: true });


websocket.addListener(
    'connection',(/**@type {WebSocket} */ ws,query)=> {
        let user  = query.id
        let groupchat = query.group
        handleSignal(ws,user,groupchat)
    }
);

export default websocket;
