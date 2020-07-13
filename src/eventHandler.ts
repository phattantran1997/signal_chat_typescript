import { createRedisClient } from './initRedis'
import { EventEmitter } from 'events'

const event = new EventEmitter
const redis = createRedisClient()

redis.on('message',(channel,message)=>{

     event.emit(channel,message)
})

export const userOnline = (id:string,handler:(data: String)=>void)=>{
    redis.subscribe(id)
    event.addListener(id,handler)
}

export const userOfline = (id:string,handler:(data: String)=>void)=>{
    redis.unsubscribe(id)
    event.removeListener(id,handler)
}