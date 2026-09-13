import { Link } from "react-router-dom";
import { useState } from "react";

function ListingCard({ listing, onUnsave, fromSaved }) {
  const [isSaved, setIsSaved] = useState(() => {
    const savedListings =
      JSON.parse(localStorage.getItem("savedListings")) || [];

    return savedListings.includes(listing.id);
  });

  const handleSave = (event) => {
    event.preventDefault();

    const savedListings =
      JSON.parse(localStorage.getItem("savedListings")) || [];

    let updatedListings;

    if (savedListings.includes(listing.id)) {
      updatedListings = savedListings.filter(
        (id) => id !== listing.id
      );
      setIsSaved(false);

      if (onUnsave) {
        onUnsave(listing.id);
      }
    } else {
      updatedListings = [...savedListings, listing.id];
      setIsSaved(true);
    }

    localStorage.setItem(
      "savedListings",
      JSON.stringify(updatedListings)
    );
  };

  return (
    <Link
      to={`/listing/${listing.id}`}
      state={{ fromSaved }}
      className="listing-link"
    >

      <div className="listing-card">
        <div className="listing-image">
          <img
              src={listing.image}
              alt={listing.title}
          />

          <button
            className={`save-button ${
              isSaved ? "saved" : ""
            }`}
            onClick={handleSave}
            aria-label={
              isSaved
                ? "Remove from saved listings"
                : "Save listing"
            }
          >
            {isSaved ? "♥" : "♡"}
          </button>
        </div>

        <div className="listing-content">
          <div className="listing-header">
            <h2>{listing.title}</h2>
            <p className="listing-price">${listing.price}</p>
          </div>

          <div className="listing-meta">
            <span>{listing.condition}</span>
            <span>•</span>
            <span>{listing.location}</span>
            <span>•</span>
            <span>
              Posted{" "}
              {new Date(listing.postedDate).toLocaleDateString("en-SG", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>

          <p className="listing-description">
            {listing.description}
          </p>

          <div className="listing-seller">
            <span>{listing.seller}</span>
            <span>★ {listing.sellerRating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ListingCard;