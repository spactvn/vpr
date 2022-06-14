/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Approve, ApproveInterface } from "../Approve";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "bnbAmount",
        type: "uint256",
      },
    ],
    name: "AddLiquidityBUSDPool",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenAAmount",
        type: "uint256",
      },
    ],
    name: "HarvestFarmingBUSDPool",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "bnbAmount",
        type: "uint256",
      },
    ],
    name: "RemoveLiquidityBUSDPool",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "rate",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "decimal",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "roi",
        type: "uint256",
      },
    ],
    name: "SetFarmingBUSDPool",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "_FTUser",
    outputs: [
      {
        internalType: "uint256",
        name: "FTBalance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lastUpdate",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "_NFTPool",
    outputs: [
      {
        internalType: "uint256",
        name: "NFTId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "ROI",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "FTBalance",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "_TokenBNBUser",
    outputs: [
      {
        internalType: "uint256",
        name: "tokenBalance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "bnbBalance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lastUpdate",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "_TokenBUSDUser",
    outputs: [
      {
        internalType: "uint256",
        name: "tokenBalance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "busdBalance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lastUpdate",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenA",
        type: "address",
      },
      {
        internalType: "address",
        name: "_tokenB",
        type: "address",
      },
      {
        internalType: "address",
        name: "_badgeContract",
        type: "address",
      },
      {
        internalType: "address",
        name: "_busdAddress",
        type: "address",
      },
    ],
    name: "__FarmingInit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenAmount",
        type: "uint256",
      },
    ],
    name: "addFarmingBUSDPool",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "badgeContract",
    outputs: [
      {
        internalType: "contract IAsset1155",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "busd",
    outputs: [
      {
        internalType: "contract IERC20Upgradeable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "estimateFarmingBUSDPoolReward",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "harvestFarmingBUSDPoolReward",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "ico",
    outputs: [
      {
        internalType: "contract IICO",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "recipient",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenAmount",
        type: "uint256",
      },
    ],
    name: "removeFarmingBUSDPool",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_rate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_decimal",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_roi",
        type: "uint256",
      },
    ],
    name: "setFarmingBUSDPool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenA",
    outputs: [
      {
        internalType: "contract IERC20Upgradeable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenB",
    outputs: [
      {
        internalType: "contract IERC20Upgradeable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenBNBPool",
    outputs: [
      {
        internalType: "uint256",
        name: "ROI",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "rate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "decimal",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tokenBalance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "bnbBalance",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenBUSDPool",
    outputs: [
      {
        internalType: "uint256",
        name: "ROI",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "rate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "decimal",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tokenBalance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "busdBalance",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506122d0806100206000396000f3fe60806040526004361061012a5760003560e01c80636aec1bec116100ab5780638da5cb5b1161006f5780638da5cb5b146103895780639c91aadc146103b4578063effa070b146103df578063f1101a111461041e578063f2567f1f1461045c578063f2fde38b1461048b5761012a565b80636aec1bec146102b0578063715018a6146102df5780637ecfe30b146102f65780637f6a45821461031f5780638d6d49251461035e5761012a565b806345348028116100f257806345348028146101f75780634a37d461146102135780635d4522011461022f5780635f64b55b1461025a57806366d003ac146102855761012a565b8063085c0c831461012f5780630c9606d8146101395780630fc63d101461017857806315066dd6146101a35780633ca5b234146101cc575b600080fd5b6101376104b4565b005b34801561014557600080fd5b50610160600480360381019061015b91906117db565b610615565b60405161016f93929190611821565b60405180910390f35b34801561018457600080fd5b5061018d61063f565b60405161019a91906118b7565b60405180910390f35b3480156101af57600080fd5b506101ca60048036038101906101c591906118d2565b610665565b005b3480156101d857600080fd5b506101e16108e6565b6040516101ee91906118b7565b60405180910390f35b610211600480360381019061020c9190611965565b61090c565b005b61022d60048036038101906102289190611965565b610d78565b005b34801561023b57600080fd5b5061024461105a565b60405161025191906119b3565b60405180910390f35b34801561026657600080fd5b5061026f611080565b60405161027c91906118b7565b60405180910390f35b34801561029157600080fd5b5061029a6110a6565b6040516102a791906119dd565b60405180910390f35b3480156102bc57600080fd5b506102c56110cc565b6040516102d69594939291906119f8565b60405180910390f35b3480156102eb57600080fd5b506102f46110f0565b005b34801561030257600080fd5b5061031d60048036038101906103189190611a4b565b611178565b005b34801561032b57600080fd5b5061034660048036038101906103419190611965565b611254565b60405161035593929190611821565b60405180910390f35b34801561036a57600080fd5b5061037361127e565b6040516103809190611abf565b60405180910390f35b34801561039557600080fd5b5061039e6112a4565b6040516103ab91906119dd565b60405180910390f35b3480156103c057600080fd5b506103c96112ce565b6040516103d69190611ada565b60405180910390f35b3480156103eb57600080fd5b50610406600480360381019061040191906117db565b6113d6565b60405161041593929190611821565b60405180910390f35b34801561042a57600080fd5b5061044560048036038101906104409190611af5565b611400565b604051610453929190611b35565b60405180910390f35b34801561046857600080fd5b50610471611431565b6040516104829594939291906119f8565b60405180910390f35b34801561049757600080fd5b506104b260048036038101906104ad91906117db565b611455565b005b600260015414156104fa576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104f190611bbb565b60405180910390fd5b6002600181905550600061050c6112ce565b9050600060ac60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000209050609860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33846040518363ffffffff1660e01b81526004016105ae929190611bdb565b602060405180830381600087803b1580156105c857600080fd5b505af11580156105dc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106009190611c3c565b50428160020181905550505060018081905550565b60ab6020528060005260406000206000915090508060000154908060010154908060020154905083565b609860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600060019054906101000a900460ff1661068d5760008054906101000a900460ff1615610696565b61069561154d565b5b6106d5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106cc90611cdb565b60405180910390fd5b60008060019054906101000a900460ff161590508015610725576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b61072d61155e565b84609860006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555083609960006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081609a60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555082609760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555062278d00609d8190555033609b60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506040518060800160405280600560ff168152602001600a60ff168152602001600f60ff168152602001601460ff1681525060ad9060046108bd929190611709565b5080156108df5760008060016101000a81548160ff0219169083151502179055505b5050505050565b609a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60026001541415610952576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161094990611bbb565b60405180910390fd5b6002600181905550609960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330846040518463ffffffff1660e01b81526004016109b993929190611cfb565b602060405180830381600087803b1580156109d357600080fd5b505af11580156109e7573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a0b9190611c3c565b50600060a360020154600a610a209190611e94565b60a36001015483610a319190611edf565b610a3b9190611f68565b90506000609a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663dd62ed3e33306040518363ffffffff1660e01b8152600401610a9c929190611f99565b60206040518083038186803b158015610ab457600080fd5b505afa158015610ac8573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610aec9190611fd7565b9050686c6b935b8bbd4000008110158015610b075750818110155b15610bc357609a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330846040518463ffffffff1660e01b8152600401610b6b93929190611cfb565b602060405180830381600087803b158015610b8557600080fd5b505af1158015610b99573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bbd9190611c3c565b50610c76565b609a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330856040518463ffffffff1660e01b8152600401610c2293929190611cfb565b602060405180830381600087803b158015610c3c57600080fd5b505af1158015610c50573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c749190611c3c565b505b8260a36003016000828254610c8b9190612004565b925050819055508160a36004016000828254610ca79190612004565b92505081905550600060ac60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905083816000016000828254610d059190612004565b9250508190555082816001016000828254610d209190612004565b925050819055504281600201819055507fd05696b49e92b20b47dbc98b3674c62aefbd2c19ae34f4378627b26da2bdbc9b338585604051610d639392919061205a565b60405180910390a15050506001808190555050565b60026001541415610dbe576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610db590611bbb565b60405180910390fd5b6002600181905550609960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33836040518363ffffffff1660e01b8152600401610e23929190611bdb565b602060405180830381600087803b158015610e3d57600080fd5b505af1158015610e51573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e759190611c3c565b50600060a360020154600a610e8a9190611e94565b60a36001015483610e9b9190611edf565b610ea59190611f68565b9050609a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3033846040518463ffffffff1660e01b8152600401610f0693929190611cfb565b602060405180830381600087803b158015610f2057600080fd5b505af1158015610f34573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f589190611c3c565b508160a36003016000828254610f6e9190612091565b925050819055508060a36004016000828254610f8a9190612091565b92505081905550600060ac60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905082816000016000828254610fe89190612091565b92505081905550818160010160008282546110039190612091565b925050819055504281600201819055507febf98d8b826005702b1612b01d1b79ea5c94c2a2f1ed20d7af9fddfe6f0f09ed3384846040516110469392919061205a565b60405180910390a150506001808190555050565b60a860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b609960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b609b60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60a38060000154908060010154908060020154908060030154908060040154905085565b6110f86115b7565b73ffffffffffffffffffffffffffffffffffffffff166111166112a4565b73ffffffffffffffffffffffffffffffffffffffff161461116c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161116390612111565b60405180910390fd5b61117660006115bf565b565b6111806115b7565b73ffffffffffffffffffffffffffffffffffffffff1661119e6112a4565b73ffffffffffffffffffffffffffffffffffffffff16146111f4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111eb90612111565b60405180910390fd5b8260a3600101819055508160a3600201819055508060a3600001819055507f03a15843dd467536caa1bb95838985b8be12418db7541eef79e7a92622313266428484846040516112479493929190612131565b60405180910390a1505050565b60a96020528060005260406000206000915090508060000154908060010154908060020154905083565b609760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000606560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60008060ac60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020604051806060016040529081600082015481526020016001820154815260200160028201548152505090506000816020015160a360020154600a6113549190611e94565b60a36001015484600001516113699190611edf565b6113739190611f68565b61137d9190612004565b905060008260400151426113919190612091565b90506000609d5460648360a360000154866113ac9190611edf565b6113b69190611edf565b6113c09190611f68565b6113ca9190611f68565b90508094505050505090565b60ac6020528060005260406000206000915090508060000154908060010154908060020154905083565b60aa602052816000526040600020602052806000526040600020600091509150508060000154908060010154905082565b609e8060000154908060010154908060020154908060030154908060040154905085565b61145d6115b7565b73ffffffffffffffffffffffffffffffffffffffff1661147b6112a4565b73ffffffffffffffffffffffffffffffffffffffff16146114d1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114c890612111565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415611541576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611538906121e8565b60405180910390fd5b61154a816115bf565b50565b600061155830611685565b15905090565b600060019054906101000a900460ff166115ad576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016115a49061227a565b60405180910390fd5b6115b56116a8565b565b600033905090565b6000606560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081606560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b600060019054906101000a900460ff166116f7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016116ee9061227a565b60405180910390fd5b6117076117026115b7565b6115bf565b565b82805482825590600052602060002090810192821561174a579160200282015b82811115611749578251829060ff16905591602001919060010190611729565b5b509050611757919061175b565b5090565b5b8082111561177457600081600090555060010161175c565b5090565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006117a88261177d565b9050919050565b6117b88161179d565b81146117c357600080fd5b50565b6000813590506117d5816117af565b92915050565b6000602082840312156117f1576117f0611778565b5b60006117ff848285016117c6565b91505092915050565b6000819050919050565b61181b81611808565b82525050565b60006060820190506118366000830186611812565b6118436020830185611812565b6118506040830184611812565b949350505050565b6000819050919050565b600061187d6118786118738461177d565b611858565b61177d565b9050919050565b600061188f82611862565b9050919050565b60006118a182611884565b9050919050565b6118b181611896565b82525050565b60006020820190506118cc60008301846118a8565b92915050565b600080600080608085870312156118ec576118eb611778565b5b60006118fa878288016117c6565b945050602061190b878288016117c6565b935050604061191c878288016117c6565b925050606061192d878288016117c6565b91505092959194509250565b61194281611808565b811461194d57600080fd5b50565b60008135905061195f81611939565b92915050565b60006020828403121561197b5761197a611778565b5b600061198984828501611950565b91505092915050565b600061199d82611884565b9050919050565b6119ad81611992565b82525050565b60006020820190506119c860008301846119a4565b92915050565b6119d78161179d565b82525050565b60006020820190506119f260008301846119ce565b92915050565b600060a082019050611a0d6000830188611812565b611a1a6020830187611812565b611a276040830186611812565b611a346060830185611812565b611a416080830184611812565b9695505050505050565b600080600060608486031215611a6457611a63611778565b5b6000611a7286828701611950565b9350506020611a8386828701611950565b9250506040611a9486828701611950565b9150509250925092565b6000611aa982611884565b9050919050565b611ab981611a9e565b82525050565b6000602082019050611ad46000830184611ab0565b92915050565b6000602082019050611aef6000830184611812565b92915050565b60008060408385031215611b0c57611b0b611778565b5b6000611b1a858286016117c6565b9250506020611b2b85828601611950565b9150509250929050565b6000604082019050611b4a6000830185611812565b611b576020830184611812565b9392505050565b600082825260208201905092915050565b7f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00600082015250565b6000611ba5601f83611b5e565b9150611bb082611b6f565b602082019050919050565b60006020820190508181036000830152611bd481611b98565b9050919050565b6000604082019050611bf060008301856119ce565b611bfd6020830184611812565b9392505050565b60008115159050919050565b611c1981611c04565b8114611c2457600080fd5b50565b600081519050611c3681611c10565b92915050565b600060208284031215611c5257611c51611778565b5b6000611c6084828501611c27565b91505092915050565b7f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160008201527f647920696e697469616c697a6564000000000000000000000000000000000000602082015250565b6000611cc5602e83611b5e565b9150611cd082611c69565b604082019050919050565b60006020820190508181036000830152611cf481611cb8565b9050919050565b6000606082019050611d1060008301866119ce565b611d1d60208301856119ce565b611d2a6040830184611812565b949350505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60008160011c9050919050565b6000808291508390505b6001851115611db857808604811115611d9457611d93611d32565b5b6001851615611da35780820291505b8081029050611db185611d61565b9450611d78565b94509492505050565b600082611dd15760019050611e8d565b81611ddf5760009050611e8d565b8160018114611df55760028114611dff57611e2e565b6001915050611e8d565b60ff841115611e1157611e10611d32565b5b8360020a915084821115611e2857611e27611d32565b5b50611e8d565b5060208310610133831016604e8410600b8410161715611e635782820a905083811115611e5e57611e5d611d32565b5b611e8d565b611e708484846001611d6e565b92509050818404811115611e8757611e86611d32565b5b81810290505b9392505050565b6000611e9f82611808565b9150611eaa83611808565b9250611ed77fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8484611dc1565b905092915050565b6000611eea82611808565b9150611ef583611808565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615611f2e57611f2d611d32565b5b828202905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000611f7382611808565b9150611f7e83611808565b925082611f8e57611f8d611f39565b5b828204905092915050565b6000604082019050611fae60008301856119ce565b611fbb60208301846119ce565b9392505050565b600081519050611fd181611939565b92915050565b600060208284031215611fed57611fec611778565b5b6000611ffb84828501611fc2565b91505092915050565b600061200f82611808565b915061201a83611808565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561204f5761204e611d32565b5b828201905092915050565b600060608201905061206f60008301866119ce565b61207c6020830185611812565b6120896040830184611812565b949350505050565b600061209c82611808565b91506120a783611808565b9250828210156120ba576120b9611d32565b5b828203905092915050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b60006120fb602083611b5e565b9150612106826120c5565b602082019050919050565b6000602082019050818103600083015261212a816120ee565b9050919050565b60006080820190506121466000830187611812565b6121536020830186611812565b6121606040830185611812565b61216d6060830184611812565b95945050505050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b60006121d2602683611b5e565b91506121dd82612176565b604082019050919050565b60006020820190508181036000830152612201816121c5565b9050919050565b7f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960008201527f6e697469616c697a696e67000000000000000000000000000000000000000000602082015250565b6000612264602b83611b5e565b915061226f82612208565b604082019050919050565b6000602082019050818103600083015261229381612257565b905091905056fea264697066735822122052d8e7528d54194ae84f933fe04dca2331bd9665db70483bd5d20ce9c935ba1464736f6c63430008080033";

type ApproveConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ApproveConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Approve__factory extends ContractFactory {
  constructor(...args: ApproveConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "Approve";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Approve> {
    return super.deploy(overrides || {}) as Promise<Approve>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Approve {
    return super.attach(address) as Approve;
  }
  connect(signer: Signer): Approve__factory {
    return super.connect(signer) as Approve__factory;
  }
  static readonly contractName: "Approve";
  public readonly contractName: "Approve";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ApproveInterface {
    return new utils.Interface(_abi) as ApproveInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Approve {
    return new Contract(address, _abi, signerOrProvider) as Approve;
  }
}
