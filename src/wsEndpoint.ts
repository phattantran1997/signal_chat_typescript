//import { handleLiveConnection } from './handleLiveStatus';
import { handleSignal } from './handleSignal';
import WebSocket from "ws"
import { isDate } from 'util';
 
export const websocket = new WebSocket.Server({ noServer: true });


websocket.addListener(
    'connection',(/**@type {WebSocket} */ ws,query)=> {
        let id  = query.id;
        handleSignal(ws,id);
    }
);

export default websocket;
