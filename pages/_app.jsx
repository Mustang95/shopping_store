import ProductsOnCartProvider from "../context/ProductsContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ProductsOnCartProvider>
      <Component {...pageProps} />
    </ProductsOnCartProvider>
  );
}

export default MyApp;
