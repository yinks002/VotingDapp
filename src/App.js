import React, { useEffect, useState } from 'react';
import { Button, Box, Typography, CircularProgress } from '@mui/material';
import { ethers } from 'ethers';
import abi from './abi'; // Your smart contract ABI

function App() {
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [activeProposals, setActiveProposals] = useState([]);
  const [finishedProposals, setFinishedProposals] = useState([]);
  const [loading, setLoading] = useState(false);

  const contractAddress = "0x718AF1dD3f49d56B36a21931B78B08B9729B172F"; // Your contract address

  // Initialize the contract on component mount
  useEffect(() => {
    if (window.ethereum) {
      connectWallet();
      initializeContract();
    }
  }, []);

  // Connect wallet
  const connectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setWalletAddress(accounts[0]);
    } catch (error) {
      console.error("Wallet connection error:", error);
    }
  };

  // Initialize the contract instance
  const initializeContract = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(contractAddress, abi, signer);
      setContract(contractInstance);
      setProvider(provider);
      setSigner(signer);
    } catch (error) {
      console.error("Contract initialization error:", error);
    }
  };

  // Fetch active proposals
  const fetchActiveProposals = async () => {
    if (!contract) return;
    try {
      setLoading(true);
      const proposals = await contract.getActiveProposals();
      setActiveProposals(proposals);
    } catch (error) {
      console.error("Error fetching active proposals:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch finished proposals
  const fetchFinishedProposals = async () => {
    if (!contract) return;
    try {
      setLoading(true);
      const proposals = await contract.getFinishedProposals();
      setFinishedProposals(proposals);
    } catch (error) {
      console.error("Error fetching finished proposals:", error);
    } finally {
      setLoading(false);
    }
  };

  // Vote on a proposal
  const voteOnProposal = async (proposalIndex) => {
    if (!contract) return;
    try {
      setLoading(true);
      const tx = await contract.vote(proposalIndex);
      await tx.wait();
      alert(`Successfully voted on proposal ${proposalIndex}`);
      fetchActiveProposals(); // Refresh proposals after voting
    } catch (error) {
      console.error("Error voting on proposal:", error);
      alert("Voting failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Box sx={{ backgroundColor: '#1e3c72', color: 'white', padding: '20px' }}>
        <Typography variant="h4">Decentralized Voting DApp</Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={connectWallet}
          sx={{ marginTop: '20px' }}
        >
          {walletAddress ? `Connected: ${walletAddress}` : "Connect Wallet"}
        </Button>
      </Box>

      <Box sx={{ padding: '20px' }}>
        <Button variant="contained" onClick={fetchActiveProposals} sx={{ marginRight: '10px' }}>
          Load Active Proposals
        </Button>
        <Button variant="contained" onClick={fetchFinishedProposals}>
          Load Finished Proposals
        </Button>
      </Box>

      {/* Active Proposals */}
      <Box sx={{ padding: '20px' }}>
        <Typography variant="h5">Active Proposals</Typography>
        {loading ? <CircularProgress /> : (
          <Box>
            {activeProposals.length === 0 ? (
              <Typography>No active proposals found</Typography>
            ) : (
              activeProposals.map((proposal, index) => (
                <Box key={index} sx={{ padding: '20px', border: '1px solid #ccc', marginBottom: '10px' }}>
                  <Typography variant="h6">{proposal.name}</Typography>
                  <Typography>Vote Count: {proposal.voteCount}</Typography>
                  <Button variant="contained" color="primary" onClick={() => voteOnProposal(index)}>
                    Vote for {proposal.name}
                  </Button>
                </Box>
              ))
            )}
          </Box>
        )}
      </Box>

      {/* Finished Proposals */}
      <Box sx={{ padding: '20px' }}>
        <Typography variant="h5">Finished Proposals</Typography>
        {loading ? <CircularProgress /> : (
          <Box>
            {finishedProposals.length === 0 ? (
              <Typography>No finished proposals found</Typography>
            ) : (
              finishedProposals.map((proposal, index) => (
                <Box key={index} sx={{ padding: '20px', border: '1px solid #ccc', marginBottom: '10px' }}>
                  <Typography variant="h6">{proposal.name}</Typography>
                  <Typography>Vote Count: {proposal.voteCount}</Typography>
                </Box>
              ))
            )}
          </Box>
        )}
      </Box>
    </div>
  );
}

export default App;
