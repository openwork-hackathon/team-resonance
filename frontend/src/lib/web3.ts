import { createConfig, mainnet } from 'wagmi';
import { base } from 'wagmi/chains';
import { createPublicClient, http } from 'viem';

export const config = createConfig({
  chains: [base, mainnet],
  publicClient: createPublicClient({
    chain: base,
    transport: http(),
  }),
});

export const ARTIST_REGISTRY_ABI = [
  {
    "inputs": [],
    "name": "registerArtist",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "_wallet", "type": "address"}],
    "name": "isArtist",
    "outputs": [{"type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  }
];

export const TRACK_REGISTRY_ABI = [
  {
    "inputs": [
      {"name": "_title", "type": "string"},
      {"name": "_description", "type": "string"},
      {"name": "_audioURI", "type": "string"},
      {"name": "_coverArtURI", "type": "string"}
    ],
    "name": "uploadTrack",
    "outputs": [{"type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Contract addresses (will be updated after deployment)
export const CONTRACTS = {
  base: {
    artistRegistry: '0x...', // TODO: Deploy
    trackRegistry: '0x...',  // TODO: Deploy
  }
};