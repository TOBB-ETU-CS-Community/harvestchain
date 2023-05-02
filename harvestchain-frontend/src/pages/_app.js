import "@/styles/globals.css";
import { ContextProvider } from "../../context/ContextProvider";
import Navbar from "../../components/Navbar";

export default function App({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Navbar />
      <Component {...pageProps} />
    </ContextProvider>
  );
}
