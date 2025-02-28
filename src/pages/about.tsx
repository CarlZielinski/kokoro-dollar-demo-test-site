import type { NextPage } from 'next';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';

const About: NextPage = () => {
  return (
    <div style={{ padding: 20 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <nav>
          <Link href="/" style={{ marginRight: 10 }}>Home</Link> | <Link href="/about" style={{ marginLeft: 10 }}>About</Link>
        </nav>
        <ConnectButton />
      </header>
      <main>
        <h1>About Kokoro Dollar</h1>
        <p>
          <strong>Kokoro Dollar 「心ドル」</strong><br />
          Tagline: "Kokoro Dollar: Return to the Heart of Crypto with Stablecoins that Earn Native Yield."
        </p>
        <p>
          Kokoro Dollar / KokoroUSD (kUSD) is a decentralized stablecoin prototype that aims to bring trust-minimized, yield-bearing functionality back to the core principles of crypto. Instead of relying on off-chain fiat reserves, KokoroUSD leverages on-chain restaked Ethereum (via EigenLayer and P2P.org) combined with AI agent infrastructure to manage user interactions.
        </p>
        <h2>Key Features</h2>
        <ul>
          <li><strong>Centralized Collateral:</strong> Many stablecoins rely on off-chain fiat reserves, but KokoroUSD avoids this.</li>
          <li><strong>Trust Minimization:</strong> Yield generation is kept on-chain through EigenLayer restaking.</li>
          <li><strong>Native Yield:</strong> By restaking ETH, yield is generated without bridging fiat or requiring off-chain banks.</li>
          <li><strong>AI Agents:</strong> A user-friendly interface (using Autonome) orchestrates deposits, staking, and yield management.</li>
        </ul>
        <h2>Disclaimer</h2>
        <p>
          This repository is a hackathon implementation. Some components (e.g., ephemeral EOA) are not trust-minimized. The code is not audited and is for demonstration purposes only.
        </p>
        
        <div style={{ marginTop: 40, borderTop: '1px solid #eaeaea', paddingTop: 20 }}>
          <p style={{ textAlign: 'center' }}>
            Built by <a href="https://x.com/CarlZielinski" target="_blank" rel="noopener noreferrer">Carl Zielinski</a> and <a href="https://x.com/JerryJYZhang" target="_blank" rel="noopener noreferrer">Jianyi Zhang</a>. 
            <br />
            Promoted by <a href="https://x.com/kokoro_dollar" target="_blank" rel="noopener noreferrer">kokoro</a> on X.
          </p>
        </div>
      </main>
    </div>
  );
};

export default About;
