import Head from "next/head";
import styles from "../styles/Home.module.css";
import ListItems from "../pages/components/ListItems";
import AppBarComponent from "./components/AppBarComponent";
// import Modal from "./components/Modal";
import AppFooter from "./components/AppFooter";

function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Shopping | Store</title>
      </Head>
      <AppBarComponent />
      <ListItems />
      {/* <Modal /> */}
      <AppFooter />
    </div>
  );
}

export default Home;
