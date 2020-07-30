function Blockchain() {
  this.chain = [];
  this.newTransactions = [];
}

Blockchain.prototype.createNewBlock = function (nonce, previousBlockHash, hash) {
  const newBlock = {
    index: this.chain.length + 1, // block number
    timestamp: Date.now(),
    transactions: this.newTransactions,
    nonce: nonce, // Proof of work - a number - proof that we created the block in a legitimate way
    hash: hash, // data from our new block - all new tx compressed in a single string
    previousBlockHash: previousBlockHash  // the data hashed of the previous block
  };

  this.newTransactions = [];
  this.chain.push(newBlock);

  return newBlock;
}

Blockchain.prototype.getLastBlock = function () {
  return this.chain[this.chain.length - 1];
}

module.exports = Blockchain;