import Image from "next/image";
import { useRouter } from "next/router";
import { cardDetails } from "../../components/mock";

export default function ProposalDetails() {
  const router = useRouter();
  const proposalId = router.query.proposalId;

  const productDetail = cardDetails.map((card) => (
    <div key={card.id} className="flex justify-center items-center">
      {card.id === proposalId && (
        <div className="flex justify-evenly">
          <Image
            src="/ejder-meyvesi.jpg"
            alt="Fruit"
            width={200}
            height={200}
          />
          <div>
            <h2>{card.details}</h2>
            <p>{card.capital}</p>
          </div>
        </div>
      )}
    </div>
  ));

  return <h1>{productDetail}</h1>;
}
