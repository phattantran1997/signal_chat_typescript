import { createRedisClient } from './initRedis'
import { EventEmitter } from 'events'

const redis = createRedisClient()
const event = new EventEmitter()

redis.on("message",(channel,data) => {
    event.emit(channel,data)
})


// const subscribe = (id : string) => redis.subscribe(id) 
// const unsubscribe = (id: string) => redis.unsubscribe(id) 

export const registerUser = (id : string, handler : (e: string) => void) => {
    redis.subscribe(id) 
    event.on(id,handler)
}

export const unRegisterUser = (id : string, handler : () => void) => {
    redis.unsubscribe(id) 
    event.off(id,handler)
}

export const subscribeUser = (id: string, handler) : Function => {
    registerUser(id, handler)

    return () => unRegisterUser(id, handler)
}

// event.on('subcrise',(id)=>{
//     console.log("subcrise on "+ id)
//     redis.subscribe(id)

// })
// // event.addListener('message',(mapuser,history)=>{
// //     let handler =  function (channel, message) {
// //         console.log(channel + message.toString())
// //         let received = JSON.parse(message.toString())
// //         mapuser.get(received.to.toString()).send(JSON.stringify(received))
// //         //history.push(received);
// //     }
// //     redis.on("message",handler)
// //     // redis.off("message",handler)
// // })
// event.on('unsubcrise',(id)=>{
//     console.log("unsubcrise on "+ id)
//     redis.unsubscribe("subcrise"+id)
// })
// export function userOnline(id,handler){
//     redis.on(id,handler)
// }
// export function userOfline(id,handler){
//     redis.off(id,handler)
// }