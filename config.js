import {
    Connection,
    Keypair,
} from '@solana/web3.js';
import bs58 from 'bs58';

export const PRIVATE_KEY = "4gAGdsemdFrondTyHytgNNVo4xqKgsUadkfMCJPPVMG9qs4YwGEnsW37nCN3VQwtiqGE1m2dGENqsxpDxz3raJ8f"; // Private Key of Deployer
export const endpoint = "https://api.devnet.solana.com"; // RPC ENDPOINT
export const revokeMintBool = true
export const revokeFreezeBool = true


export let tokenInfo = {
    amount: 96796796796,
    decimals: 6,
    metadata: '', // LEAVE EMPTY
    symbol: 'KAI', // Token Symbol
    tokenName: 'KingAI' // Token Name 
}

export let metaDataforToken = {
    "name": tokenInfo.tokenName,
    "symbol": tokenInfo.symbol,
    "image": '', // LEAVE EMPTY
    "description": `kingAImaster94@gmail.com`, // Put your Description between ``
    "extensions": {
        "website": "",// Put your website between ""
        "twitter": "",// Put your twitter between ""
        "telegram": "kingAImaster"// Put your telegram between ""
    },
    "tags": ["SOLANA", "MEME"]
}

// Ignore these
export const connection = new Connection(endpoint);
export const myKeyPair = Keypair.fromSecretKey(new Uint8Array(bs58.decode(PRIVATE_KEY)));
