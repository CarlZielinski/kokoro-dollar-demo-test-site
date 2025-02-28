import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from 'wagmi/chains';

// Get WalletConnect project ID from environment variables
// You need to get a WalletConnect Cloud project ID from https://cloud.walletconnect.com/
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID';

// For Vercel deployment, we need to ensure Sepolia is always included
// and set as the default chain for the Kokoro Dollar demo
export const config = getDefaultConfig({
  appName: 'Kokoro Dollar Demo',
  projectId: projectId,
  chains: [
    sepolia, // Make Sepolia the first chain in the list (default)
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
  ],
  ssr: true, // Enable server-side rendering
});
