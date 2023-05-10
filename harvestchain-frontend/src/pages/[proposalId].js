import Image from "next/image";
import { useRouter } from "next/router";
import { cardDetails } from "../../components/mock";

export default function ProposalDetails() {
  const router = useRouter();
  const proposalId = router.query.proposalId;

  const productDetail = cardDetails.map((card) => {
    if (card.id === proposalId) {
      return (
        <div className="flex items-center gap-24" key={card.id}>
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
      );
    }
    return null;
  });

  return (
    <div className="flex justify-center items-center">
      <div className="mt-24 overflow-hidden">
        {productDetail}
        <button className="mt-12 px-12 py-2 bg-asparagus text-lg rounded-3xl float-right hover:">
          Invest
        </button>
      </div>
    </div>
  );
}
