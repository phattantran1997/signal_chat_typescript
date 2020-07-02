import event from "events"
import { SrvRecord } from "dns";




let ev = new event.EventEmitter()

ev.on('clicked', function(a:number){
    console.log('Something is clicked!'+ a);
})

ev.on('clicked', function(b:string){
    console.log('Something is clicked!'+b);
})

//ev.removeAllListeners('clicked');


ev.once("event2", data => {
    console.log("event2 once", data)
})
ev.on("event2", data => {
    console.log("event2 with data", data)
})

ev.emit("clicked", 2)
