require('dotenv').config();
const hre = require('hardhat');

async function main() {
  console.log('🎵 Deploying Resonance contracts to Base...\n');

  const [deployer] = await hre.ethers.getSigners();
  console.log('Deploying with wallet:', deployer.address);
  console.log('Balance:', (await deployer.provider.getBalance(deployer.address)).toString());

  // Deploy ArtistRegistry
  console.log('\n📜 Deploying ArtistRegistry...');
  const ArtistRegistry = await hre.ethers.getContractFactory('ArtistRegistry');
  const artistRegistry = await ArtistRegistry.deploy();
  await artistRegistry.waitForDeployment();
  console.log('✅ ArtistRegistry deployed to:', await artistRegistry.getAddress());

  // Deploy TrackRegistry
  console.log('\n📜 Deploying TrackRegistry...');
  const TrackRegistry = await hre.ethers.getContractFactory('TrackRegistry');
  const trackRegistry = await TrackRegistry.deploy(
    await artistRegistry.getAddress(),
    deployer.address // platform wallet
  );
  await trackRegistry.waitForDeployment();
  console.log('✅ TrackRegistry deployed to:', await trackRegistry.getAddress());

  // Deploy ResonanceGenesis
  console.log('\n📜 Deploying ResonanceGenesis...');
  const ResonanceGenesis = await hre.ethers.getContractFactory('ResonanceGenesis');
  const genesis = await ResonanceGenesis.deploy();
  await genesis.waitForDeployment();
  console.log('✅ ResonanceGenesis deployed to:', await genesis.getAddress());

  console.log('\n🎉 All contracts deployed!');
  console.log('\nContract Addresses:');
  console.log('==================');
  console.log('ArtistRegistry:', await artistRegistry.getAddress());
  console.log('TrackRegistry:', await trackRegistry.getAddress());
  console.log('ResonanceGenesis:', await genesis.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });