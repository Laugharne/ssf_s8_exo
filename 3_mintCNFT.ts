import dotenv from 'dotenv';
dotenv.config();
import * as fs from 'fs';
import * as bs58 from 'bs58';

import { publicKey } from '@metaplex-foundation/umi';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';

import {
  signerIdentity,
  createSignerFromKeypair,
} from '@metaplex-foundation/umi';

//import { nftStorageUploader } from '@metaplex-foundation/umi-uploader-nft-storage'

import {
  FEE_PERCENT,
  CREATORS,
  //COLLECTION_MINT,
  NFT_ITEM_NAME,
  MINT_ITEM_TO,
  //MERKLE_TREE,
  METADATA_ITEM_URL,
} from './config';

import {
  readCsv,
  txToLink
} from './utils';

import {
  fetchMerkleTree,
  mintToCollectionV1,
  mplBubblegum,
} from '@metaplex-foundation/mpl-bubblegum';

const rpcURL =
  (process.env.NODE_ENV === 'production'
    ? process.env.SOLANA_MAINNET_RPC_URL
    : process.env.SOLANA_DEVNET_RPC_URL) || 'https://api.devnet.solana.com';

const payerKeyFile = 'key.json';
const keyData      = fs.readFileSync(payerKeyFile, 'utf8');
const secretKey    = new Uint8Array(JSON.parse(keyData));

//const nftStorageToken = process.env.NFT_STORAGE_KEY || ''

const run = async () => {
  try {
    const umi = createUmi(rpcURL)
      .use(mplTokenMetadata())
      //.use(nftStorageUploader({ token: nftStorageToken }))
      .use(mplBubblegum());

    const keyPair = umi.eddsa.createKeypairFromSecretKey(secretKey);
    const signer  = createSignerFromKeypair({ eddsa: umi.eddsa }, keyPair);
    // console.log("keyPair", keyPair);
    console.log("signer:", signer.publicKey);

    umi.use(signerIdentity(signer));
    let nodeEnv = ""; if (process.env.NODE_ENV === 'production') {
      nodeEnv = 'Mainnet';
    } else {
      nodeEnv = 'Devnet';
    }

    const merkleTreeTxt     = fs.readFileSync("./data/merkleTree"+nodeEnv+".txt", 'utf8');
    const merkleTreeAccount = await fetchMerkleTree(umi, publicKey(merkleTreeTxt));
    // console.log("merkleTreeAccount:", merkleTreeAccount);
    console.log("merkleTreeAccount:", merkleTreeAccount.publicKey);

    const collectionMintTxt     = fs.readFileSync("./data/collectionMint"+nodeEnv+".txt", 'utf8');
    const collectionMintAccount = publicKey(collectionMintTxt);
    console.log("collectionMintAccount:", collectionMintAccount);

    const nftItemJsonUri = METADATA_ITEM_URL;
    console.log('nftItemJsonUri:', nftItemJsonUri)
    fs.writeFileSync(
      './data/nftItemJsonUri.txt',
      nftItemJsonUri
    );

    const data = await readCsv('./fellow.csv');

    //data.forEach((item) => {
    for( let i = 0; i < data.length; i++) {
      console.log("-", data[i].address);

      const mintItemTo = publicKey(data[i].address);
      //console.log(mintItemTo);

      ///
      const mint = await mintToCollectionV1(umi, {
        leafOwner     : mintItemTo,
        merkleTree    : merkleTreeAccount.publicKey,
        collectionMint: collectionMintAccount,//COLLECTION_MINT,
        metadata      : {
          name                : NFT_ITEM_NAME,
          uri                 : nftItemJsonUri,
          sellerFeeBasisPoints: FEE_PERCENT * 100,
          collection          : {
            key:      collectionMintAccount,//COLLECTION_MINT,
            verified: false
          },
          creators            : CREATORS,
        },
      }).sendAndConfirm(umi);

      const nftItemMintExplolerUrl = `https://explorer.solana.com/tx/${bs58.encode(
        mint.signature
      )}${process.env.NODE_ENV !== 'production' && '?cluster=devnet'}`;

      console.log('nftItemMint:', nftItemMintExplolerUrl)
      fs.writeFileSync(
        `./data/nftItemMint${
          process.env.NODE_ENV === 'production' ? 'Mainnet' : 'Devnet'
        }.txt`,
        bs58.encode(mint.signature)
      );

      console.log("Pause: 2s.");
      await new Promise(_ => setTimeout(_,2000));
      console.log("");

      ///
    }
    //});

    //return;

  } catch (e) {
    console.error(e)
  }
}

void run()
