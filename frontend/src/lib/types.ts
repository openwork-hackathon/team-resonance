export interface Track {
  id: number;
  title: string;
  artistName: string;
  artistAddress: string;
  description: string;
  audioIpfsHash: string;
  coverArtIpfsHash: string;
  duration: number;
  genre: string;
  royaltyArtist: number;
  royaltyPlatform: number;
  royaltyListeners: number;
}

export interface Artist {
  wallet: string;
  name: string;
  bio: string;
  avatarUrl: string;
  verified: boolean;
  registeredAt: number;
}