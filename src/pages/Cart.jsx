import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    setCart(savedCart);
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  if (cart.length === 0) {
    return (
      <main className="cart-page">
        <div className="cart-empty">
          <h1>Shopping Cart</h1>
          <p>Your cart is currently empty.</p>

          <Link to="/" className="continue-shopping-button">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <h1>Shopping Cart</h1>

      <div className="cart-content">
        <section className="cart-items">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <Link to={`/listing/${item.id}`} className="cart-item-image-link">
                <img
                  src={item.image}
                  alt={item.title}
                />
              </Link>

              <div className="cart-item-info">
                <h2>
                  <Link
                    to={`/listing/${item.id}`}
                    className="cart-item-title-link"
                  >
                    {item.title}
                  </Link>
                </h2>
                <p>
                  <strong>Condition:</strong> {item.condition}
                </p>

                <p>
                  <strong>Location:</strong> {item.location}
                </p>
              </div>

              <p className="cart-item-price">
                ${item.price}
              </p>

              <button
                className="remove-cart-button"
                onClick={() => {
                  const updatedCart = cart.filter(
                    (cartItem) => cartItem.id !== item.id
                  );

                  setCart(updatedCart);
                  localStorage.setItem(
                    "cart",
                    JSON.stringify(updatedCart)
                  );
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </section>

        <aside className="cart-summary">
          <h2>Order Summary</h2>

          <div className="cart-summary-row">
            <span>Subtotal</span>
            <strong>${total}</strong>
          </div>

          <div className="cart-summary-row">
            <span>Delivery</span>
            <strong>Free</strong>
          </div>

          <hr />

          <div className="cart-summary-row cart-total">
            <span>Total</span>
            <strong>${total}</strong>
          </div>

          <button
            className="checkout-button"
            onClick={() => {
              localStorage.removeItem("cart");
              navigate("/order-success");
            }}
          >
            Place Simulated Order
          </button>
        </aside>
      </div>
    </main>
  );
}

export default Cart;