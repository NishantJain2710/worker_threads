import express from 'express'
import { Worker, isMainThread } from 'worker_threads';

const app = express()

app.get('/',(req, res)=>{
    res.status(200).json({
        message:'server is running'
    })
})

app.get('/worker',(req, res)=>{
    console.log("Main Thread: " + isMainThread);
    const worker = new Worker("./worker.js", { workerData:{ total:0 } });
    worker.on("message", (workerData) => {
        res.status(200).json({
            message:`Result - ${workerData}`
        })
    })
    worker.on('error', (error)=>{
        console.log(error.message)
        res.status(400).json({
            error:error.message
        })
    })

    worker.on('online',()=>{
        console.log('started')
    })
})

app.listen(5000, ()=>{
    console.log("server is running on port 5000");
})