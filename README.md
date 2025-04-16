# Identity DApp

A decentralized identity management application built with Hardhat, Solidity, and React.

## 🔧 Backend Setup

1. **Setup the project**
```bash
cd backend
npm i
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
npx hardhat init
# Choose "Create a JavaScript project"
```

2. **Create Identity Contract**
Create `contracts/Identity.sol` with your identity contract code.

3. **Compile Contract**
```bash
npx hardhat compile
```
This generates `artifacts/contracts/Identity.sol/Identity.json` needed by frontend.

4. **Start Local Blockchain**
```bash
npx hardhat node
```
Keep this terminal running.

5. **Deploy Contract**
In a new terminal:
```bash
npx hardhat run scripts/deploy.js --network localhost
```
Save the deployed contract address - you'll need it for the frontend.

## 🎨 Frontend Setup

1. **Install Dependencies**
```bash
cd frontend
npm install
npm install ethers@6.13.5
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

2. **Configure Contract**
Update `src/utils/contract.js` with your deployed contract address:
```javascript
export const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
```

3. **Start Frontend**
```bash
npm run dev
```

## 🌐 Testing the Application

1. Ensure MetaMask is installed in your browser
2. Add Hardhat's local network to MetaMask:
   - Network Name: Hardhat Local
   - RPC URL: http://127.0.0.1:8545/
   - Chain ID: 31337
   - Currency Symbol: ETH

3. Import a test account from Hardhat node using its private key

4. Visit `http://localhost:5173` to interact with the DApp

## 📝 Important Commands

### Backend
```bash
npx hardhat compile         # Compile contracts
npx hardhat node           # Start local blockchain
npx hardhat run scripts/deploy.js --network localhost  # Deploy contract
```

### Frontend
```bash
npm run dev               # Start development server
npm run build            # Build for production
```

## 🔍 Contract Verification

Your identity is stored on-chain with:
- Name
- Email
- Wallet Address (automatically linked)

Use MetaMask to sign transactions when registering your identity.