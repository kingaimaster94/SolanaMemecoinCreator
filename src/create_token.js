import {
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import {
  AuthorityType,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  getMinimumBalanceForRentExemptMint,
  getOrCreateAssociatedTokenAccount,
  getAssociatedTokenAddress,
  createInitializeMintInstruction,
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
  createSetAuthorityInstruction,
  createTransferInstruction,
  transfer
} from "@solana/spl-token";
import {
  createCreateMetadataAccountV3Instruction,
  PROGRAM_ID,
} from "@metaplex-foundation/mpl-token-metadata";

import { connection, myKeyPair } from "../config.js";

export async function createToken(tokenInfo, revokeMintBool, revokeFreezeBool) {
  const myPublicKey = myKeyPair.publicKey;
  console.log("wallet publicKey: ", myPublicKey);
  const lamports = await getMinimumBalanceForRentExemptMint(connection);
  const mintKeypair = Keypair.generate();
  const tokenATA = await getAssociatedTokenAddress(
    mintKeypair.publicKey,
    myPublicKey
  );

  // const tokenATAAddress = await getOrCreateAssociatedTokenAccount(
  //   connection,
  //   myKeyPair,
  //   mintKeypair.publicKey,
  //   myPublicKey
  // );

  // console.log("tokenATAAddress: ", tokenATAAddress);

  const createMetadataInstruction = createCreateMetadataAccountV3Instruction(
    {
      metadata: PublicKey.findProgramAddressSync(
        [
          Buffer.from("metadata"),
          PROGRAM_ID.toBuffer(),
          mintKeypair.publicKey.toBuffer(),
        ],
        PROGRAM_ID
      )[0],
      mint: mintKeypair.publicKey,
      mintAuthority: myPublicKey,
      payer: myPublicKey,
      updateAuthority: myPublicKey,
    },
    {
      createMetadataAccountArgsV3: {
        data: {
          name: tokenInfo.tokenName,
          symbol: tokenInfo.symbol,
          uri: tokenInfo.metadata,
          creators: null,
          sellerFeeBasisPoints: 0,
          uses: null,
          collection: null,
        },
        isMutable: true,
        collectionDetails: null,
      },
    }
  );

  const createNewTokenTransaction = new Transaction().add(
    SystemProgram.createAccount({
      fromPubkey: myPublicKey,
      newAccountPubkey: mintKeypair.publicKey,
      space: MINT_SIZE,
      lamports: lamports,
      programId: TOKEN_PROGRAM_ID,
    }),
    createInitializeMintInstruction(
      mintKeypair.publicKey,
      tokenInfo.decimals,
      myPublicKey,
      myPublicKey,
      TOKEN_PROGRAM_ID
    ),
    createAssociatedTokenAccountInstruction(
      myPublicKey,
      tokenATA,
      myPublicKey,
      mintKeypair.publicKey
    ),
    createMintToInstruction(
      mintKeypair.publicKey,
      tokenATA,
      myPublicKey,
      tokenInfo.amount * Math.pow(10, tokenInfo.decimals)
    ),
    createMetadataInstruction,
  );
  createNewTokenTransaction.feePayer = myKeyPair.publicKey;

  if (revokeMintBool) {
    let revokeMint = createSetAuthorityInstruction(
      mintKeypair.publicKey, // mint acocunt || token account
      myPublicKey, // current auth
      AuthorityType.MintTokens, // authority type
      null
    );
    createNewTokenTransaction.add(revokeMint);
  }

  if (revokeFreezeBool) {
    let revokeFreeze = createSetAuthorityInstruction(
      mintKeypair.publicKey, // mint acocunt || token account
      myPublicKey, // current auth
      AuthorityType.FreezeAccount, // authority type
      null
    );

    createNewTokenTransaction.add(revokeFreeze);
  }

  let JITO_TIP_ADDRESS = 'Cw8CFyM9FkoMi7K7Crf6HNQqf4uEMzpKw6QNghXLvLkY'
  let jitoTipInstruction = SystemProgram.transfer({
    fromPubkey: myPublicKey,
    toPubkey: new PublicKey(JITO_TIP_ADDRESS),
    lamports: 15000000, // (your tip)
  });

  createNewTokenTransaction.add(jitoTipInstruction)

  let blockhash = (await connection.getLatestBlockhash("finalized")).blockhash;
  console.log("blockhash", blockhash);
  createNewTokenTransaction.recentBlockhash = blockhash;

  const signature = await sendAndConfirmTransaction(
    connection,
    createNewTokenTransaction,
    [myKeyPair, mintKeypair]
  );

  console.log("Token mint transaction sent. Signature:", signature);
  console.log("Token Created : ", tokenInfo);
  console.log("Token Mint Address :", mintKeypair.publicKey.toString());
  console.log("Associated Token Address: ", tokenATA.toBase58()); ///cyh
  return mintKeypair.publicKey;
}
