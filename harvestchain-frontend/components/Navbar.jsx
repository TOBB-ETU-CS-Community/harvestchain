import Link from "next/link";
import { useContext } from "react";
import { ContextAPI } from "../context/ContextProvider";

export default function Navbar() {
  const { address, connectWallet, walletConnected } = useContext(ContextAPI);

  const hideRegister = walletConnected ? "hidden" : "";

  return (
    <div className="h-16 flex justify-around items-center bg-bistre">
      <h1 className="text-3xl">
        <Link href="/">HarvestChain</Link>
      </h1>
      <ul className="flex items-center gap-x-4">
        <li className={`${hideRegister}  hover:text-yellowgreen`}>
          <Link href="">Investors</Link>
        </li>
        <li>
          <Link href="">Profile</Link>
        </li>
        <li className={`${hideRegister} hover:text-yellowgreen`}>
          <Link href="">Growers</Link>
        </li>
      </ul>
      <button
        className="p-1.5 border-solid border border-aquamarine rounded-md hover:bg-asparagus hover:border-asparagus"
        onClick={connectWallet}>
        {walletConnected
          ? `Wallet Connected: ${address.slice(0, 5)}...${address.slice(-4)}`
          : "Connect Wallet"}
      </button>
    </div>
  );
}
