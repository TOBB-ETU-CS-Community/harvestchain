import { cardDetails } from "./mock";
import Image from "next/image";
import Link from "next/link";

export default function Card() {
  const productList = cardDetails.map((card) => (
    <Link href={card.id} key={card.id}>
      <div className="w-48 h-48 overflow-hidden">
        <Image
          src="/ejder-meyvesi.jpg"
          alt="Fruit"
          width={200}
          height={200}
          className="rounded-md transform transition duration-300 hover:scale-105"
        />
      </div>
      <h1>{card.grower}</h1>
      <p>{card.details}</p>
      <p>{card.capital}</p>
      <p>{card.expectedReturn}</p>
      <p>{card.endTime}</p>
    </Link>
  ));

  return (
    <div className="grid grid-cols-4 row-auto justify-items-center gap-y-8 mt-8">
      {productList}
    </div>
  );
}
