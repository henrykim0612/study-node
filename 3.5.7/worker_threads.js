const {Worker, isMainThread, parentPort} = require('worker_threads');

if (isMainThread) { // 부모일때
  const worker = new Worker(__filename);
  worker.on('message', message => console.log('From worker', message));
  worker.on('exit', () => console.log('Worker exit'));
  worker.postMessage('Ping');
} else {
  parentPort.on('message', value => {
    console.log('From parent', value);
    parentPort.postMessage('Pong');
    parentPort.close();
  });
}
