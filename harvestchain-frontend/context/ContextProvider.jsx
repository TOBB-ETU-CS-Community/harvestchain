import { createContext, useRef, useState, useEffect } from "react";
import { Contract, providers } from "ethers";
import {
  GROWER_CONTRACT_ADDRESS,
  INVESTOR_CONTRACT_ADDRESS,
  GROWER_CONTRACT_ABI,
  INVESTOR_CONTRACT_ABI,
} from "../constants";
import Web3Modal from "web3modal";

export const ContextAPI = createContext();

export function ContextProvider({ children }) {
  const [walletConnected, setWalletConnected] = useState(false);
  const [address, setAddress] = useState("");
  const web3ModalRef = useRef();

  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 97) {
      alert("Change the network to BNB Chain");
      throw new Error("Change the network to BNB Chain");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  const getAddress = async () => {
    const initial = await getProviderOrSigner();
    const initialAddress = initial.provider.selectedAddress;
    setAddress(initialAddress);
  };

  const growerContractInstance = (providerOrSigner) => {
    return new Contract(
      GROWER_CONTRACT_ADDRESS,
      GROWER_CONTRACT_ABI,
      providerOrSigner
    );
  };

  const investorContractInstance = (providerOrSigner) => {
    return new Contract(
      INVESTOR_CONTRACT_ADDRESS,
      INVESTOR_CONTRACT_ABI,
      providerOrSigner
    );
  };

  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      await getAddress();
      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "Canto Testnet",
        providerOptions: [],
        disableInjectedProvider: false,
      });
      connectWallet();
    }
  }, [walletConnected]);

  return (
    <ContextAPI.Provider
      value={{
        walletConnected,
        address,
        connectWallet,
        getProviderOrSigner,
        growerContractInstance,
        investorContractInstance,
      }}>
      {children}
    </ContextAPI.Provider>
  );
}
