import { Window as KeplrWindow } from "@keplr-wallet/types";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";

declare global {
  interface Window extends KeplrWindow {}
}

const XION_CHAIN_ID = "xion-testnet-1";
const XION_RPC = "https://testnet-rpc.xion-api.burnt.com";

export const getKeplr = async () => {
  if (!window.keplr) {
    throw new Error("Keplr wallet not found! Please install Keplr extension.");
  }
  
  await window.keplr.experimentalSuggestChain({
    chainId: XION_CHAIN_ID,
    chainName: "XION Testnet",
    rpc: XION_RPC,
    rest: "https://testnet-api.xion-api.burnt.com",
    bip44: {
      coinType: 118,
    },
    bech32Config: {
      bech32PrefixAccAddr: "xion",
      bech32PrefixAccPub: "xionpub",
      bech32PrefixValAddr: "xionvaloper",
      bech32PrefixValPub: "xionvaloperpub",
      bech32PrefixConsAddr: "xionvalcons",
      bech32PrefixConsPub: "xionvalconspub",
    },
    currencies: [
      {
        coinDenom: "XION",
        coinMinimalDenom: "uxion",
        coinDecimals: 6,
      },
    ],
    feeCurrencies: [
      {
        coinDenom: "XION",
        coinMinimalDenom: "uxion",
        coinDecimals: 6,
        gasPriceStep: {
          low: 0.01,
          average: 0.025,
          high: 0.04,
        },
      },
    ],
    stakeCurrency: {
      coinDenom: "XION",
      coinMinimalDenom: "uxion",
      coinDecimals: 6,
    },
  });

  return window.keplr;
};

export const connectWallet = async () => {
  try {
    const keplr = await getKeplr();
    await keplr.enable(XION_CHAIN_ID);
    
    const offlineSigner = window.keplr.getOfflineSigner(XION_CHAIN_ID);
    const accounts = await offlineSigner.getAccounts();
    const address = accounts[0].address;
    
    // Create CosmWasm client
    const client = await SigningCosmWasmClient.connectWithSigner(
      XION_RPC,
      offlineSigner
    );
    
    // Get balance
    const balance = await client.getBalance(address, "uxion");
    
    return {
      address,
      balance: (parseInt(balance.amount) / 1000000).toString(), // Convert from uxion to XION
      signer: offlineSigner
    };
  } catch (error) {
    console.error('Error connecting to Keplr:', error);
    throw error;
  }
};