setImmediate( () => {
  console.log('Immediate');
});

process.nextTick( () => {
  console.log('NextTick');
});

setTimeout( () => {
  console.log('Timeout');
}, 0);

Promise.resolve().then( () => {
  console.log('Promise');
});
