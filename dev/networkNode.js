const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const uuid = require('uuid');
const port = process.argv[2]; // 2nd argv  = port of the command to run networkNode.js - nodemon --watch dev -e js dev/api.js 3001

const nodeAddress = uuid.v1().split('-').join(''); // generate a random string without dashes

const bitcoin = new Blockchain();

app.use(bodyParser.json());   // parse requests with json body
app.use(bodyParser.urlencoded({ extended: false }));    // parse reqs with form body

// Blockchain API Endpoints:
// fetch entire blockchain
app.get('/blockchain', function (req, res) {
  res.send(bitcoin);
});

// create a new transaction
app.post('/transaction', function (req, res) {
  const blockIndex = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
  res.json({ note: `Transaction will be added in block ${blockIndex}` });
});

// mine a new block
app.get('/mine', function (req, res) {
  const lastBlock = bitcoin.getLastBlock();
  const previousBlockHash = lastBlock['hash'];
  const currentBlockData = {    // more data fields could be added here: prj budget, cost, duration, ...
    transactions: bitcoin.pendingTransactions,
    index: lastBlock['index'] + 1
  }
  const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
  const blockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);

  bitcoin.createNewTransaction(12.5, '00', nodeAddress);   // miner reward - like in the real bitcoin as of 2018

  const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);
  res.json({
    note: 'New block mined successfully',
    block: newBlock
  })
});

app.listen(port, () => {
  console.log(`Node listening on port ${port}...`);
});