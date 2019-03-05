var fs = require('fs');
fs.writeFile('message.txt', 'Hello Node',
  function (err) {
    if (err) throw err;
    console.log('It\'s saved!');
  }
);

const https = require('http');
https.get('http://localhost:8082/info/paracetamol', (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(JSON.parse(data).explanation);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});