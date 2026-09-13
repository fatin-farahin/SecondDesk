import { Link } from "react-router-dom";
import { useState } from "react";
import listings from "../data/listings.json";
import ListingCard from "../components/ListingCard";

function Saved() {
  const [savedIds, setSavedIds] = useState(() => {
    return JSON.parse(localStorage.getItem("savedListings")) || [];
  });

  const savedListings = listings.filter((listing) =>
    savedIds.includes(listing.id)
  );

  return (
    <main className="browse-page">
      <div className="browse-header">
        <h1>Saved Listings</h1>

        <p>
          Listings you've saved for later.
        </p>
      </div>

      {savedListings.length === 0 ? (
        <div className="empty-state">
          <h2>No saved listings yet</h2>

          <p>
            Save listings you are interested in and
            they'll appear here.
          </p>

          <Link to="/" className="browse-button">
            Browse Listings
          </Link>
        </div>
      ) : (
        <>
          <p className="results-count">
            {savedListings.length} saved{" "}
            {savedListings.length === 1
              ? "listing"
              : "listings"}
          </p>

          <div className="listing-grid">
            {savedListings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                fromSaved
                onUnsave={(id) => {
                  setSavedIds((previous) =>
                    previous.filter((savedId) => savedId !== id)
                  );
                }}
              />
            ))}
          </div>
        </>
      )}
    </main>
  );
}

export default Saved;