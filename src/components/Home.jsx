import { useLocation } from "react-router-dom";
import styles from "../styles/Home.module.css";
import checkIcon from "../assets/check.svg";

function Home() {
  const location = useLocation().state;
  const checkoutComplete =
    location === null ? false : location.checkoutComplete;

  return (
    <div id={styles.main}>
      <h1>Simple Shop</h1>
      <div
        className={checkoutComplete ? styles.checkoutComplete : styles.hidden}
      >
        <img src={checkIcon} className={styles.checkIcon}></img>
        <h2>Checkout completed!</h2>
      </div>
    </div>
  );
}

export default Home;
