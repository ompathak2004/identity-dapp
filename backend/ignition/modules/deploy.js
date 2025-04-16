const hre = require("hardhat");

async function main() {
  const Identity = await hre.ethers.getContractFactory("Identity");
  const identity = await Identity.deploy();
  await identity.waitForDeployment(); // Changed from deployed()
  console.log("Contract deployed to:", await identity.getAddress()); // Changed from identity.address
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});