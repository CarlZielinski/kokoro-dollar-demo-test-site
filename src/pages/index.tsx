// src/pages/index.tsx
import { useState } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Home: NextPage = () => {
  const [depositAmount, setDepositAmount] = useState("");
  const [stakeAmount, setStakeAmount] = useState("");

  const handleDeposit = () => {
    console.log("Deposit clicked. Amount:", depositAmount);
  };

  const handleApprove = () => {
    console.log("Approve clicked. Stake amount:", stakeAmount);
  };

  const handleStake = () => {
    console.log("Stake clicked. Stake amount:", stakeAmount);
  };

  return (
    <div style={styles.container}>
      {/* Nav Bar */}
      <header style={styles.navbar}>
        <div style={styles.navLeft}>
          <Link href="/" style={styles.navLink}>Home</Link>
          <Link href="/about" style={styles.navLink}>About</Link>
        </div>
        <div style={styles.navRight}>
          <ConnectButton />
        </div>
      </header>

      {/* Main Title Section */}
      <main style={styles.main}>
        <div style={styles.titleContainer}>
          <h1 style={styles.title}>Kokoro Dollar</h1>
          <h2 style={styles.subtitle}>心</h2>
        </div>

        {/* Deposit and Staking Row */}
        <div style={styles.row}>
          {/* Deposit Section */}
          <div style={styles.column}>
            <h2 style={styles.sectionTitle}>Deposit ETH to Mint kUSD</h2>
            <input 
              type="text" 
              placeholder="Amount in ETH" 
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              style={styles.input}
            />
            <button style={styles.button} onClick={handleDeposit}>
              Deposit & Mint
            </button>
          </div>

          {/* Staking Section */}
          <div style={styles.column}>
            <h2 style={styles.sectionTitle}>Stake kUSD for sKUSD</h2>
            <input 
              type="text" 
              placeholder="Amount in kUSD" 
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              style={styles.input}
            />
            <div style={styles.stakingButtons}>
              <button style={styles.button} onClick={handleApprove}>
                Approve kUSD
              </button>
              <button style={styles.button} onClick={handleStake}>
                Stake kUSD
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    fontFamily: "'Montserrat', sans-serif",
    minHeight: '100vh',
    backgroundColor: '#FFE6F2', // Background color set to #FFE6F2
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  navLeft: {
    display: 'flex',
    gap: '20px',
  },
  navLink: {
    textDecoration: 'none',
    color: '#333',
    fontWeight: 500,
    fontSize: '1rem',
  },
  navRight: {},
  main: {
    textAlign: 'center',
    padding: '40px 20px',
  },
  titleContainer: {
    marginBottom: '40px',
  },
  title: {
    fontSize: '3rem',
    margin: 0,
    color: '#FF2400', // Scarlet color for title
    fontFamily: "'Pacifico', cursive", // Bubbly font
  },
  subtitle: {
    fontSize: '2rem',
    margin: 0,
    color: '#FF2400', // Scarlet color for Japanese heart
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    gap: '60px',
    flexWrap: 'wrap',
  },
  column: {
    flex: '1 1 300px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    marginBottom: '20px',
  },
  input: {
    width: '200px', // Fixed width for input boxes
    padding: '8px 12px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginBottom: '15px',
    fontSize: '1rem',
  },
  button: {
    backgroundColor: '#00aaff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    fontSize: '1rem',
    cursor: 'pointer',
    marginRight: '10px',
    marginBottom: '10px',
  },
  stakingButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
};

export default Home;
