import { useNavigate, useOutletContext } from "react-router-dom";
import trashCanImg from "../assets/trash_can.svg";
import styles from "../styles/Cart.module.css";
import { useState } from "react";
import fixPrice from "../fixPrice";

function Summary({ items, handleCheckout }) {
  const productsPrice = () => {
    let sum = 0;
    items.forEach((item) => {
      sum += item.count * item.price;
    });

    return sum;
  };

  const itemsPrice = productsPrice();

  return (
    <div className={styles.summary}>
      <div className={styles.cost}>
        <div>
          <span>Products:</span>
          <span>${fixPrice(itemsPrice)}</span>
        </div>
        <div className={styles.delivery}>
          <span>Delivery:</span>
          <span>$9.90</span>
        </div>
        <div className={styles.total}>
          <span>Total:</span>
          <span>${fixPrice(itemsPrice + 9.9)}</span>
        </div>
      </div>
      <button className={styles.checkoutButton} onClick={handleCheckout}>
        Checkout
      </button>
    </div>
  );
}

function Item({ item, changeItemCount, removeItem }) {
  const [count, setCount] = useState(item.count);

  const incCount = () => {
    changeItemCount(item.id, count + 1);
    setCount(count + 1);
  };

  const decCount = () => {
    if (count >= 2) {
      changeItemCount(item.id, count - 1);
      setCount(count - 1);
    }
  };

  const handleInputChange = (e) => {
    let value = e.target.value;
    value = value.replace(/[^0-9]/g, "");
    if (parseInt(value) == 0) value = "";
    setCount(value === "" ? "" : parseInt(value));

    if (value.length > 0) changeItemCount(item.id, parseInt(e.target.value));
  };

  const handleInputBlur = (e) => {
    if (e.target.value === "") {
      setCount(1);
      changeItemCount(item.id, 1);
    }
  };

  return (
    <div className={styles.item}>
      <img src={item.image} />
      <div className={styles.itemTitle}>{item.title}</div>
      <button
        className={styles.removeButton}
        onClick={() => removeItem(item.id)}
      >
        <img src={trashCanImg} />
      </button>
      <div className={styles.itemPrice}>${fixPrice(item.price)}</div>
      <div className={styles.itemCount}>
        <button className={styles.decButton} onClick={decCount}>
          -
        </button>
        <input
          type="text"
          inputMode="numeric"
          className={styles.countInput}
          value={count}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
        ></input>
        <button className={styles.incButton} onClick={incCount}>
          +
        </button>
      </div>
    </div>
  );
}

function Cart() {
  const [cartItems, setCartItems] = useOutletContext();
  const navigate = useNavigate();

  const changeItemCount = (id, newCount) => {
    const newCartItems = [...cartItems];
    const i = newCartItems.findIndex((item) => item.id === id);
    newCartItems[i].count = newCount;
    setCartItems(newCartItems);
  };

  const removeItem = (id) => {
    const newCartItems = [...cartItems];
    const i = newCartItems.findIndex((item) => item.id === id);
    newCartItems.splice(i, 1);
    setCartItems(newCartItems);
  };

  const handleCheckout = () => {
    setCartItems([]);
    return navigate("/", { state: { checkoutComplete: true } });
  };

  if (cartItems.length === 0) return <h2>Cart is empty. Go buy something!</h2>;

  return (
    <>
      <h1 className={styles.cartH1}>Your cart</h1>
      <main>
        <div className={styles.items}>
          {cartItems.map((item) => {
            return (
              <Item
                item={item}
                changeItemCount={changeItemCount}
                removeItem={removeItem}
                key={item.id}
              ></Item>
            );
          })}
        </div>
        <Summary items={cartItems} handleCheckout={handleCheckout}></Summary>
      </main>
    </>
  );
}

export default Cart;
