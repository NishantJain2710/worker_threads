import { workerData, parentPort, isMainThread } from 'worker_threads';

console.log(isMainThread);

let total = workerData.total;


for(let i=0; i<1e9; i++){
    total++;
}

parentPort.postMessage(total);