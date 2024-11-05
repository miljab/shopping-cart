import useProductsData from "../useProductData";
import styles from "../styles/Products.module.css";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import fixPrice from "../fixPrice";

export function Product({ product }) {
  const [count, setCount] = useState(1);
  const [cartItems, setCartItems] = useOutletContext();

  const incCount = () => {
    setCount(count + 1);
  };

  const decCount = () => {
    if (count >= 2) setCount(count - 1);
  };

  const handleInputChange = (e) => {
    let value = e.target.value;
    value = value.replace(/[^0-9]/g, "");
    if (parseInt(value) == 0) value = "";
    setCount(value === "" ? "" : parseInt(value));
  };

  const handleInputBlur = (e) => {
    if (e.target.value === "") setCount(1);
  };

  const addToCart = () => {
    const newCart = [...cartItems];
    const i = newCart.findIndex((item) => item.id === product.id);
    if (i === -1)
      newCart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        count: count,
      });
    else newCart[i].count += count;

    setCartItems(newCart);
  };

  return (
    <div className={styles.product}>
      <img src={product.image} />
      <div className={styles.productInfo}>
        <h3>{product.title}</h3>
        <h4>${fixPrice(product.price)}</h4>
      </div>
      <div className={styles.buttonsContainer}>
        <button className={styles.decButton} onClick={decCount}>
          -
        </button>
        <input
          type="text"
          inputMode="numeric"
          className={styles.countInput}
          value={count}
          min={1}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
        ></input>
        <button className={styles.incButton} onClick={incCount}>
          +
        </button>
        <button className={styles.addToCartButton} onClick={addToCart}>
          Add to cart
        </button>
      </div>
    </div>
  );
}

function Products() {
  const { products, error, isLoading } = useProductsData();

  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Error occurred! Try again later.</h2>;

  return (
    <div className={styles.products}>
      {products.map((product) => {
        return <Product key={product.id} product={product}></Product>;
      })}
    </div>
  );
}

export default Products;
