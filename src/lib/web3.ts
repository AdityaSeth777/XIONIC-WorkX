import { ethers } from 'ethers';

export async function connectWallet() {
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed');
  }

  try {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    const balance = await provider.getBalance(address);
    
    return {
      address,
      balance: ethers.formatEther(balance),
      signer
    };
  } catch (error) {
    console.error('Error connecting to MetaMask:', error);
    throw error;
  }
}

export async function sendPayment(to: string, amount: string) {
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed');
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    
    const tx = await signer.sendTransaction({
      to,
      value: ethers.parseEther(amount)
    });

    return await tx.wait();
  } catch (error) {
    console.error('Error sending payment:', error);
    throw error;
  }
}