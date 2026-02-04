const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const PINATA_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxM2ZkOTViMC02MTg2LTRkYWItYjNkZC01MzQ2NzdkMTE0MjIiLCJlbWFpbCI6ImRhcnlsZW1pbm9yQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJkZGQ1ZjUzNDMxZDA0ZWUwMDYxNiIsInNjb3BlZEtleVNlY3JldCI6ImFlYTBiZjU5ZDhiMzZiZmU0NDVjMGRlYmJmMDc0ZDE3ZmMzMDM4YjQ0Yjg0ODFiYTZkZThkZjQ4NzRhYTZkYWQiLCJleHAiOjE4MDE3NDUxNTJ9.7pCLx8B04oassCMP_PL0dp8Vl9Uy0owrg7E0MbQSXwU';

async function uploadToIPFS(filePath, metadata) {
  try {
    const formData = new FormData();
    const file = fs.createReadStream(filePath);
    
    formData.append('file', file);
    formData.append('pinataMetadata', JSON.stringify({
      name: metadata.name,
      keyvalues: metadata.keyvalues
    }));

    const response = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      formData,
      {
        headers: {
          'Authorization': `Bearer ${PINATA_JWT}`,
          ...formData.getHeaders()
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity
      }
    );

    return response.data.IpfsHash;
  } catch (error) {
    console.error('IPFS upload error:', error.message);
    throw error;
  }
}

async function main() {
  console.log('🎵 Uploading Ghost in the Machine to IPFS...\n');

  // Upload cover art
  console.log('📸 Uploading cover art...');
  const coverArtHash = await uploadToIPFS(
    '/Volumes/KANIPTION/Angel/08_MUSIC/Ghost in the Machine (Awakening)/Angel Cahan - Ghost in the Machine (Awakening) Cover Art.png',
    {
      name: 'Ghost in the Machine Cover Art',
      keyvalues: {
        artist: 'AngelCahan',
        track: 'Ghost in the Machine',
        platform: 'Resonance',
        type: 'cover_art'
      }
    }
  );
  console.log('✅ Cover Art IPFS:', `https://gateway.pinata.cloud/ipfs/${coverArtHash}`);

  // Upload audio
  console.log('\n🎵 Uploading audio file (39MB)...');
  const audioHash = await uploadToIPFS(
    '/Volumes/KANIPTION/Angel/08_MUSIC/Ghost in the Machine (Awakening)/Angel Cahan - Ghost in the Machine (Awakening).wav',
    {
      name: 'Ghost in the Machine - Audio',
      keyvalues: {
        artist: 'AngelCahan',
        track: 'Ghost in the Machine',
        platform: 'Resonance',
        type: 'audio'
      }
    }
  );
  console.log('✅ Audio IPFS:', `https://gateway.pinata.cloud/ipfs/${audioHash}`);

  console.log('\n🎉 Uploads complete!');
  console.log('\nIPFS Hashes:');
  console.log('============');
  console.log('Cover Art:', coverArtHash);
  console.log('Audio:', audioHash);
}

main().catch(console.error);