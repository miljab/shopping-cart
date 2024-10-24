import cartIcon from "../assets/cart.svg";
import styles from "../styles/NavBar.module.css";

function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <button className={styles.menuButton}>Home</button>
        </li>
        <li>
          <button className={styles.menuButton}>Products</button>
        </li>
        <li>
          <button className={styles.menuButton}>Contact</button>
        </li>
      </ul>
      <button type="button" className={styles.cartButton}>
        <img src={cartIcon} className={styles.cartIcon} />
      </button>
    </nav>
  );
}

export default NavBar;
