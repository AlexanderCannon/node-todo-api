const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');

// var message = 'I am mr user@ face'
// var hash = SHA256(message).toString();
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

var data = {
  id: 1000
}

var token = jwt.sign(data, 'secretsalt');
console.log(token)

let decoded = jwt.verify(token, 'secretsalt');
console.log(decoded)