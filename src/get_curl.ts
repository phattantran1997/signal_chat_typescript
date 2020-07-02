import fetch from 'node-fetch'
import { appendFile } from 'fs';
import axios from 'axios'

async function foo() {
    const p1 = new Promise((resolve) => setTimeout(() => resolve('1'), 1000))
    const p2 = new Promise((_,reject) => setTimeout(() => reject('2'), 500))   
    const results = Promise.all([await p1, await p2]) // Do not do this! Use Promise.all or Promise.allSettled instead.
 }
 foo().catch(()=> {})