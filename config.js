const {
    Connection,
    Keypair,
} = require('@solana/web3.js')
const bs58 = require('bs58')

const PRIVATE_KEY = ""; // Private Key of Deployer
const endpoint = ""; // RPC ENDPOINT
const NFT_STORAGE_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDY3N2ZFYzhmZDc3QzI2OTgwMDBkQjg0RjNiMTM5MEVCRTM4MEU4M0YiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcwODYxOTgxMTA3MiwibmFtZSI6InNoaXRjb2lucyJ9.zAvvtUVe6mY-sTxxnJ_lr23H3TnhoodnWurcftpMQxc';
const revokeMintBool = true
const revokeFreezeBool  = true


let tokenInfo = {
    amount: 1000000000,
    decimals: 6,
    metadata: '', // LEAVE EMPTY
    symbol: '', // Token Symbol
    tokenName: '' // Token Name 
}


let metaDataforToken = {
    "name": tokenInfo.tokenName,
    "symbol": tokenInfo.symbol,
    "image": '', // LEAVE EMPTY
    "description": ``, // Put your Description between ``
    "extensions": {
        "website": "",// Put your website between ""
        "twitter": "",// Put your twitter between ""
        "telegram": ""// Put your telegram between ""
    },
    "tags": ["SOLANA","MEME"]
}

// Ignore these
const connection = new Connection(endpoint);
const myKeyPair = Keypair.fromSecretKey(new Uint8Array(bs58.decode(PRIVATE_KEY)));


module.exports = {
    connection,
    myKeyPair,
    NFT_STORAGE_TOKEN,
    revokeMintBool,
    revokeFreezeBool,
    tokenInfo,
    metaDataforToken
};