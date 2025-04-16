import IdentityABI from "../../../backend/artifacts/contracts/Identity.sol/Identity.json";

export const CONTRACT_ADDRESS = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"; // Update this!
export const CONTRACT_ABI = IdentityABI.abi;


// run  npx hardhat run ignition/modules/deploy.js --network localhost
// npx hardhat node
// Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/
// npx hardhat compite to generate identity.json