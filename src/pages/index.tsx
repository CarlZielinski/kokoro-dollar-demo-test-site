// src/pages/index.tsx
import { useState } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useBalance, useWriteContract, useReadContract } from 'wagmi';
import { parseEther, formatEther } from 'viem';

// Import contract configurations
import { 
  contracts, 
  KOKORO_DOLLAR_ADDRESS, 
  STAKING_ADDRESS, 
  VAULT_ADDRESS,
  kokoroUsdABI,
  kokoroStakingABI,
  kokoroVaultABI
} from '../contracts';

const Home: NextPage = () => {
  const [depositAmount, setDepositAmount] = useState("");
  const [stakeAmount, setStakeAmount] = useState("");
  const [isDepositing, setIsDepositing] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [isStaking, setIsStaking] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  
  // Get account information
  const { address, isConnected } = useAccount();
  
  // Get ETH balance
  const { data: ethBalance } = useBalance({
    address,
  });
  
  // Get kUSD balance
  const { data: kusdBalance, refetch: refetchKusdBalance } = useReadContract({
    address: KOKORO_DOLLAR_ADDRESS,
    abi: kokoroUsdABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });
  
  // Get staked kUSD balance
  const { data: stakedBalance, refetch: refetchStakedBalance } = useReadContract({
    address: STAKING_ADDRESS,
    abi: kokoroStakingABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });
  
  // Contract write hooks
  const { writeContractAsync: depositEth } = useWriteContract();
  const { writeContractAsync: approveKusd } = useWriteContract();
  const { writeContractAsync: stakeKusd } = useWriteContract();

  const handleDeposit = async () => {
    if (!isConnected || !depositAmount) return;
    
    try {
      setIsDepositing(true);
      setTxHash(null);
      
      const hash = await depositEth({
        address: VAULT_ADDRESS,
        abi: kokoroVaultABI,
        functionName: 'depositAndMint',
        value: parseEther(depositAmount),
      });
      
      setTxHash(hash);
      
      // Reset input after successful transaction
      setDepositAmount("");
      
      // Refetch balances
      await refetchKusdBalance();
    } catch (error) {
      console.error("Error depositing ETH:", error);
    } finally {
      setIsDepositing(false);
    }
  };

  const handleApprove = async () => {
    if (!isConnected || !stakeAmount) return;
    
    try {
      setIsApproving(true);
      setTxHash(null);
      
      const hash = await approveKusd({
        address: KOKORO_DOLLAR_ADDRESS,
        abi: kokoroUsdABI,
        functionName: 'approve',
        args: [STAKING_ADDRESS, parseEther(stakeAmount)],
      });
      
      setTxHash(hash);
    } catch (error) {
      console.error("Error approving kUSD:", error);
    } finally {
      setIsApproving(false);
    }
  };

  const handleStake = async () => {
    if (!isConnected || !stakeAmount) return;
    
    try {
      setIsStaking(true);
      setTxHash(null);
      
      const hash = await stakeKusd({
        address: STAKING_ADDRESS,
        abi: kokoroStakingABI,
        functionName: 'stake',
        args: [parseEther(stakeAmount)],
      });
      
      setTxHash(hash);
      
      // Reset input after successful transaction
      setStakeAmount("");
      
      // Refetch balances
      await Promise.all([refetchKusdBalance(), refetchStakedBalance()]);
    } catch (error) {
      console.error("Error staking kUSD:", error);
    } finally {
      setIsStaking(false);
    }
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

        {/* Transaction Hash */}
        {txHash && (
          <div style={styles.txContainer}>
            <p style={styles.txText}>
              Transaction submitted: <a href={`https://sepolia.etherscan.io/tx/${txHash}`} target="_blank" rel="noopener noreferrer" style={styles.txLink}>{txHash.slice(0, 10)}...{txHash.slice(-8)}</a>
            </p>
          </div>
        )}

        {/* Wallet Status */}
        {isConnected && (
          <div style={styles.balanceContainer}>
            <p style={styles.balanceText}>
              ETH Balance: {ethBalance ? formatEther(ethBalance.value) : '0'} ETH
            </p>
            <p style={styles.balanceText}>
              kUSD Balance: {kusdBalance ? formatEther(kusdBalance as bigint) : '0'} kUSD
            </p>
            <p style={styles.balanceText}>
              Staked kUSD: {stakedBalance ? formatEther(stakedBalance as bigint) : '0'} sKUSD
            </p>
          </div>
        )}

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
              disabled={!isConnected || isDepositing}
            />
            <button 
              style={isConnected && !isDepositing ? styles.button : styles.buttonDisabled} 
              onClick={handleDeposit}
              disabled={!isConnected || isDepositing}
            >
              {isDepositing ? 'Processing...' : 'Deposit & Mint'}
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
              disabled={!isConnected || isApproving || isStaking}
            />
            <div style={styles.stakingButtons}>
              <button 
                style={isConnected && !isApproving ? styles.button : styles.buttonDisabled} 
                onClick={handleApprove}
                disabled={!isConnected || isApproving}
              >
                {isApproving ? 'Approving...' : 'Approve kUSD'}
              </button>
              <button 
                style={isConnected && !isStaking ? styles.button : styles.buttonDisabled} 
                onClick={handleStake}
                disabled={!isConnected || isStaking}
              >
                {isStaking ? 'Staking...' : 'Stake kUSD'}
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
  txContainer: {
    backgroundColor: 'rgba(0, 170, 255, 0.1)',
    borderRadius: '8px',
    padding: '10px',
    marginBottom: '20px',
    display: 'inline-block',
  },
  txText: {
    margin: '0',
    fontSize: '0.9rem',
  },
  txLink: {
    color: '#00aaff',
    textDecoration: 'none',
  },
  balanceContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '30px',
    display: 'inline-block',
  },
  balanceText: {
    margin: '5px 0',
    fontSize: '1rem',
    fontWeight: 500,
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
  buttonDisabled: {
    backgroundColor: '#cccccc',
    color: '#666666',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    fontSize: '1rem',
    cursor: 'not-allowed',
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
