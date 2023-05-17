import { useState, useContext, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ContextAPI } from "../context/ContextProvider";

export default function Card() {
  const [proposals, setProposals] = useState([]);
  const { growerContractInstance, getProviderOrSigner } =
    useContext(ContextAPI);

  const proposalList = async () => {
    try {
      const provider = await getProviderOrSigner();
      const contract = await growerContractInstance(provider);
      let i = 1;
      let done = false;
      setProposals([]);
      do {
        try {
          const oneProposal = await contract.manufacturerAdvertisements(i);
          setProposals((props) => [...props, oneProposal]);
          i++;
        } catch (error) {
          done = true;
          console.error(error);
        }
      } while (!done && i < proposals.length);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    proposalList();
  }, []);

  return (
    <div className="grid grid-cols-4 row-auto justify-items-center gap-y-8 mt-8">
      {proposals.map((card) => (
        <Link href={String(card.id)} key={Number(card.id)}>
          <div className="w-48 h-48 overflow-hidden">
            <Image
              src="/ejder-meyvesi.jpg"
              alt="Fruit"
              width={200}
              height={200}
              className="rounded-md transform transition duration-300 hover:scale-105"
            />
          </div>
          <p className="font-bold">
            Product Name: {card.productName.toString()}
          </p>
          <p>Area: {card.area.toString()}</p>
          <p>Estimated Revenue: {card.estimatedRevenue.toString()}%</p>
        </Link>
      ))}
    </div>
  );
}
