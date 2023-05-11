import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-24">
      <div className="w-full h-0.5 bg-gradient-to-r from-yellowgreen to-screamingreen"></div>
      <h3 className="flex justify-center py-6 bg-bistre">
        <span>
          <Image src="/logo.png" alt="Logo" width={25} height={25} />
        </span>{" "}
        &#10084; Made By Blockchain Club of TOBB Economics and Technology
      </h3>
    </footer>
  );
}
