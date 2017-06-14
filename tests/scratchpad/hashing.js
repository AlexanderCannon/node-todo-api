// const { SHA256 } = require('crypto-js');
// const jwt = require('jsonwebtoken');

// var message = 'I am mr user@ face'
// var hash = SHA256(message).toString();
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
//   id: 1000
// }

// var token = jwt.sign(data, 'secretsalt');
// console.log(token)

// let decoded = jwt.verify(token, 'secretsalt');
// console.log(decoded)

const bcrypt = require('bcryptjs')

const password = 'SupahSecret1!';
bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash);
  });
});

const hashedPassword = "$2a$10$R4rilLcI0iALHb8KSV/jreKKfd11HB3HTtbmYnYTg2HFS4vBI9CtW";
bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});
