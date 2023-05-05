import { cardDetails } from "./mock";
import Image from "next/image";

export default function Card() {
  const productList = cardDetails.map((card) => (
    <div key={card.id} className="">
      <Image src="/ejder-meyvesi.jpg" alt="Fruit" width={200} height={200} />
      <h1>{card.grower}</h1>
      <p>{card.details}</p>
      <p>{card.capital}</p>
      <p>{card.expectedReturn}</p>
      <p>{card.endTime}</p>
    </div>
  ));

  return (
    <div className="grid grid-cols-4 row-auto justify-items-center gap-y-8 mt-8">
      {productList}
    </div>
  );
}
