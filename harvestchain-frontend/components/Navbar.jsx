import Link from "next/link";

export default function Navbar() {
  return (
    <div className="h-12 bg-bistre flex justify-around items-center">
      <h1 className="text-3xl">
        <Link href="/">HarvestChain</Link>
      </h1>
      <ul className="flex items-center gap-x-4">
        <li>
          <Link href="">Investors</Link>
        </li>
        <li>
          <Link href="">Growers</Link>
        </li>
      </ul>
      <button className="">Connect Wallet</button>
    </div>
  );
}
