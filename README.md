# XION Marketplace - Decentralized Gig Economy Platform

A decentralized marketplace for freelancers and clients built on XION Network.

## Setup Instructions

1. **Clone and Install Dependencies**
   ```bash
   git clone https://github.com/AdityaSeth777/XIONary
   cd XIONary
   npm install
   ```

2. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_key

   # XION Network Configuration
   VITE_XION_CHAIN_ID=xion-testnet-1
   VITE_XION_RPC_URL=https://testnet-rpc.xion-api.burnt.com:443
   VITE_XION_REST_URL=https://testnet-api.xion-api.burnt.com
   VITE_XION_TREASURY_CONTRACT=your_treasury_contract_address
   ```

3. **Supabase Setup**
   - Create a new Supabase project
   - Create the profiles table:
   ```sql
   create table profiles (
     id uuid references auth.users on delete cascade,
     username text,
     avatar_url text,
     reputation_score float default 0,
     completed_projects int default 0,
     active_projects int default 0,
     total_earnings float default 0,
     created_at timestamp with time zone default timezone('utc'::text, now()) not null,
     primary key (id)
   );

   -- Enable RLS
   alter table profiles enable row level security;

   -- Create policies
   create policy "Public profiles are viewable by everyone"
     on profiles for select
     using ( true );

   create policy "Users can insert their own profile"
     on profiles for insert
     with check ( auth.uid() = id );

   create policy "Users can update own profile"
     on profiles for update
     using ( auth.uid() = id );
   ```

4. **Configure Supabase Authentication**
   - Go to Authentication settings in Supabase dashboard
   - Enable Email OTP (magic link) provider
   - Set up email templates for authentication
   - Add your site URL to the allowed redirect URLs

5. **XION Network Integration**
   - The project uses Abstraxion for XION Meta account integration
   - Treasury contract is pre-configured for handling payments
   - Make sure to deploy the treasury contract and update the contract address in `.env`

6. **Start Development Server**
   ```bash
   npm run dev
   ```

## Smart Contract Deployment

1. Install Rust and required tools:
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs
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
curl -L https://raw.githubusercontent.com/burnt-labs/xion/main/scripts/install.sh

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

## Features

- **Authentication**
  - Email-based authentication with magic links
  - XION Meta account integration
  - Profile management

- **Project Management**
  - Create and browse projects
  - Apply to projects
  - Track project status

- **Treasury System**
  - Smart contract-based treasury
  - Secure payment handling
  - Automatic fund distribution

- **User Profiles**
  - Reputation system
  - Project history
  - Earnings tracking

## Smart Contract Integration

The project uses the following XION Network features:

1. **Treasury Contract**
   - Handles secure fund management
   - Methods:
     - `initialize()`
     - `deposit()`
     - `withdraw(amount)`
     - `getBalance()`

2. **XION Meta Integration**
   - Social login support
   - Transaction signing
   - Account management

## Development Guidelines

1. **Code Structure**
   - React components in `src/components`
   - Pages in `src/pages`
   - Context providers in `src/context`
   - Utility functions in `src/lib`

2. **Styling**
   - Tailwind CSS for styling
   - Custom components in `src/components`
   - Responsive design patterns

3. **State Management**
   - React Context for global state
   - Supabase for data persistence
   - Smart contract state for blockchain data

## Deployment

1. **Build the Application**
   ```bash
   npm run build
   ```

2. **Deploy to Production**
   - Deploy the built files from `dist` directory
   - Update environment variables in production
   - Configure Supabase production settings

## Security Considerations

1. **Authentication**
   - Email verification required
   - Secure session management
   - Protected API routes

2. **Smart Contract**
   - Audited treasury contract
   - Secure fund management
   - Access control implementation

3. **Data Privacy**
   - Row Level Security in Supabase
   - Encrypted data transmission
   - Limited data exposure

## Troubleshooting

1. **Common Issues**
   - If magic link fails, check Supabase email settings
   - For treasury errors, verify contract address
   - Network issues: check XION RPC endpoint status

2. **Support**
   - Check issues in GitHub repository
   - Contact support team
   - Review documentation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - see LICENSE file for details