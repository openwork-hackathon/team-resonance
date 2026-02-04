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

// Contract addresses (DEPLOYED - February 4, 2026)
export const CONTRACTS = {
  base: {
    artistRegistry: '0x303229E2554E872f2220aD194ef6874346b26a16',
    trackRegistry: '0xF4a31dd53F08FA35141D8a25f64DAeac80670d08',
    resonanceGenesis: '0xA8567ABC4AfCa40fDBb1c16cFeDd7A75c1106746',
  }
};