import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';
import { createToken } from './src/create_token.js';
import dotenv from 'dotenv';
import {
    revokeMintBool,
    revokeFreezeBool,
    tokenInfo,
    metaDataforToken
} from './config.js';

dotenv.config();
async function main() {

    // uploadMetaData
    const metadata_url = await uploadMetaData('./image.png')
    if (!metadata_url) {
        console.log("Metadata failed")
        return;
    }
    tokenInfo.metadata = metadata_url

    // Create token
    console.log("Creating Token...")
    const mintAddress = await createToken(tokenInfo, revokeMintBool, revokeFreezeBool)
    console.log(`Mint Link: https://solscan.io/token/${mintAddress.toString()}`)
}

async function uploadMetaData(filePath) {
    const pinata_url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
    try {
        let formData = new FormData();
        const fileStream = await fs.promises.readFile(filePath);
        formData.append('file', fileStream, 'logo.png');
        let response = await axios.post(pinata_url, formData, {
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                pinata_api_key: process.env.PINIATA_API_KEY,
                pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
            },
        });

        // Log the IPFS details
        const imageUri = "ipfs.io/ipfs/" + response.data.IpfsHash;
        console.log(`imageUri: ${imageUri}`)

        metaDataforToken.image = imageUri
        // Convert JSON object to Blob
        const buffer = Buffer.from(JSON.stringify(metaDataforToken));
        const jsonBlob = new Blob([JSON.stringify(metaDataforToken)], { type: 'application/json' });

        formData = new FormData();
        formData.append('file', buffer, `metadata.json`);
        response = await axios.post(pinata_url, formData, {
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                pinata_api_key: process.env.PINIATA_API_KEY,
                pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
            },
        });

        const metadata_uri = "ipfs.io/ipfs/" + response.data.IpfsHash;
        console.log(`metadata_uri: ${metadata_uri}`)
        return metadata_uri;
    } catch (error) {
        console.error("Error uploading to Pinata:", error);
        throw error; // Handle or rethrow the error as needed
    }
}

main()