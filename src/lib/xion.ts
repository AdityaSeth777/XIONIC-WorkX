import { Window as KeplrWindow } from "@keplr-wallet/types";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";

declare global {
  interface Window extends KeplrWindow {}
}

const XION_CHAIN_ID = "xion-testnet-1";
const XION_RPC = "https://testnet-rpc.xion-api.burnt.com";

export async function initializeKeplr() {
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

  await window.keplr.enable(XION_CHAIN_ID);
  return window.keplr;
}

export async function sendXionPayment(
  recipientAddress: string,
  amount: string,
  memo: string
): Promise<void> {
  try {
    const keplr = await initializeKeplr();
    const offlineSigner = keplr.getOfflineSigner(XION_CHAIN_ID);
    const accounts = await offlineSigner.getAccounts();
    const sender = accounts[0].address;

    const client = await SigningCosmWasmClient.connectWithSigner(
      XION_RPC,
      offlineSigner
    );

    // Convert XION to uxion (1 XION = 1,000,000 uxion)
    const amountInUxion = Math.floor(parseFloat(amount) * 1_000_000).toString();

    await client.sendTokens(
      sender,
      recipientAddress,
      [{ denom: "uxion", amount: amountInUxion }],
      {
        amount: [{ denom: "uxion", amount: "5000" }], // Standard gas fee
        gas: "200000",
      },
      memo
    );
  } catch (error) {
    console.error("Payment failed:", error);
    throw error;
  }
}