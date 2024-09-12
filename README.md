# Compressed NFTs


**Exercise:** Create a **cNFT collection** of your own **profile picture** and **social links** as metadata and airdrop it to other fellows.

Topics in this exercise:
- bun
- TypeScript
- Merkle Tree
- Compressed NFT
- Metaplex
- Bubblegum

## Installation

**Clone the repo:**

```bash
git clone https://github.com/Laugharne/ssf_s8_exo.git
```
Install **bun** if needed

`curl -fsSL https://bun.sh/install | bash`

`bun --help`

**To install dependencies:**

```bash
bun install
```

**To run:**

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.1.20. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

If you occure this problem: `bigint: Failed to load bindings, pure JS will be used (try npm run rebuild?)`, resolve it by running the following command `npm rebuild`

## Overview

**Compressed NFTs** on Solana are a more scalable, cost-efficient way to mint and manage NFTs, using off-chain storage with on-chain proofs via **Merkle trees**. Here's how it works:

- **Merkle Tree**: A data structure that stores compressed proofs on-chain for efficient verification. Created using the `createTree()` call from `metaplex/bubblegum`, it allows for a compact, secure representation of many NFTs.

- **NFT Collection**: Defines a group of related NFTs. Created with the `createNft()` call from `metaplex`, it sets up metadata and ownership details for the collection.

- **Minting**: The process of adding new NFTs to a collection. This is done with `mintToCollectionV1()` from `metaplex/bubblegum`, allowing efficient addition of multiple NFTs to a **collection** using the **Merkle tree** structure.

Compressed NFTs enable large-scale minting with reduced costs, making them ideal for high-volume use cases like gaming and digital collectibles.

## Settings

Update the different fields and values in the following files:

### ".env" file

1. Specify wich kind of **environnment** you will use `production` or `developement`
2. Set your **Helius API key** (_[Dashboard | Helius](https://dashboard.helius.dev/dashboard)_) if you have one, else stay with the current RPC URL of Solana...

```
NODE_ENV=developement
SOLANA_MAINNET_RPC_URL=https://rpc.helius.xyz/?api-key=<HELIUS_API_KEY>
SOLANA_DEVNET_RPC_URL=https://devnet.helius-rpc.com/?api-key=<HELIUS_API_KEY>
```

### "key.json" file

Put "key.json" file at project root, this will be the payer wallet (_Format of the json file generated by `solana-keygen grind` command_)

### "config.ts" file

There is several fields to set:
- `MERKLE_MAX_DEPTH` : parameter specifies the maximum height of the Merkle tree, which dictates the total number of NFTs (or leaves) it can hold. To accommodate 37 NFTs, we need the smallest `maxDepth`.

  Let's compute this:
  - 2^5 = 32 (too small)
  - 2^6 = **64** (sufficient)

  So, the smallest depth that can hold 37 NFTs seems to bes `maxDepth = 6`.

  **But** there's only some specific couple of values for `MERKLE_MAX_DEPTH` and `MERKLE_MAX_BUFFER_SIZE` who seems to be authorized for the Merkle Tree !

  See: [solana-program-library/account-compression/programs/account-compression/src/state/concurrent_merkle_tree_header.rs](https://github.com/solana-labs/solana-program-library/blob/master/account-compression/programs/account-compression/src/state/concurrent_merkle_tree_header.rs#L160))

  ```rust
  /// Initialization parameters for an SPL ConcurrentMerkleTree.
  ///
  /// Only the following permutations are valid:
  ///
  /// | max_depth | max_buffer_size       |
  /// | --------- | --------------------- |
  /// | 14        | (64, 256, 1024, 2048) |
  /// | 20        | (64, 256, 1024, 2048) |
  /// | 24        | (64, 256, 512, 1024, 2048) |
  /// | 26        | (64, 256, 512, 1024, 2048) |
  /// | 30        | (512, 1024, 2048) |
  ```
  So i choose the following couple of values (**14**, **64**) for `MERKLE_MAX_DEPTH` and `MERKLE_MAX_BUFFER_SIZE` !


- Two off-chain JSON file metadata, URL to set (_see section "Metadata" below_)
  - `METADATA_COLLECTION_URL`
  - `METADATA_ITEM_URL`
- `IMAGE_URL` : Image URL of the cNFT
- Name, symbol and description of the collection
- `FEE_PERCENT` : The royalties shared by the creators in basis points (_550 means 5.5% royalties_)
- `EXTERNAL_URL` : URI pointing to an external URL defining the asset (_the creator's website for example_)

```typescript
export const MERKLE_MAX_DEPTH       = 14;
export const MERKLE_MAX_BUFFER_SIZE = 64;

export const METADATA_COLLECTION_URL = "https://laugharne.github.io/cnft_metadata.json";
export const METADATA_ITEM_URL       = "https://laugharne.github.io/cnft_item_metadata.json";
export const IMAGE_URL               = "https://laugharne.github.io/logo.png";

export const COLLECTION_NAME        = 'Solana Summer Fellowship 2024'
export const COLLECTION_SYMBOL      = 'SSF24'
export const COLLECTION_DESCRIPTION = 'Solana Summer Fellowship 2024 cNFT collection from Laugharne'
export const FEE_PERCENT            = 0
export const EXTERNAL_URL           = 'https://laugharne.github.io'

export const NFT_ITEM_NAME      = 'Laugharne Limited Edition'

```

In normal production environment, the off-chain data are hosted on services like **NFT.storage** or **ipfs** !

For this exercise i choose to host them on a **GitHub** accout...

### "fellow.csv" file

Prepare a list of Solana wallet addresses for the airdrop, in a CSV file.

The CSV file should contain a single column with the header "address", and each row should contain a valid Solana wallet address.

**Example :**

```csv
address
8zN3Wu9K5YX7xMdSXP6Q5bX6FN2h4pLJhxJWpT9uRT7Y
6bJ8eY2F2H1PxNqv4W3zV4XShGqT7G7Hk1Fm5XxgHJ2k
2yL9vR4fJDv7QZCtw8Zw1ND3y5mQeW2Kxqf8nB7nqTXY
5ZcR1WrVn8F8y1mQ5tBfjMkpD2xxVz2JQ5pJMezcvz8e
```

## Usage

TO DO

## Tree repository

```bash
TO DO
```

## Metadata

### cNFT Collection Metadata

```json
{
    "name"                   : "Solana Summer Fellowship 2024",
    "symbol"                 : "SSF24",
    "description"            : "Solana Summer Fellowship 2024 cNFT collection from Laugharne",
    "seller_fee_basis_points": 0,
    "image"                  : "https://laugharne.github.io/logo.png",
    "external_url"           : "https://laugharne.github.io/",
    "attributes"             : [],
    "collection"             : {
        "name"  : "Laugharne cNFTs Collection #2",
        "family": "Laugharne cNFTs"
    },
    "properties": {
        "files": [
            {
                "uri" : "https://laugharne.github.io/logo.png",
                "type": "image/png"
            }
        ],
        "category": "image"
    }
}
```

### cNFT item metadata

```json
{
    "name"                   : "Solana Summer Fellowship 2024",
    "symbol"                 : "SSF24",
    "description"            : "Solana Summer Fellowship 2024 cNFT collection from Laugharne",
    "seller_fee_basis_points": 0,
    "image"                  : "https://laugharne.github.io/logo.png",
    "external_url"           : "https://laugharne.github.io/",
    "attributes"             : [
        {
            "trait_type": "Program",
            "value"     : "Solana Summer Fellowship"
        },
        {
            "trait_type": "Cohorte",
            "value"     : "Summer 2024"
        },
        {
            "trait_type": "Mentor #1",
            "value"     : "Kunal Bagaria"
        },
        {
            "trait_type": "Mentor #2",
            "value"     : "Syed Aabis Akhtar"
        },
        {
            "trait_type": "Status",
            "value"     : "Yeah!"
        },
        {
            "trait_type": "Mint date",
            "value"     : "2024-09-12"
        }
    ],
    "collection": {
        "name"  : "Laugharne cNFTs Collection #2",
        "family": "Laugharne cNFTs"
    },
    "properties": {
      "files": [
        {
            "uri" : "https://laugharne.github.io/logo.png",
            "type": "image/png"
        }
      ],
      "category": "image"
    },
    "creators": {
        "address" : "9BbWp6tcX9MEGSUEpNXfspYxYsWCxE9FgRkAc3RpftkT",
        "verified": false,
        "share"   : 100
    }
  }
```

### Some references about metadata
- [Overview | Token Metadata](https://developers.metaplex.com/token-metadata)
- [How to Create a NFT On Solana | Token Metadata Guides](https://developers.metaplex.com/token-metadata/guides/javascript/create-an-nft)
- [Solana NFT Metadata Deep Dive](https://www.quicknode.com/guides/solana-development/nfts/solana-nft-metadata-deep-dive)

## Metaplex dependancies versions

```json
"@metaplex-foundation/mpl-bubblegum":            "^1.0.1",
"@metaplex-foundation/mpl-token-metadata":       "^3.0.0",
"@metaplex-foundation/umi-bundle-defaults":      "^0.8.9",
"@metaplex-foundation/umi-uploader-nft-storage": "^0.8.9",
```

## Some traces of my first attempts to mint cNFTs

**Addresses, Accounts, TX and scrrenshot:**

- [**MerkleTree**](https://explorer.solana.com/address/2mPwrypvopN8PHyfu6dbH9mJMvjXYvTpR3K7KqSYGV7P?cluster=devnet)
- [**NFT Collection**](https://explorer.solana.com/address/GKghCHWBaNZntuNnUKPbkZeqaesbUnet7FjzwrmASBwT?cluster=devnet)
- [**cNFT mint #1**](https://explorer.solana.com/tx/5uFU1i9Fp1Pkkz6QfMsnC4JbPoaXC54DafwBsZFBPEpgxoMeaxJEBKfD5vKp8ViVZQzCSA446yzk4TyDuiB9eWKJ?cluster=devnet)
- [**cNFT mint #2**](https://explorer.solana.com/tx/34uKXmL42SC8uQM2dSvV1zQLVLPAJRWvsUaaxcQjQiegVeWzdLxaSdLqmVPw1wouUdxfdB13JRrNagum652qsNKQ?cluster=devnet)
- **cNFt inside Phantom wallet**
  ![](assets/2024-09-10-16-22-42.png)

## Resources

**From fellowship:**

- [Creating Compressed NFTs with JavaScript | Solana](https://solana.com/developers/guides/javascript/compressed-nfts)
- [All You Need to Know About Compression on Solana](https://www.helius.dev/blog/all-you-need-to-know-about-compression-on-solana) (_The most detailed blog on Solana's compression_)
- [Exploring NFT Compression on Solana](https://www.helius.dev/blog/solana-nft-compression) (_All about specifically NFT compression (cNFTS)_)
- [Overview | Bubblegum](https://developers.metaplex.com/bubblegum) (_Metaplex's Bubblegum program's docs_)

**Metaplex/Bubblegum:**

- [Overview | Bubblegum](https://developers.metaplex.com/bubblegum)
- [GitHub - metaplex-foundation/mpl-bubblegum: Create and manage Metaplex compressed NFTs](https://github.com/metaplex-foundation/mpl-bubblegum)
- [@metaplex-foundation/mpl-bubblegum - v4.2.1](https://mpl-bubblegum-js-docs.vercel.app/)

**Solandy videos:**

- [What is a Merkle Tree? How does Account Compression work? [Solana Tutorial] - Mar 22nd '23 - YouTube](https://www.youtube.com/watch?v=6BpArf2-R68)
- [How Compressed NFTs work on Solana - Mar 30th '23 - YouTube](https://www.youtube.com/watch?v=ayZUsq6eLzQ)
  - [GitHub - metaplex-foundation/compression-read-api-js-examples](https://github.com/metaplex-foundation/compression-read-api-js-examples)
  - [compression-read-api-js-examples/index.ts at master · metaplex-foundation/compression-read-api-js-examples · GitHub](https://github.com/metaplex-foundation/compression-read-api-js-examples/blob/master/index.ts#L464)
  - [Minting a tree for compressed NFTs - DEV Community](https://dev.to/apollotoday/minting-a-tree-for-compressed-nfts-13n7)
- [How to Mint and Transfer compressed NFTs [Solana Tutorial] - Apr 14th '23 - YouTube](https://www.youtube.com/watch?v=83nIhnxtlW8)
  - [video-tutorial-resources/cnfts at main · loopcreativeandy/video-tutorial-resources · GitHub](https://github.com/loopcreativeandy/video-tutorial-resources/tree/main/cnfts)
- [Compressed NFTs Deep Dive: What you need to know before you mint! [Solana Tutorial] - June 3rd '23 - YouTube](https://www.youtube.com/watch?v=nM3trQX2_5o)

**Misc:**

- [Account Compression Program](https://spl.solana.com/account-compression)
- [Core Concepts](https://spl.solana.com/account-compression/concepts)
- [Example usage of the TS SDK](https://spl.solana.com/account-compression/usage)
- [solana-program-library/account-compression/programs at master · solana-labs/solana-program-library · GitHub](https://github.com/solana-labs/solana-program-library/tree/master/account-compression/programs)
- [Merkle Trees Visualization](https://efficient-merkle-trees.netlify.app/)
- [Intro to Solana cNFTs: Solana Compressed NTFs Revolution](https://medium.com/liberal-arts-magazine/intro-to-solana-cnfts-solana-compressed-ntfs-revolution-8f61c94c4117)

----
- [Solana NFT: Adjusting Solana’s Compressed NFT Metadata](https://medium.com/@marrnuel123/solana-nft-adjusting-solanas-compressed-nft-metadata-59886fdba953)
- [GitHub - helius-labs/compression-examples](https://github.com/helius-labs/compression-examples)
- [All You Need to Know About Compression on Solana](https://www.helius.dev/blog/all-you-need-to-know-about-compression-on-solana)
- [GitHub - solana-developers/compressed-nfts: Example code to use compressed NFTs (using state compression) on Solana](https://github.com/solana-developers/compressed-nfts)
- [one-milion-nfts/next/src/util/utils.ts at main · solana-developers/one-milion-nfts · GitHub](https://github.com/solana-developers/one-milion-nfts/blob/main/next/src/util/utils.ts#L192)
- --------
- [How to Mint Solana Compressed NFTs (cNFTs) with TypeScript](https://medium.com/@KishiTheMechanic/how-to-mint-solana-compressed-nfts-cnfts-with-typescript-be9d0fa7ce30)
  - [skeet-solana-mobile-stack/scripts/solana/cNFT at main · elsoul/skeet-solana-mobile-stack · GitHub](https://github.com/elsoul/skeet-solana-mobile-stack/tree/main/scripts/solana/cNFT)

**Metadata:**

- [Solana NFT Metadata Deep Dive](https://www.quicknode.com/guides/solana-development/nfts/solana-nft-metadata-deep-dive)
- [Overview | Token Metadata](https://developers.metaplex.com/token-metadata)
  - [How to Create a NFT On Solana | Token Metadata Guides](https://developers.metaplex.com/token-metadata/guides/javascript/create-an-nft)