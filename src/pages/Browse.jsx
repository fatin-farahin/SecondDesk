import { useState } from "react";
import listings from "../data/listings.json";
import ListingCard from "../components/ListingCard";

function Browse() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCondition, setSelectedCondition] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [sortOption, setSortOption] = useState("newest");
  
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedCondition("All");
    setSelectedPrice("All");
    setSortOption("newest");
  };

  const categories = [
    ...new Set(listings.map((listing) => listing.category)),
  ];
  const conditions = [
    ...new Set(listings.map((listing) => listing.condition)),
  ];
  
  const filteredListings = listings.filter((listing) => {
    const search = searchTerm.toLowerCase().trim();

    const matchesSearch =
      listing.title.toLowerCase().includes(search) ||
      listing.category.toLowerCase().includes(search) ||
      listing.description.toLowerCase().includes(search) ||
      listing.location.toLowerCase().includes(search);

    const matchesCategory =
      selectedCategory === "All" ||
      listing.category === selectedCategory;

    const matchesCondition =
      selectedCondition === "All" ||
      listing.condition === selectedCondition;

    const matchesPrice =
      selectedPrice === "All" ||
      (selectedPrice === "under300" && listing.price < 300) ||
      (selectedPrice === "300to600" &&
        listing.price >= 300 &&
        listing.price <= 600) ||
      (selectedPrice === "over600" && listing.price > 600);
    
    return matchesSearch && matchesCategory && matchesCondition && matchesPrice;
  });

  const sortedListings = [...filteredListings].sort((a, b) => {
    if (sortOption === "priceLow") {
      return a.price - b.price;
    }

    if (sortOption === "priceHigh") {
      return b.price - a.price;
    }

    return new Date(b.postedDate) - new Date(a.postedDate);
  });

  return (
    <main className="browse-page">
      <section className="browse-header">
        <p className="eyebrow">SECONDHAND, SIMPLIFIED</p>

        <h1>Find what you need for student life.</h1>

        <p>
          Or ask SecondDesk AI ✦ to find and compare products for you.
        </p>
      </section>

      <section className="search-section">
        <input
            type="text"
            placeholder="Search listings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
        />

        <div className="filter-row">
          {/* category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* condition */}  
          <select
            value={selectedCondition}
            onChange={(e) => setSelectedCondition(e.target.value)}
          >
            <option value="All">All Conditions</option>
            
            {conditions.map((condition) => (
              <option key={condition} value={condition}>
                {condition}
              </option>
            ))}
          </select>

          {/* price */}  
          <select
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
          >
            <option value="All">All Prices</option>
            <option value="under300">Under $300</option>
            <option value="300to600">$300 - $600</option>
            <option value="over600">Over $600</option>
          </select>

          {/* sorting */}  
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
          </select>

          <button
            className="reset-button"
            onClick={resetFilters}
          >
            Reset
          </button>
        </div>
      </section>

      <p className="results-count">
        Showing {filteredListings.length} of {listings.length} listings
      </p>

      <section className="listing-grid">
        {sortedListings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </section>
    </main>
  );
}

export default Browse;