import { Window as KeplrWindow } from "@keplr-wallet/types";

declare global {
  interface Window extends KeplrWindow {}
}

const XION_CHAIN_ID = "xion-testnet-1";

const getKeplr = async () => {
  if (!window.keplr) {
    throw new Error("Keplr wallet not found! Please install Keplr extension.");
  }
  
  await window.keplr.experimentalSuggestChain({
    chainId: XION_CHAIN_ID,
    chainName: "XION Testnet",
    rpc: "https://rpc.testnet.xion.network",
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
      },
    ],
    stakeCurrency: {
      coinDenom: "XION",
      coinMinimalDenom: "uxion",
      coinDecimals: 6,
    },
    gasPriceStep: {
      low: 0.01,
      average: 0.025,
      high: 0.04,
    },
  });

  return window.keplr;
};

export async function connectWallet() {
  try {
    const keplr = await getKeplr();
    await keplr.enable(XION_CHAIN_ID);
    
    const offlineSigner = window.keplr.getOfflineSigner(XION_CHAIN_ID);
    const accounts = await offlineSigner.getAccounts();
    const address = accounts[0].address;
    
    // Get balance
    const client = await window.keplr.getSigningCosmWasmClient(XION_CHAIN_ID);
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
}

export async function sendPayment(to: string, amount: string) {
  try {
    const keplr = await getKeplr();
    const offlineSigner = window.keplr.getOfflineSigner(XION_CHAIN_ID);
    const client = await window.keplr.getSigningCosmWasmClient(XION_CHAIN_ID);
    const accounts = await offlineSigner.getAccounts();
    
    const amountInUxion = (parseFloat(amount) * 1000000).toString(); // Convert XION to uxion
    
    const tx = await client.sendTokens(
      accounts[0].address,
      to,
      [{ denom: "uxion", amount: amountInUxion }],
      "auto"
    );

    return tx;
  } catch (error) {
    console.error('Error sending payment:', error);
    throw error;
  }
}