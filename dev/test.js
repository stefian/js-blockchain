const Blockchain = require('./blockchain');

const bitcoin = new Blockchain();

// Test createNewTransaction() - expect a bitcoin Blockchain with 1 block and 1 pending tx
bitcoin.createNewBlock(2389, 'JHGCJHGCKHVKHGV', 'HJVKCKGHCKGH');

bitcoin.createNewTransaction(100, 'ALEXYTF865F65UUF', 'JEN776GFU56F65F4')

// Equivalent to mining a block after creating a new tx, to include the tx
bitcoin.createNewBlock(123123, 'JHGKBKJHBBJJHK', 'HJVNGRSGGMHGKGH');

// Expect a blockchain w 2 blocks and 3 pending tx :
bitcoin.createNewTransaction(50, 'ALEXYTF865F65UUF', 'JEN776GFU56F65F4')
bitcoin.createNewTransaction(300, 'ALEXYTF865F65UUF', 'JEN776GFU56F65F4')
bitcoin.createNewTransaction(2000, 'ALEXYTF865F65UUF', 'JEN776GFU56F65F4')

// Expect the 3 tx above to be included in the 3rd block
bitcoin.createNewBlock(86753, 'VIYVVYTUYTO7', 'NYGI76THI67');

// Test createNewBlock() - expect a bitcoin blocchain w 3 blocks
// bitcoin.createNewBlock(2389, 'JHGCJHGCKHVKHGV', 'HJVKCKGHCKGH');
// bitcoin.createNewBlock(111, 'JHGKBKJHBBJJHK', 'HJVNGRSGGMHGKGH');
// bitcoin.createNewBlock(2899, 'GKUYGKUYKYBKV', 'JKHVJGFDFFSGRSE');

console.log(bitcoin.chain[2]);