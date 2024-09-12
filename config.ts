import { publicKey } from '@metaplex-foundation/umi'

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
export const CREATORS               = [
  {
    address: publicKey('9BbWp6tcX9MEGSUEpNXfspYxYsWCxE9FgRkAc3RpftkT'),
    verified: false,
    share: 100,
  },
  // {
  //   address: publicKey('DcLN5EYHBSexnKdipnSmiFAKevcxGijURonzaWfri8Cq'),
  //   verified: false,
  //   share: 30,
  // },
  // {
  //   address: publicKey('DfCHMeHfRYMBQwMje5bLSqimMWXhArYoTomX2vRr6Ty9'),
  //   verified: false,
  //   share: 30,
  // },
]


// After create NFT collection, we can get the collection address:
// export const COLLECTION_MINT = publicKey(
//   'GKghCHWBaNZntuNnUKPbkZeqaesbUnet7FjzwrmASBwT'
//   //'itzdT5XgD9cLRtFSTbLAeEqKM3aT3UeSTCJ5h1A9cNN'
// )
// After create merkle tree, we can get the merkle tree address:
// export const MERKLE_TREE = publicKey(
//   '2mPwrypvopN8PHyfu6dbH9mJMvjXYvTpR3K7KqSYGV7P'
//   //'AqWn6rLoJJvexv9Eyu6MiYyAjzptJqMRTiMnopjRW38Q'
// )

export const MINT_ITEM_TO = publicKey(
  '9BbWp6tcX9MEGSUEpNXfspYxYsWCxE9FgRkAc3RpftkT'
  //'ELLBGa6DTdEVui6Ydt8vqsnsyybAxyVLPwY7oH6onbUq'
)
export const NFT_ITEM_NAME      = 'Laugharne Limited Edition'
export const NFT_ITEM_IMAGE_URL = IMAGE_URL;

// export const NFT_ITEM_ATTRIBUTES = [
//   {
//     trait_type: 'Status',
//     value     : 'Yeah!',
//   },
//   {
//     trait_type: 'Minted',
//     value     : '2024-09-09',
//     //value     : format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
//   },
// ]

// for RPC
export const OWNER_ADDRESS =
  '9BbWp6tcX9MEGSUEpNXfspYxYsWCxE9FgRkAc3RpftkT'
  //'ELLBGa6DTdEVui6Ydt8vqsnsyybAxyVLPwY7oH6onbUq'

export const COLLECTION_MINT_ADDRESS =
  'GKghCHWBaNZntuNnUKPbkZeqaesbUnet7FjzwrmASBwT'
  //'itzdT5XgD9cLRtFSTbLAeEqKM3aT3UeSTCJ5h1A9cNN'

// for umi
export const OWNER_PUBKEY           = publicKey(OWNER_ADDRESS)
export const COLLECTION_MINT_PUBKEY = publicKey(COLLECTION_MINT_ADDRESS)
