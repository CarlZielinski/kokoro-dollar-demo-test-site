import '../styles/global.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { 
  RainbowKitProvider, 
  darkTheme,
  lightTheme,
  type Locale 
} from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';

import { config } from '../wagmi';

// Create a client for React Query
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter() as { locale: Locale };
  
  return (
    <>
      <Head>
        <title>Kokoro Dollar - EigenGames Demo</title>
        <meta name="description" content="Kokoro Dollar (心ドル) - EigenGames Demo Test Site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider 
            locale={locale}
            initialChain={sepolia}
            theme={lightTheme({
              accentColor: '#FF2400', // Scarlet color to match the Kokoro Dollar theme
              accentColorForeground: 'white',
              borderRadius: 'medium',
              fontStack: 'system',
            })}
          >
            <Component {...pageProps} />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}

export default MyApp;
