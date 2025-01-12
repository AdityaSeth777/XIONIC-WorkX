import init, { XionMarketplace } from '../../contracts/xion-marketplace/pkg';

let marketplace: XionMarketplace | null = null;

export async function initXionMarketplace() {
  if (!marketplace) {
    await init();
    marketplace = new XionMarketplace('https://rpc.testnet.xion.network');
  }
  return marketplace;
}

export async function sendXionPayment(to: string, amount: string, memo: string = '') {
  const marketplace = await initXionMarketplace();
  
  try {
    const result = await marketplace.send_payment({
      to,
      amount: (parseFloat(amount) * 1000000).toString(), // Convert to uxion
      memo
    });
    return result;
  } catch (error) {
    console.error('Error sending XION payment:', error);
    throw error;
  }
}

export async function createMetaAccount(name: string) {
  const marketplace = await initXionMarketplace();
  
  try {
    const result = await marketplace.create_meta_account(name);
    return result;
  } catch (error) {
    console.error('Error creating meta account:', error);
    throw error;
  }
}