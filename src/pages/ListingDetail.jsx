import { Link, useLocation, useParams } from "react-router-dom";
import listings from "../data/listings.json";

function ListingDetail() {
  const location = useLocation();
  const { id } = useParams();

  const listing = listings.find(
    (item) => item.id === Number(id)
  );

  if (!listing) {
    return <h1>Listing not found</h1>;
  }

  return (
    <main className="detail-page">
      <Link
        to={location.state?.fromSaved ? "/saved" : "/"}
        className="back-link"
      >
        🡨 Back to listings
      </Link>

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
                {/* <img src={listing.sellerImage} /> */}
              </div>

              <div>
                <p className="seller-name">
                  {listing.seller}
                </p>

                <p className="seller-rating">
                  ★ {listing.sellerRating}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default ListingDetail;