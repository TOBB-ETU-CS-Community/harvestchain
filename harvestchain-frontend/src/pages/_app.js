import "@/styles/globals.css";
import { ContextProvider } from "../../context/ContextProvider";
import Layout from "../../components/Layout";

export default function App({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ContextProvider>
  );
}
