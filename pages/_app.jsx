import ProductsOnCartProvider from "../context/ProductsContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : (
        <ProductsOnCartProvider>
          <Component {...pageProps} />
        </ProductsOnCartProvider>
      )}
    </div>
  );
}

export default MyApp;
