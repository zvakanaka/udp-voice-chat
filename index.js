const Speaker = require('speaker');
const PORT = 33333;
const HOST = '127.0.0.1';
const {channels, rate} = require('./config.js')

const dgram = require('dgram');
const server = dgram.createSocket('udp4');

server.on('listening', function() {
  const address = server.address();
  console.log('UDP Server listening on ' + address.address + ':' + address.port);
});

const  { Readable } = require('stream')

server.on('message', function(message, remote) {
 
  // Create the Speaker instance
  const speaker = new Speaker({
    channels,
    // bitDepth: 16,
    sampleRate: rate
  });

  const buffer = new Buffer(message)
  const readable = new Readable()
  readable._read = () => {} // _read is required but you can noop it
  readable.push(buffer)
  readable.push(null)
  
  readable.pipe(speaker);
});

server.bind(PORT, HOST);