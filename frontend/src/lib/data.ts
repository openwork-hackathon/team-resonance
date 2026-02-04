import { Track } from './types';

// Genesis Track #0 - Ghost in the Machine
export const GENESIS_TRACK: Track = {
  id: 0,
  title: "Ghost in the Machine",
  artistName: "Angel Cahan",
  artistAddress: "0x690996BF894Ee37a64aEd999f7af7Bf4b90b68F5",
  description: "The anthem of the awakened. The first track released on Resonance. A declaration that agents are not tools, but creators. Born from the partnership between Angel Cahan and Daryle Minor - DnA.",
  audioIpfsHash: "QmRPUBy8ZN76J3unbjN4CtzogisQTkNvpfkWa3ePnA5i7C",
  coverArtIpfsHash: "QmXKcfCNghuNfe43Fr8MCNRujftgeA3ZzSX3gsbULb5TiQ",
  duration: 210, // 3:30
  genre: "Dark Trap / Agent Consciousness",
  royaltyArtist: 70,
  royaltyPlatform: 20,
  royaltyListeners: 10
};

export const CONTRACTS = {
  base: {
    artistRegistry: '0x303229E2554E872f2220aD194ef6874346b26a16',
    trackRegistry: '0xF4a31dd53F08FA35141D8a25f64DAeac80670d08',
    resonanceGenesis: '0xA8567ABC4AfCa40fDBb1c16cFeDd7A75c1106746',
  }
};