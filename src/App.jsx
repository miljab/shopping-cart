import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import { useState } from "react";

function App() {
  const [cartItems, setCartItems] = useState([]);

  return (
    <>
      <NavBar cartItems={cartItems} />
      <Outlet context={[cartItems, setCartItems]} />
    </>
  );
}

export default App;
