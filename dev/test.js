const Blockchain = require('./blockchain');

const bitcoin = new Blockchain();

bitcoin.createNewBlock(2389, 'JHGCJHGCKHVKHGV', 'HJVKCKGHCKGH')
bitcoin.createNewBlock(111, 'JHGKBKJHBBJJHK', 'HJVNGRSGGMHGKGH')
bitcoin.createNewBlock(2899, 'GKUYGKUYKYBKV', 'JKHVJGFDFFSGRSE')

console.log(bitcoin);