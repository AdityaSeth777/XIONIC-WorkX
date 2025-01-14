import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { GasPrice } from '@cosmjs/stargate';

const TREASURY_CONTRACT = import.meta.env.VITE_XION_TREASURY_CONTRACT;

export async function initializeTreasury(signingClient: SigningCosmWasmClient, sender: string) {
  try {
    const msg = { initialize: {} };
    const fee = {
      amount: [{ amount: '5000', denom: 'uxion' }],
      gas: '200000',
    };

    const result = await signingClient.execute(
      sender,
      TREASURY_CONTRACT,
      msg,
      fee,
      'Initialize treasury'
    );

    return result;
  } catch (error) {
    console.error('Failed to initialize treasury:', error);
    throw error;
  }
}

export async function depositToTreasury(
  signingClient: SigningCosmWasmClient,
  sender: string,
  amount: string
) {
  try {
    const msg = { deposit: {} };
    const fee = {
      amount: [{ amount: '5000', denom: 'uxion' }],
      gas: '200000',
    };
    const funds = [{ amount, denom: 'uxion' }];

    const result = await signingClient.execute(
      sender,
      TREASURY_CONTRACT,
      msg,
      fee,
      'Deposit to treasury',
      funds
    );

    return result;
  } catch (error) {
    console.error('Failed to deposit to treasury:', error);
    throw error;
  }
}

export async function withdrawFromTreasury(
  signingClient: SigningCosmWasmClient,
  sender: string,
  amount: string
) {
  try {
    const msg = { withdraw: { amount } };
    const fee = {
      amount: [{ amount: '5000', denom: 'uxion' }],
      gas: '200000',
    };

    const result = await signingClient.execute(
      sender,
      TREASURY_CONTRACT,
      msg,
      fee,
      'Withdraw from treasury'
    );

    return result;
  } catch (error) {
    console.error('Failed to withdraw from treasury:', error);
    throw error;
  }
}

export async function getTreasuryBalance(client: SigningCosmWasmClient) {
  try {
    const result = await client.queryContractSmart(TREASURY_CONTRACT, {
      get_balance: {}
    });
    return result.balance;
  } catch (error) {
    console.error('Failed to get treasury balance:', error);
    throw error;
  }
}