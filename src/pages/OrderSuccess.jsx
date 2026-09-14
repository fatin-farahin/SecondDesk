import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <main className="order-success-page">
      <div className="order-success-card">
        <div className="success-icon">✓</div>

        <h1>Order placed successfully!</h1>

        <p className="success-note">
          No payment was processed. This is a simulated checkout.
        </p>

        <Link to="/" className="continue-shopping-button">
          Back to Browse
        </Link>
      </div>
    </main>
  );
}

export default OrderSuccess;