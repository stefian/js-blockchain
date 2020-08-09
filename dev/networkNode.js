const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const uuid = require('uuid');
const port = process.argv[2]; // 2nd argv  = port of the command to run networkNode.js - nodemon --watch dev -e js dev/api.js 3001
const rp = require('request-promise');

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
  const newTransaction = req.body;
  const blockIndex = bitcoin.addTransactionToPendingTransactions(newTransaction);
  res.json({ note: `Transaction will be added in block ${blockIndex}.` });
});

// create a new tx and broadcast it to the network
app.post('/transaction/broadcast', function (req, res) {
  const newTransaction = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
  bitcoin.addTransactionToPendingTransactions(newTransaction);

  const requestPromises = [];
  bitcoin.networkNodes.forEach(networkNodeUrl => {
    const requestOptions = {
      uri: networkNodeUrl + '/transaction',
      method: 'POST',
      body: newTransaction,
      json: true
    };

    requestPromises.push(rp(requestOptions));
  });

  Promise.all(requestPromises)
    .then(data => {
      res.json({ note: 'Transaction created and broadcast successfully.' });
    });
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
  // bitcoin.createNewTransaction(12.5, '00', nodeAddress);   // miner reward - like in the real bitcoin as of 2018 - to be broadcasted below
  const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);

  const requestPromises = [];
  bitcoin.networkNodes.forEach(networkNodeUrl => {
    const requestOptions = {
      uri: networkNodeUrl + '/receive-new-block',
      method: 'POST',
      body: { newBlock: newBlock },
      json: true
    };

    requestPromises.push(rp(requestOptions));
  });

  Promise.all(requestPromises)  // send the newBlock to all nodes as preped above
    .then(data => { // then broadcast the new mined tx : // bitcoin.createNewTransaction(12.5, '00', nodeAddress);
      // prep the requestOptions
      const requestOptions = {
        uri: bitcoin.currentNodeUrl + '/transaction/broadcast',
        method: 'POST',
        body: {
          amount: 12.5,
          sender: "00",
          recipient: nodeAddress
        },
        json: true
      };

      return rp(requestOptions);
    })
    .then(data => { // new block and miners reward broadcasted successfully
      res.json({
        note: 'New block mined & broadcast successfully',
        block: newBlock
      });
    });
});

// /receive-new-block Endpoint used in the /mine and broadcast new block 
app.post('/receive-new-block', function (req, res) {
  const newBlock = req.body.newBlock;
  const lastBlock = bitcoin.getLastBlock();
  const correctHash = lastBlock.hash === newBlock.previousBlockHash;
  const correctIndex = lastBlock['index'] + 1 === newBlock['index'];

  if (correctHash && correctIndex) {
    bitcoin.chain.push(newBlock);
    bitcoin.pendingTransactions = [];
    res.json({
      note: 'New block received and accepted.',
      newBlock: newBlock
    });
  } else {
    res.json({
      note: 'New block rejected',
      newBlock: newBlock
    });
  }

});

// register a node and broadcast it to the network
app.post('/register-and-broadcast-node', function (req, res) {
  const newNodeUrl = req.body.newNodeUrl;
  // if not already present in the node network, add to network = register
  if (bitcoin.networkNodes.indexOf(newNodeUrl) == -1) bitcoin.networkNodes.push(newNodeUrl);

  // Register the new node with all nodes in the network
  const regNodesPromises = [];
  bitcoin.networkNodes.forEach(networkNodeUrl => {
    // '/register-node'
    const requestOptions = {
      uri: networkNodeUrl + '/register-node',
      method: 'POST',
      body: { newNodeUrl: newNodeUrl },
      json: true
    };
    // rp - comes from request promise
    regNodesPromises.push(rp(requestOptions));
  });

  Promise.all(regNodesPromises)
    .then(data => {
      // use the data... responses from the registrations from all nodes
      const bulkRegisterOptions = {
        uri: newNodeUrl + '/register-nodes-bulk',
        method: 'POST',
        body: { allNetworkNodes: [...bitcoin.networkNodes, bitcoin.currentNodeUrl] },
        json: true
      };

      return rp(bulkRegisterOptions);
    })
    .then(data => {
      res.json({ note: 'New node registered with network successfully.' })
    })
});

// register a node with the network
app.post('/register-node', function (req, res) {
  const newNodeUrl = req.body.newNodeUrl;
  const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(newNodeUrl) == -1;
  const notCurrentNode = bitcoin.currentNodeUrl !== newNodeUrl;
  if (nodeNotAlreadyPresent && notCurrentNode) bitcoin.networkNodes.push(newNodeUrl);
  res.json({ note: 'New node registered successfully.' });  // ToDo : Send success note only if pushing the node !
});

// register multiple nodes at once
app.post('/register-nodes-bulk', function (req, res) {
  const allNetworkNodes = req.body.allNetworkNodes;
  allNetworkNodes.forEach(networkNodeUrl => {
    const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(networkNodeUrl) == -1;
    const notCurrentNode = bitcoin.currentNodeUrl !== networkNodeUrl;
    if (nodeNotAlreadyPresent && notCurrentNode) bitcoin.networkNodes.push(networkNodeUrl);
  });

  res.json({ note: 'Bulk registration successful.' });
});

// get consensus = get the blockchains from the network and compare them to the copy of local chain
app.get('/consensus', function (req, res) {
  const requestPromises = [];
  bitcoin.networkNodes.forEach(networkNodeUrl => {
    const requestOptions = {
      uri: networkNodeUrl + '/blockchain',
      method: 'GET',
      json: true
    };

    requestPromises.push(rp(requestOptions));
  });

  Promise.all(requestPromises)
    .then(blockchains => {  // blockchains = an array of blockchains from all the nodes in the network
      // iterate through the blockchains and see if there is one longer than the local blockchain
      const currentChainLength = bitcoin.chain.length;
      let maxChainLength = currentChainLength;
      let newLongestChain = null;
      let newPendingTransactions = null;

      blockchains.forEach(blockchain => {
        if (blockchain.chain.length > maxChainLength) {
          maxChainLength = blockchain.chain.length;
          newLongestChain = blockchain.chain;
          newPendingTransactions = blockchain.pendingTransactions;
        };
      });

      if (!newLongestChain || (newLongestChain && !bitcoin.chainIsValid(newLongestChain))) {
        res.json({
          note: 'Current chain has not been replaced.',
          chain: bitcoin.chain
        });
      } else {  // = else if (newLongestChain && bitcoin.chainIsValid(newLongestChain))
        // replace the local chain with the new longest chain
        bitcoin.chain = newLongestChain;
        bitcoin.pendingTransactions = newPendingTransactions;
        res.json({
          note: 'This chain has been replaced',
          chain: bitcoin.chain
        });
      }
    });
});


// Block Explorer / Frontend Endpoints
app.get('/block/:blockHash', function(req, res) {   // returns the block/sprint for a blockHash provided
  const blockHash = req.params.blockHash;           // eg: localhost: 3001/block/grtw67gqr6g9q65q969t
  const correctBlock = bitcoin.getBlock(blockHash);
  res.json({
    block: correctBlock
  });
});

app.get('/transaction/:transactionId', function(req, res) {  // returns the transaction data for the tx Id provided
  const transactionId = req.params.transactionId;
  const transactionData = bitcoin.getTransaction(transactionId);
  res.json({
    transaction: transactionData.transaction,
    block: transactionData.block
  })
});

app.get('/address/:address', function (req, res) {  // get all txs sent or received by an address and the balance of the address
  const address = req.params.address;
  const addressData = bitcoin.getAddressData(address);
  res.json({
    addressData: addressData
  });
});

app.listen(port, () => {
  console.log(`Node listening on port ${port}...`);
});