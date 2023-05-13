import { useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import { ContextAPI } from "../../context/ContextProvider";
import ProposalForm from "../../components/ProposalForm";
import Loader from "../../components/Loader";

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [growerBalance, setGrowerBalance] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [growerContractBalance, setGrowerContractBalance] = useState(0);
  const { growerContractInstance, getProviderOrSigner, address } =
    useContext(ContextAPI);

  const registerGrower = async (productName, area, estimatedRevenue) => {
    try {
      const signer = await getProviderOrSigner(true);
      const contract = await growerContractInstance(signer);
      const tx = await contract.createAdvertisement(
        productName,
        area,
        estimatedRevenue
      );
      setLoading(true);
      await tx.wait();
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const growerPayment = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const contract = await growerContractInstance(signer);
      const parsedAmount = ethers.utils.parseEther(paymentAmount);
      const tx = await contract.receivePayment({ value: parsedAmount });
      setLoading(true);
      await tx.wait();
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const growerBalanceOnContract = async () => {
    const signer = await getProviderOrSigner(true);
    const contract = await growerContractInstance(signer);
    const manufacturer = await contract.manufacturers(address);
    const _balance = manufacturer.balance;
    setGrowerContractBalance(Number(_balance) / 1e18);
  };

  const handlePaymentAmountChange = (e) => {
    setPaymentAmount(e.target.value);
  };

  const getBalance = async () => {
    try {
      const provider = await getProviderOrSigner();
      const balance = await provider.getBalance(address);
      setGrowerBalance((Number(balance) / 1e18).toString());
    } catch (error) {
      console.error(error);
    }
  };

  // if (loading) {
  //   return <Loader />;
  // }

  useEffect(() => {
    getBalance();
    growerBalanceOnContract();
  }, [growerBalance, growerContractBalance]);

  return (
    <div className="flex justify-center mt-24">
      <div className="flex flex-row-reverse gap-24">
        <div>
          <h2 className="text-2xl font-semibold">Welcome Seed Grow</h2>
          <p className="mt-4 text-lg">
            Balance: {growerBalance.slice(0, 6)} BNB
          </p>
          <div className="flex flex-col mt-12">
            <p className="mb-4 text-lg">
              Your Balance On Contract: {growerContractBalance}
            </p>
            <input
              className="w-2/3 h-8 pl-2 mb-4 rounded-md text-black"
              type="number"
              value={paymentAmount}
              onChange={handlePaymentAmountChange}></input>
            <button
              className="w-36 mx-auto py-1.5 bg-asparagus rounded-3xl hover:bg-hovercolor"
              type="submit"
              onClick={growerPayment}>
              Invest
            </button>
          </div>
        </div>
        <ProposalForm handleProposalForm={registerGrower} />
      </div>
    </div>
  );
}
