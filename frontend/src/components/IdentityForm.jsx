import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../utils/contract";

const IdentityForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [account, setAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Connect to wallet and fetch user data on component mount
  useEffect(() => {
    const connectWallet = async () => {
      if (!window.ethereum) return;
      
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setAccount(accounts[0]);
        
        // After connecting, fetch user data
        if (accounts[0]) {
          fetchUserData(accounts[0]);
        }
      } catch (err) {
        console.error("Error connecting to wallet:", err);
      }
    };
    
    connectWallet();
  }, []);

  // Function to fetch user data from the contract
  const fetchUserData = async (userAddress) => {
    try {
      setIsLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      
      // Call the getUser function from your contract
      const userData = await contract.getUser(userAddress);
      
      // The getUser function returns a tuple, so we need to access the elements
      setUserData({
        name: userData[0],
        email: userData[1]
      });
      
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setIsLoading(false);
    }
  };

  const register = async () => {
    if (!window.ethereum) return alert("Install MetaMask first!");

    try {
      setIsLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const tx = await contract.register(name, email);
      setStatus("Transaction submitted, waiting for confirmation...");
      
      await tx.wait();
      setStatus("Registered Successfully!");
      
      // Refresh user data after successful registration
      const address = await signer.getAddress();
      fetchUserData(address);
      
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setStatus("Error while registering.");
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">Identity Registration</h2>
      
      {/* Registration Form */}
      <input
        type="text"
        placeholder="Name"
        className="w-full p-2 border rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button 
        onClick={register} 
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Register"}
      </button>
      {status && <p className="text-green-600">{status}</p>}
      
      {/* Display User Data */}
      <div className="mt-8 pt-4 border-t">
        <h3 className="text-lg font-semibold">Your Stored Identity</h3>
        {isLoading ? (
          <p>Loading...</p>
        ) : userData.name ? (
          <div>
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Wallet:</strong> {account ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}` : "Not connected"}</p>
          </div>
        ) : (
          <p>No identity registered for this address yet.</p>
        )}
        
        {/* Refresh Button */}
        <button 
          onClick={() => account && fetchUserData(account)} 
          className="mt-2 bg-gray-200 text-gray-800 px-4 py-1 rounded text-sm"
          disabled={isLoading || !account}
        >
          Refresh Data
        </button>
      </div>
    </div>
  );
};

export default IdentityForm;