## Kokoro Dollar 「心ドル」 - EigenGames Demo Test Site 

A test site for the Kokoro Dollar project, made using RainbowKit, WAGMI, and Next.js.

## Features

- Connect your wallet using RainbowKit
- Deposit ETH to mint kUSD (Kokoro USD) using the KokoroVault contract
- Stake kUSD to get sKUSD (Staked Kokoro USD)
- View your balances of ETH, kUSD, and sKUSD
- Track transaction status with Etherscan links

## Contract Addresses (Sepolia Testnet)

- KokoroUSD: 0x072e391a76193D41B0A829aBAB2BEb4B8Ffb5AfE
- KokoroVault: 0xD80ac8E7cE70Abf1dF436e8aD039aBd9Cb0A8003
- StakedKokoroUSD: 0xF8a1f6ceCa02a6C565D8Ab79B84ea8d2F27Fb9BF
- RESTAKE EOA: 0x6bf57AbC67f9fCcb2c7CFac4747B82F497F00b73

## Setup Instructions

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- A WalletConnect Project ID (get one for free at [WalletConnect Cloud](https://cloud.walletconnect.com/))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/CarlZielinski/kokoro-dollar-demo-test-site.git
   cd kokoro-dollar-demo-test-site
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with the following content:
   ```
   # WalletConnect Project ID - Get one at https://cloud.walletconnect.com/
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=YOUR_WALLETCONNECT_PROJECT_ID
   
   # Enable testnets (true/false)
   NEXT_PUBLIC_ENABLE_TESTNETS=true
   
   # Contract addresses
   NEXT_PUBLIC_KOKORO_DOLLAR_ADDRESS=0x072e391a76193D41B0A829aBAB2BEb4B8Ffb5AfE
   NEXT_PUBLIC_STAKING_ADDRESS=0xF8a1f6ceCa02a6C565D8Ab79B84ea8d2F27Fb9BF
   NEXT_PUBLIC_VAULT_ADDRESS=0xD80ac8E7cE70Abf1dF436e8aD039aBd9Cb0A8003
   NEXT_PUBLIC_RESTAKE_EOA=0x6bf57AbC67f9fCcb2c7CFac4747B82F497F00b73
   ```

4. Replace `YOUR_WALLETCONNECT_PROJECT_ID` with your actual WalletConnect Project ID.

### Running the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to Use

1. Connect your wallet by clicking the "Connect Wallet" button in the top right corner.
2. Make sure you're connected to the Sepolia testnet.
3. Once connected, you'll see your ETH, kUSD, and sKUSD balances.
4. To mint kUSD, enter the amount of ETH you want to deposit in the "Deposit ETH to Mint kUSD" section and click "Deposit & Mint".
5. To stake kUSD, enter the amount of kUSD you want to stake in the "Stake kUSD for sKUSD" section, click "Approve kUSD", and then click "Stake kUSD".
6. You can track your transaction status with the provided Etherscan links.

## Contract Functionality

### KokoroVault

The KokoroVault contract allows users to deposit ETH and mint kUSD tokens. The contract was deployed at address 0xD80ac8E7cE70Abf1dF436e8aD039aBd9Cb0A8003 on the Sepolia testnet.

### KokoroUSD

The KokoroUSD contract is an ERC20 token that represents the stablecoin in the Kokoro Dollar ecosystem. It was deployed at address 0x072e391a76193D41B0A829aBAB2BEb4B8Ffb5AfE on the Sepolia testnet.

### StakedKokoroUSD

The StakedKokoroUSD contract allows users to stake their kUSD tokens and receive sKUSD tokens in return. These tokens represent a share of the staked kUSD pool and can accrue yield over time. The contract was deployed at address 0xF8a1f6ceCa02a6C565D8Ab79B84ea8d2F27Fb9BF on the Sepolia testnet.

### RESTAKE EOA

The RESTAKE EOA (Externally Owned Account) is used for restaking operations in the Kokoro Dollar ecosystem. This account has the address 0x6bf57AbC67f9fCcb2c7CFac4747B82F497F00b73 on the Sepolia testnet.

## Learn More

To learn more about the technologies used in this project:

- [RainbowKit Documentation](https://www.rainbowkit.com/docs/introduction)
- [wagmi Documentation](https://wagmi.sh/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Viem Documentation](https://viem.sh/)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
