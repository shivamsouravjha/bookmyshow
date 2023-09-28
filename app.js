const express = require('express');
const https = require('https');
const app = express();
const PORT = 8080;

// Print the NODE_EXTRA_CA_CERTS environment variable
console.log('NODE_EXTRA_CA_CERTS is set to:', process.env.NODE_EXTRA_CA_CERTS);

// Start the server and assign it to the server variable
// const server = app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

app.get('/wiki', (req, res) => {
  https.get('https://catfact.ninja/fact', (externalRes) => {
      let data = '';

      externalRes.on('data', (chunk) => {
          data += chunk;
      });

      externalRes.on('end', () => {
          res.send(data);
      });
  }).on('error', (err) => {
    console.log(err)
      res.status(500).send(err.toString());
  });
});

// Handle SIGINT
process.on('SIGINT', () => {
  console.log('Received SIGINT. Shutting down...');
  server.close(() => {
      console.log('Server closed.');
      process.exit(0);
  });
});

module.exports = app;