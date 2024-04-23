/* eslint-disable */
const CROWD_FUND = Object.freeze({
  ADDRESS: "0x9F5a4b0D2b0761dE8B9D9EcF2F76234D6831cf06",
  ABI: [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "Campaign",
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
      name: "fund",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "getBalance",
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
      inputs: [
        {
          internalType: "address payable",
          name: "_owner",
          type: "address",
        },
      ],
      name: "withdraw",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
});
const DEPLOY_CONTRACT = Object.freeze({
  test: "test",
});

const GENERAL = Object.freeze({
  SYMBOL: "MATIC",
  SYMBOL_COLOUR: "blue",
});

export default { CROWD_FUND, DEPLOY_CONTRACT, GENERAL };
