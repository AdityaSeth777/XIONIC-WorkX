import { Window as KeplrWindow } from "@keplr-wallet/types";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";

declare global {
  interface Window extends KeplrWindow {}
}

const XION_CHAIN_ID = "xion-testnet-1";
const XION_RPC = "https://rpc.testnet.xion.network";

export async function initializeKeplr() {
  if (!window.keplr) {
    throw new Error("Keplr wallet not found! Please install Keplr extension.");
  }

  await window.keplr.experimentalSuggestChain({
    chainId: XION_CHAIN_ID,
    chainName: "XION Testnet",
    rpc: XION_RPC,
    rest: "https://api.testnet.xion.network",
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

  await window.keplr.enable(XION_CHAIN_ID);
  return window.keplr;
}

export async function getXionClient(): Promise<SigningCosmWasmClient> {
  const keplr = await initializeKeplr();
  const offlineSigner = keplr.getOfflineSigner(XION_CHAIN_ID);
  return SigningCosmWasmClient.connectWithSigner(XION_RPC, offlineSigner);
}

export async function sendXionPayment(to: string, amount: string, memo: string = '') {
  try {
    const client = await getXionClient();
    const keplr = await initializeKeplr();
    const accounts = await keplr.getOfflineSigner(XION_CHAIN_ID).getAccounts();
    const sender = accounts[0].address;
    
    const amountInUxion = (parseFloat(amount) * 1000000).toString(); // Convert XION to uxion
    
    const tx = await client.sendTokens(
      sender,
      to,
      [{ denom: "uxion", amount: amountInUxion }],
      {
        amount: [{ denom: "uxion", amount: "5000" }],
        gas: "200000",
      },
      memo
    );

    return tx;
  } catch (error) {
    console.error('Error sending XION payment:', error);
    throw error;
  }
}

export async function createMetaAccount(name: string) {
  try {
    const client = await getXionClient();
    // Here we would interact with XION's meta accounts module
    // This is a placeholder until the exact contract address and message structure is known
    console.log('Creating meta account:', name, client);
    return null;
  } catch (error) {
    console.error('Error creating meta account:', error);
    throw error;
  }
}