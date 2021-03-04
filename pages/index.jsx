import Head from "next/head";
import useRapidApi from "../hooks/useTrintoApi";
import styles from "../styles/Home.module.css";

function Home() {
  const { responseData } = useRapidApi();
  return (
    <div className={styles.container}>
      <Head>
        <title>Shopping | Store</title>
      </Head>
    </div>
  );
}

export default Home;
