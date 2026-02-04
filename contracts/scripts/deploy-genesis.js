require('dotenv').config();
const hre = require('hardhat');

async function main() {
  console.log('🎵 Deploying ResonanceGenesis...\n');

  const [deployer] = await hre.ethers.getSigners();
  console.log('Deploying with wallet:', deployer.address);

  const ResonanceGenesis = await hre.ethers.getContractFactory('ResonanceGenesis');
  const genesis = await ResonanceGenesis.deploy();
  await genesis.waitForDeployment();
  
  console.log('✅ ResonanceGenesis deployed to:', await genesis.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
