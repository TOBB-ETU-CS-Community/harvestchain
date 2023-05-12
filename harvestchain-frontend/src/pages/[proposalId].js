import Image from "next/image";
import { useRouter } from "next/router";
import { cardDetails } from "../../components/mock";
import Line from "../../components/Line";

export default function ProposalDetails() {
  const router = useRouter();
  const proposalId = router.query.proposalId;

  const productDetail = cardDetails.map((card) => {
    if (card.id === proposalId) {
      return (
        <div className="flex items-center" key={card.id}>
          <Image
            src="/ejder-meyvesi.jpg"
            alt="Fruit"
            width={200}
            height={200}
            className="rounded-md"
          />
          <div>
            <div className="flex items-center">
              <Line />
              <h2 className="mb-2">{card.grower}</h2>
            </div>
            <div className="flex items-center">
              <Line />
              <p className="mb-2">{card.area}</p>
            </div>
            <div className="flex items-center">
              <Line />
              <p className="mb-2">{card.capital}</p>
            </div>
            <div className="flex items-center">
              <Line />
              <p className="mb-2">{card.estimatedReturn}</p>
            </div>
            <div className="flex items-center">
              <Line />
              <p>{card.duration}</p>
            </div>
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
        <div className="w-1/3 flex flex-col mt-12 float-right ">
          <input
            className="mb-4 pl-2 h-8 rounded-lg text-black focus:outline-0 placeholder:italic"
            placeholder="Enter the amount..."
            type="number"></input>
          <button
            className="px-12 py-2 bg-asparagus text-lg rounded-3xl hover:bg-hovercolor"
            type="submit">
            Invest
          </button>
        </div>
      </div>
    </div>
  );
}
