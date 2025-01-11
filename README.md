# XION Marketplace - Decentralized Gig Economy Platform

A decentralized marketplace for freelancers and clients built on XION Network.

## Smart Contract Deployment

1. Install dependencies:
```bash
npm install -g truffle
```

2. Configure your wallet:
- Install MetaMask browser extension
- Add XION Network to MetaMask:
  - Network Name: XION Network
  - RPC URL: https://rpc.xion.network
  - Chain ID: 1337
  - Symbol: XION

3. Deploy contracts:
```bash
truffle migrate --network xion
```

## Development Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env` file with:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

3. Run development server:
```bash
npm run dev
```

## Features

- Smart contract-based escrow system
- Milestone-based payments
- On-chain reputation system
- Real-time project tracking
- Secure wallet integration

## Architecture

- Frontend: React + TypeScript + Tailwind CSS
- Backend: Supabase
- Blockchain: XION Network
- Smart Contracts: Solidity
- Wallet: MetaMask integration