const express = require('express')
const fs = require('fs')
const path = require('path');
const http = require('http');
const https = require('https');

require('dotenv').config();

const app = express();

app.use(express.static('build'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

const { HOME, PORT = 80, HTTPS_PORT = 443 } = process.env;

http.createServer({}, app)
  .listen(PORT, function () {
    console.log(`HTTP server listening at http://localhost:${PORT}/`)
  })

const certFiles = {
  key: path.resolve(`${HOME}/server.key`),
  cert: path.resolve(`${HOME}/server.crt`),
};

if (fs.existsSync(certFiles.key) && fs.existsSync(certFiles.cert)) {
  const key = fs.readFileSync(certFiles.key);
  const cert = fs.readFileSync(certFiles.cert);

  https.createServer({ key, cert }, app)
    .listen(HTTPS_PORT, function () {
      console.log(`HTTPS server listening at https://localhost:${HTTPS_PORT}/`)
    })
}

