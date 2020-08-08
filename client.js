const dgram = require('dgram');
const mic = require('mic');
const PORT = 33333;
const HOST = '127.0.0.1';
const {channels, rate} = require('./config.js')


const micInstance = mic({
  rate,
  channels,
  debug: true,
  device: 'hw:0,0'
});

const micInputStream = micInstance.getAudioStream();
micInputStream.on('data', function(buffer) {
  const client = dgram.createSocket('udp4');
  client.send(buffer, 0, buffer.length, PORT, HOST, function(err, bytes) {
    if (err) throw err;
    client.close();
  });
});
micInputStream.on('error', function(err) {
  console.log('Error in Input Stream: ' + err);
});

micInstance.start();
