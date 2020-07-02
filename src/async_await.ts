import fetch from 'node-fetch'
import { appendFile } from 'fs';
import axios from 'axios'

function resolveAfter2Seconds() {
    console.log("starting slow promise")
    return new Promise(resolve => {
        setTimeout(function () {
            resolve("slow")
            console.log("slow promise is done")
        }, 5000)
    })
}

function resolveAfter1Second() {
    console.log("starting fast promise")
    return new Promise(resolve => {
        setTimeout(function () {
            resolve("fast")
            console.log("fast promise is done")
        }, 1000)
    })
}
async function run() {
    const slow = await resolveAfter2Seconds()
    console.log(slow)
    const fast = await resolveAfter1Second()
    console.log(fast)
}

async function concurrentStart() {
    console.log('==CONCURRENT START with await==');
    const slow = resolveAfter2Seconds() // starts timer immediately
    const fast = resolveAfter1Second() // starts timer immediately

    // 1. Execution gets here almost instantly
    console.log(await slow) // 2. this runs 2 seconds after 1.
    console.log(await fast) // 3. this runs 2 seconds after 1., immediately after 2., since fast is already resolved
}
// concurrentStart()
function concurrentPromise() {
    console.log('==CONCURRENT START with Promise.all==')
    return Promise.all([resolveAfter2Seconds(), resolveAfter1Second()]).then((messages) => {
        console.log(messages[0]) // slow
        console.log(messages[1]) // fast
    })
}
//   concurrentPromise()

async function parallel() {
    console.log('==PARALLEL with await Promise.all==')

    // Start 2 "jobs" in parallel and wait for both of them to complete
    await Promise.all([
        (async () => console.log(await resolveAfter2Seconds()))(),
        (async () => console.log(await resolveAfter1Second()))()
    ])
}
//   parallel()
const promise1 = Promise.resolve(1);
const promise2 = new Promise((resolve, reject) => {
    setTimeout(resolve, 2000, '2');
  });
const promise3 = new Promise((resolve, reject) => {
    setTimeout(()=>{
        resolve('3')
    }, 100);
});

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});