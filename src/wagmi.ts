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

// Determine if testnets should be enabled
const enableTestnets = process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true';

export const config = getDefaultConfig({
  appName: 'Kokoro Dollar Demo',
  projectId: projectId,
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    ...(enableTestnets ? [sepolia] : []),
  ],
  ssr: true, // Enable server-side rendering
});
