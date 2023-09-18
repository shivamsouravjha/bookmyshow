const https = require('https');
const fs = require('fs');

// const options = {
//   rejectUnauthorized: true,
//   ca: [fs.readFileSync('ca-cert.pem')],
// };

https.get('https://localhost:8000/', (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log(data);
  });

}).on('error', (e) => {
  console.error(e);
});
