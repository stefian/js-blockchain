const sha256 = require('sha256');
const currentNodeUrl = process.argv[3];
const uuid = require('uuid');

function Blockchain() {
  this.chain = [];
  this.pendingTransactions = [];

  this.currentNodeUrl = currentNodeUrl;
  this.networkNodes = [];

  this.createNewBlock(100, '0', '0'); // Genesis / inital block
  // For Cogito - Genesis block should be related to the project / owner /budget info
};

Blockchain.prototype.createNewBlock = function (nonce, previousBlockHash, hash) {
  const newBlock = {
    index: this.chain.length + 1, // block number
    timestamp: Date.now(),
    transactions: this.pendingTransactions,
    nonce: nonce, // Proof of work - a number - proof that we created the block in a legitimate way
    hash: hash, // data from our new block - all new tx compressed in a single string
    previousBlockHash: previousBlockHash  // the data hashed of the previous block
  };

  this.pendingTransactions = [];
  this.chain.push(newBlock);

  return newBlock;
};

Blockchain.prototype.getLastBlock = function () {
  return this.chain[this.chain.length - 1];
};

Blockchain.prototype.createNewTransaction = function (amount, sender, recipient) {
  const newTransaction = {  // ToDo : for Cogito add commit, senderRepo, receiverRepo, receiverBranch 
    amount: amount,
    sender: sender,
    receipient: recipient,
    transactionId: uuid.v1().split('-').join('')  // provides an unique tx id 
  };

  return newTransaction;
};

Blockchain.prototype.addTransactionToPendingTransactions = function (transactionObj) {
  this.pendingTransactions.push(transactionObj);
  return this.getLastBlock()['index'] + 1;  // Return the nr / index of the new block containing the tx
};

Blockchain.prototype.hashBlock = function (previousBlockHash, currentBlockData, nonce) { // Hashing block data into a fixed lenght string
  const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
  const hash = sha256(dataAsString);
  return hash;
};

Blockchain.prototype.proofOfWork = function (previousBlockHash, currentBlockData) {
  // => repeatedly hash block until it finds correct hash => '0000LIAUHRIUHROEIGUHAE'
  // => uses current block data for the hash, but also the previousBlockHash
  // => continuously changes nonce value until it finds the correct hash
  // => returns to us the nonce value that creates the correct hash
  let nonce = 0;
  let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
  while (hash.substring(0, 4) !== '0000') {
    nonce++;
    hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    // console.log(nonce, hash); // for testing - listing nonces & hashes
  }

  return nonce; // the nonce is the proof
  // For Cogito to replace the nonce with the code / or last commit? 
  // and the '0000' test with results of a number of Jest tests from project repo
}

Blockchain.prototype.chainIsValid = function (blockchain) { // will return a boolean if blockchain is valid or not
  
};

module.exports = Blockchain;