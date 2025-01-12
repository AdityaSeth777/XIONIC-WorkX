# XION Marketplace - Decentralized Gig Economy Platform

A decentralized marketplace for freelancers and clients built on XION Network.

## Prerequisites

1. Install Keplr Wallet:
   - Install the [Keplr browser extension](https://www.keplr.app/)
   - Create a new wallet or import existing one
   - Keep your seed phrase safe!

2. Get XION Testnet Tokens:
   - Visit the [XION Faucet](https://faucet.testnet.burnt.com)
   - Enter your Keplr wallet address
   - Receive test XION tokens

## Smart Contract Deployment

1. Install Rust and required tools:
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustup target add wasm32-unknown-unknown
cargo install cargo-generate
```

2. Build the smart contracts:
```bash
cd contracts/xion-marketplace
cargo build --target wasm32-unknown-unknown --release
```

3. Set up XION CLI and deploy:
```bash
# Install XION CLI
curl -L https://raw.githubusercontent.com/burnt-labs/xion/main/scripts/install.sh | bash

# Configure CLI for testnet
xiond config chain-id xion-testnet-1
xiond config node https://testnet-rpc.xion-api.burnt.com:443
xiond config broadcast-mode block
xiond config output json

# Add your key to the keyring (replace KEY_NAME with your preferred name)
# Use the same mnemonic as your Keplr wallet to ensure access to your funds
xiond keys add KEY_NAME --recover

# Deploy contract (replace KEY_NAME with the name you used above)
xiond tx wasm store ./target/wasm32-unknown-unknown/release/xion_marketplace.wasm \
  --from KEY_NAME \
  --gas-prices 0.025uxion \
  --gas auto \
  --gas-adjustment 1.3 \
  -y
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

## Using the Application

1. Connect Keplr Wallet:
   - Click "Connect Wallet" in the top right
   - Approve the connection in Keplr
   - Your XION balance will be displayed

2. Create a Project:
   - Click "Create Project"
   - Fill in project details
   - Submit with connected wallet

3. Apply for Projects:
   - Browse available projects
   - Click "Apply & Pay" on interesting projects
   - Confirm transaction in Keplr

4. Smart Contract Features:
   - Escrow system for secure payments
   - Work completion verification
   - Payment release mechanism
   - Dispute resolution system

## Smart Contract Architecture

### Escrow Contract

The main escrow contract (`contracts/xion-marketplace/src/escrow.rs`) handles:

1. Project Creation:
   - Client deposits funds
   - Freelancer is assigned
   - Payment amount is locked

2. Work Flow:
   - Freelancer marks work as complete
   - Client reviews and releases payment
   - Disputes can be raised by either party

3. Payment Release:
   - Automatic transfer to freelancer
   - Gas fees handled by contract

Example usage:

```rust
// Create new escrow
let msg = InstantiateMsg {
    client: "xion1...".to_string(),
    freelancer: "xion1...".to_string(),
    amount: Uint128::new(1000000), // 1 XION
};

// Mark work complete
let complete_msg = ExecuteMsg::CompleteWork {};

// Release payment
let release_msg = ExecuteMsg::ReleasePayment {};
```

## Security Features

- Row Level Security in Supabase
- Smart contract access controls
- Secure wallet integration
- Escrow-based payments
- Dispute resolution mechanism

## Network Configuration

The application connects to XION Testnet with these endpoints:
- RPC: https://testnet-rpc.xion-api.burnt.com:443
- REST: https://testnet-api.xion-api.burnt.com
- Chain ID: xion-testnet-1

## Troubleshooting

If you encounter connection issues:
1. Ensure you're using the correct RPC endpoint with port 443
2. Check that your key is properly imported and has funds
3. Verify the chain-id matches the testnet
4. Make sure the gas prices are set correctly