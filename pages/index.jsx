import Head from "next/head";
import useRapidApi from "../hooks/useTrintoApi";
import styles from "../styles/Home.module.css";
import AppBar from "../pages/components/AppBar";
import ListItems from "../pages/components/ListItems";

function Home() {
  const { responseData } = useRapidApi();
  return (
    <div className={styles.container}>
      <Head>
        <title>Shopping | Store</title>
      </Head>
      <AppBar />
      <ListItems />
    </div>
  );
}

export default Home;
