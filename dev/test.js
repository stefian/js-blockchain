const Blockchain = require('./blockchain');

const bitcoin = new Blockchain();

// Test createNewTransaction() - expect a bitcoin Blockchain with 1 block and 1 pending tx
bitcoin.createNewBlock(2389, 'JHGCJHGCKHVKHGV', 'HJVKCKGHCKGH');

bitcoin.createNewTransaction(100, 'ALEXYTF865F65UUF', 'JEN776GFU56F65F4')


// Test createNewBlock() - expect a bitcoin blocchain w 3 blocks
// bitcoin.createNewBlock(2389, 'JHGCJHGCKHVKHGV', 'HJVKCKGHCKGH');
// bitcoin.createNewBlock(111, 'JHGKBKJHBBJJHK', 'HJVNGRSGGMHGKGH');
// bitcoin.createNewBlock(2899, 'GKUYGKUYKYBKV', 'JKHVJGFDFFSGRSE');

console.log(bitcoin);