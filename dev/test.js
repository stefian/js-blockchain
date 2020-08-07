const Blockchain = require('./blockchain');
const bitcoin = new Blockchain();

// Testing chainIsValid() Method
// % npm run node_1
// generate/mine 6 blocks at http://localhost:3001/mine 
// with 10 + txs 8 regular at http://localhost:3001/transaction/broadcast  + rewards 
// then get the blockchain at http://localhost:3001/blockchain and copy it in test.js :

const bc1 = {
"chain": [
{
"index": 1,
"timestamp": 1596794600003,
"transactions": [ ],
"nonce": 100,
"hash": "0",
"previousBlockHash": "0"
},
{
"index": 2,
"timestamp": 1596797192504,
"transactions": [ ],
"nonce": 18140,
"hash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100",
"previousBlockHash": "0"
},
{
"index": 3,
"timestamp": 1596797350421,
"transactions": [
{
"amount": 12.5,
"sender": "00",
"receipient": "38a0cb10d89511eab9818b6e78529461",
"transactionId": "41e5ef60d89b11eab9818b6e78529461"
},
{
"amount": 10,
"sender": "FR534234YUTFI76FKUYVK76",
"receipient": "5ERDSRE24S65EU65FKUYG9",
"transactionId": "752cc420d89b11eab9818b6e78529461"
},
{
"amount": 20,
"sender": "FR534234YUTFI76FKUYVK76",
"receipient": "5ERDSRE24S65EU65FKUYG9",
"transactionId": "869e1920d89b11eab9818b6e78529461"
},
{
"amount": 30,
"sender": "FR534234YUTFI76FKUYVK76",
"receipient": "5ERDSRE24S65EU65FKUYG9",
"transactionId": "92455810d89b11eab9818b6e78529461"
}
],
"nonce": 6498,
"hash": "0000779489a13c5f9c01ced21e9c84dd3190bc921cd934c153a69a4614c36689",
"previousBlockHash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100"
},
{
"index": 4,
"timestamp": 1596797504918,
"transactions": [
{
"amount": 12.5,
"sender": "00",
"receipient": "38a0cb10d89511eab9818b6e78529461",
"transactionId": "a0020980d89b11eab9818b6e78529461"
},
{
"amount": 40,
"sender": "FR534234YUTFI76FKUYVK76",
"receipient": "5ERDSRE24S65EU65FKUYG9",
"transactionId": "d6bc5a20d89b11eab9818b6e78529461"
},
{
"amount": 50,
"sender": "FR534234YUTFI76FKUYVK76",
"receipient": "5ERDSRE24S65EU65FKUYG9",
"transactionId": "e29382b0d89b11eab9818b6e78529461"
},
{
"amount": 60,
"sender": "FR534234YUTFI76FKUYVK76",
"receipient": "5ERDSRE24S65EU65FKUYG9",
"transactionId": "ec7e92b0d89b11eab9818b6e78529461"
},
{
"amount": 60,
"sender": "FR534234YUTFI76FKUYVK76",
"receipient": "5ERDSRE24S65EU65FKUYG9",
"transactionId": "f3cfe500d89b11eab9818b6e78529461"
},
{
"amount": 70,
"sender": "FR534234YUTFI76FKUYVK76",
"receipient": "5ERDSRE24S65EU65FKUYG9",
"transactionId": "f83f7420d89b11eab9818b6e78529461"
}
],
"nonce": 106883,
"hash": "00007a9528a745091e794498524240b3de296297591f4ea488cd1416f6810c3d",
"previousBlockHash": "0000779489a13c5f9c01ced21e9c84dd3190bc921cd934c153a69a4614c36689"
},
{
"index": 5,
"timestamp": 1596797542693,
"transactions": [
{
"amount": 12.5,
"sender": "00",
"receipient": "38a0cb10d89511eab9818b6e78529461",
"transactionId": "fc186890d89b11eab9818b6e78529461"
}
],
"nonce": 84488,
"hash": "000077dae4fe9cc3a2868a7aa47e9cdd48d179164cb25a5654ada91a06ca8e8c",
"previousBlockHash": "00007a9528a745091e794498524240b3de296297591f4ea488cd1416f6810c3d"
},
{
"index": 6,
"timestamp": 1596797548227,
"transactions": [
{
"amount": 12.5,
"sender": "00",
"receipient": "38a0cb10d89511eab9818b6e78529461",
"transactionId": "129c4370d89c11eab9818b6e78529461"
}
],
"nonce": 124610,
"hash": "000087285f532054b9675191bc1442a1d49c4a6bd0793a800a22b4ce3746f04e",
"previousBlockHash": "000077dae4fe9cc3a2868a7aa47e9cdd48d179164cb25a5654ada91a06ca8e8c"
}
],
"pendingTransactions": [
{
"amount": 12.5,
"sender": "00",
"receipient": "38a0cb10d89511eab9818b6e78529461",
"transactionId": "15e8d660d89c11eab9818b6e78529461"
}
],
"currentNodeUrl": "http://localhost:3001",
"networkNodes": [ ]
}

// Expect to show the genesis block
// console.log(bitcoin);

// Testing proofOfWork()
// const previousBlockHash = 'KYKUYG76GBKG7F57I7G7F5IFI6';
// const currentBlockData = [
//   {
//     amount: 10,
//     sender: 'XFGBF7B9ZGF79Z7H9ZG',
//     recipient: 'BFS7BSF87BS8F7BS'
//   },
//   {
//     amount: 30,
//     sender: 'BT8H8THA87HG8AEHPT8T8A',
//     recipient: 'ANTGUHA8GAIEUHGUAGIAA7'
//   },
//   {
//     amount: 200,
//     sender: 'DY8HDY7HS7H0S7YYSSTSTST',
//     recipient: 'N337V3JH7V3KH7V3JV73K'
//   }
// ];

// Expect a hash starting with 0000
// console.log(bitcoin.hashBlock(previousBlockHash, currentBlockData, 116693));
// 
// Expect a nonce value for which the hash starts with 0000
// console.log(bitcoin.proofOfWork(previousBlockHash, currentBlockData));


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