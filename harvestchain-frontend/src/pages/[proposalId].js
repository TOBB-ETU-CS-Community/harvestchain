import Image from "next/image";
import { useRouter } from "next/router";
import Line from "../../components/Line";
import { useContext, useEffect, useState } from "react";
import { ContextAPI } from "../../context/ContextProvider";
import { ethers } from "ethers";

export default function ProposalDetails() {
  const [proposal, setProposal] = useState([]);
  const [paymentAmount, setPaymentAmount] = useState("");
  const router = useRouter();
  const proposalId = router.query.proposalId;
  const {
    growerContractInstance,
    investorContractInstance,
    getProviderOrSigner,
  } = useContext(ContextAPI);

  const getProposal = async () => {
    try {
      const provider = await getProviderOrSigner();
      const contract = await growerContractInstance(provider);
      const oneProposal = await contract.retrieveAdvertisementById(proposalId);
      setProposal([oneProposal]);
    } catch (error) {
      console.error(error);
    }
  };

  const sendContribution = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const contract = await investorContractInstance(signer);
      const parsedAmount = ethers.utils.parseEther(paymentAmount);
      const tx = await contract.sendPayment({ value: parsedAmount });
      setLoading(true);
      await tx.wait();
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePaymentAmountChange = (e) => {
    setPaymentAmount(e.target.value);
  };

  useEffect(() => {
    getProposal();
  }, []);

  return (
    <div className="flex justify-center items-center">
      <div className="mt-24 overflow-hidden">
        {proposal.map((card) => (
          <div className="flex items-center" key={proposalId}>
            <Image
              src="/ejder-meyvesi.jpg"
              alt="Fruit"
              width={200}
              height={200}
              className="rounded-md"
            />
            <div>
              <div className="flex items-center">
                <p className="ml-4 w-36">Product Name</p>
                <Line />
                <p className="mb-2">{card[0]}</p>
              </div>
              <div className="flex items-center">
                <p className="ml-4 w-36">Area</p>
                <Line />
                <p className="mb-2">{card[1] | 0}</p>
              </div>
              <div className="flex items-center">
                <p className="ml-4 w-36">Estimated Revenue</p>
                <Line />
                <p className="mb-2">{card[3] | 0}%</p>
              </div>
              <div className="flex items-center">
                <p className="ml-4 w-36">Grower</p>
                <Line />
                <p className="mb-2">{card[4].toString()}</p>
              </div>
            </div>
          </div>
        ))}
        <div className="w-1/3 flex flex-col mt-12 float-right ">
          <input
            className="mb-4 pl-2 h-8 rounded-lg text-black focus:outline-0 placeholder:italic"
            placeholder="Enter the amount..."
            type="number"
            value={paymentAmount}
            onChange={handlePaymentAmountChange}></input>
          <button
            className="px-12 py-2 bg-asparagus text-lg rounded-3xl hover:bg-hovercolor"
            type="submit"
            onClick={sendContribution}>
            Invest
          </button>
        </div>
      </div>
    </div>
  );
}
