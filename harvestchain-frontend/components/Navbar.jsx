import Link from "next/link";

export default function Navbar() {
  return (
    <div className="h-16 flex justify-around items-center bg-bistre">
      <h1 className="text-3xl">
        <Link href="/">HarvestChain</Link>
      </h1>
      <ul className="flex items-center gap-x-4">
        <li>
          <Link href="" className="hover:text-yellowgreen">
            Investors
          </Link>
        </li>
        <li>
          <Link href="" className="hover:text-yellowgreen">
            Growers
          </Link>
        </li>
      </ul>
      {/*Come back later and fix border hover*/}
      <button className="p-1 border-solid border border-aquamarine rounded-md hover:bg-asparagus hover:border-hidden">
        Connect Wallet
      </button>
    </div>
  );
}
