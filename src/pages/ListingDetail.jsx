import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import listings from "../data/listings.json";

function ListingDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [cartMessage, setCartMessage] = useState("");
  const [cartToastTitle, setCartToastTitle] = useState("");
  const [cartToastClosing, setCartToastClosing] = useState(false);

  const listing = listings.find(
    (item) => item.id === Number(id)
  );

  if (!listing) {
    return <h1>Listing not found</h1>;
  }

  const handleAddToCart = () => {
    const existingCart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    const alreadyInCart = existingCart.some(
      (item) => item.id === listing.id
    );

    if (!alreadyInCart) {
      const updatedCart = [...existingCart, listing];

      localStorage.setItem(
        "cart",
        JSON.stringify(updatedCart)
      );

      setCartToastTitle("Added to cart!");
      setCartMessage(listing.title);

      setTimeout(() => {
        setCartToastClosing(true);

        setTimeout(() => {
          setCartMessage("");
          setCartToastTitle("");
          setCartToastClosing(false);
        }, 250);
      }, 2250);
    } else {
      setCartToastTitle("Already in cart");
      setCartMessage(listing.title);

      setTimeout(() => {
        setCartToastClosing(true);

        setTimeout(() => {
          setCartMessage("");
          setCartToastTitle("");
          setCartToastClosing(false);
        }, 250);
      }, 2250);
    }
  };

  return (
    <main className="detail-page">
      <button
        className="back-link"
        onClick={() => navigate(-1)}
      >
        🡨 Back
      </button>

      <div className="detail-card">
        <div className="detail-image">
          <img
            src={listing.image}
            alt={listing.title}
          />
        </div>

        <div className="detail-content">
          <h1>{listing.title}</h1>

          <p className="detail-price">
            ${listing.price}
          </p>

          <button
            className="add-to-cart-button"
            onClick={handleAddToCart}
          >
            <FiShoppingCart />
            Add to Cart
          </button>

          {cartMessage && (
            <div className={`cart-toast ${cartToastClosing ? "cart-toast-closing" : ""}`}>
              <span className="cart-toast-icon">✓</span>

              <div>
                <strong>{cartToastTitle}</strong>
                <p>{cartMessage}</p>
              </div>
            </div>
          )}

          <div className="detail-meta">
            <div className="detail-location">
              <span>{listing.condition}</span>
              <span>•</span>
              <span>{listing.location}</span>
            </div>

            <span className="detail-date">
              Posted{" "}
              {new Date(listing.postedDate).toLocaleDateString("en-SG", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>

          <section>
            <h2>Description</h2>
            <p>{listing.description}</p>
          </section>

          <section>
            <h2>Specifications</h2>

            <ul className="spec-list">
              {Object.entries(listing.specifications).map(
                ([key, value]) => (
                  <li key={key}>
                      <strong>
                        {key
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase())}
                        :
                      </strong>{" "}
                    {value}
                  </li>
                )
              )}
            </ul>
          </section>

          <section className="seller-box">
            <h2>Seller</h2>

            <div className="seller-profile">
              <div className="seller-avatar">
                {listing.seller.charAt(0)}
              </div>

              <div className="seller-main">
                <p className="seller-name">
                  {listing.seller}
                </p>

                <p className="seller-details">
                  Member since {listing.sellerJoined}
                </p>
              </div>

              <div className="seller-rating-block">
                {listing.sellerRating > 0 ? (
                  <>
                    <div className="seller-rating">
                      <span
                        className="seller-stars"
                        style={{
                          "--rating": `${(listing.sellerRating / 5) * 100}%`,
                        }}
                      >
                        ★★★★★
                      </span>

                      <span className="seller-rating-number">
                        {listing.sellerRating}
                      </span>
                    </div>

                    <p className="seller-details">
                      {listing.sellerSales > 0
                        ? `${listing.sellerSales} ${
                            listing.sellerSales === 1
                              ? "completed sale"
                              : "completed sales"
                          }`
                        : "New seller"}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="seller-rating-number">
                      New seller
                    </p>

                    {listing.sellerSales > 0 && (
                      <p className="seller-details">
                        {listing.sellerSales}{" "}
                        {listing.sellerSales === 1
                          ? "completed sale"
                          : "completed sales"}
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default ListingDetail;