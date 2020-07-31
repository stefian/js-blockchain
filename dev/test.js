const Blockchain = require('./blockchain');
const bitcoin = new Blockchain();

// Testing proofOfWork()
const previousBlockHash = 'KYKUYG76GBKG7F57I7G7F5IFI6';
const currentBlockData = [
  {
    amount: 10,
    sender: 'XFGBF7B9ZGF79Z7H9ZG',
    recipient: 'BFS7BSF87BS8F7BS'
  },
  {
    amount: 30,
    sender: 'BT8H8THA87HG8AEHPT8T8A',
    recipient: 'ANTGUHA8GAIEUHGUAGIAA7'
  },
  {
    amount: 200,
    sender: 'DY8HDY7HS7H0S7YYSSTSTST',
    recipient: 'N337V3JH7V3KH7V3JV73K'
  }
];

// Expect a nonce value for which the hash starts with 0000
console.log(bitcoin.proofOfWork(previousBlockHash, currentBlockData));


// // Testing hashBlock() method
// const nonce = 100;
// 
// Expect a sha256 hash string
// console.log(bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce));



// // Test createNewTransaction() - expect a bitcoin Blockchain with 1 block and 1 pending tx
// bitcoin.createNewBlock(2389, 'JHGCJHGCKHVKHGV', 'HJVKCKGHCKGH');
//
// bitcoin.createNewTransaction(100, 'ALEXYTF865F65UUF', 'JEN776GFU56F65F4')
//
// // Equivalent to mining a block after creating a new tx, to include the tx
// bitcoin.createNewBlock(123123, 'JHGKBKJHBBJJHK', 'HJVNGRSGGMHGKGH');
//
// // Expect a blockchain w 2 blocks and 3 pending tx :
// bitcoin.createNewTransaction(50, 'ALEXYTF865F65UUF', 'JEN776GFU56F65F4')
// bitcoin.createNewTransaction(300, 'ALEXYTF865F65UUF', 'JEN776GFU56F65F4')
// bitcoin.createNewTransaction(2000, 'ALEXYTF865F65UUF', 'JEN776GFU56F65F4')
//
// // Expect the 3 tx above to be included in the 3rd block
// bitcoin.createNewBlock(86753, 'VIYVVYTUYTO7', 'NYGI76THI67');

// Test createNewBlock() - expect a bitcoin blocchain w 3 blocks
// bitcoin.createNewBlock(2389, 'JHGCJHGCKHVKHGV', 'HJVKCKGHCKGH');
// bitcoin.createNewBlock(111, 'JHGKBKJHBBJJHK', 'HJVNGRSGGMHGKGH');
// bitcoin.createNewBlock(2899, 'GKUYGKUYKYBKV', 'JKHVJGFDFFSGRSE');

// console.log(bitcoin.chain[2]);