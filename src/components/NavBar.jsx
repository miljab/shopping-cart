import { Link } from "react-router-dom";
import cartIcon from "../assets/cart.svg";
import styles from "../styles/NavBar.module.css";

function NavBar({ cartItems }) {
  let cartCount = 0;

  for (let i = 0; i < cartItems.length; i++) {
    cartCount += cartItems[i].count;
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">
            <button className={styles.menuButton}>Home</button>
          </Link>
        </li>
        <li>
          <Link to="/products">
            <button className={styles.menuButton}>Products</button>
          </Link>
        </li>
        <li>
          <button className={styles.menuButton}>Contact</button>
        </li>
      </ul>
      <Link to="/cart" className={styles.cartLink}>
        <button type="button" className={styles.cartButton}>
          <img src={cartIcon} className={styles.cartIcon} />
          <div
            className={cartCount === 0 ? styles.hidden : styles.counter}
            data-testid="cartCounter"
          >
            {cartCount}
          </div>
        </button>
      </Link>
    </nav>
  );
}

export default NavBar;
