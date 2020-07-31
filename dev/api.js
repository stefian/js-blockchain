const express = require('express');
const app = express();

// Blockchain API Endpoints:
// fetch entire blockchain
app.get('/blockchain', function (req, res) {

});

// create a new transaction
app.get('/transaction', function (req, res) {

});

// mine a new block
app.get('/mine', function (req, res) {

});

app.listen(3000, () => {
  console.log('Blockchain API Listening on port 3000...');
});