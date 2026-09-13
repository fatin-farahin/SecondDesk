import { useState } from "react";
import listings from "../data/listings.json";

function Sell() {
  const categories = [
    ...new Set(
      listings.map((listing) => listing.category)
    ),
  ];

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="sell-page">
        <div className="sell-success">
          <h1>Listing Submitted ✓</h1>
          <p>
            Your item has been submitted to the demo marketplace.
          </p>
          <small>
            This is a simulated feature for the assessment.
          </small>
        </div>
      </div>
    );
  }

  return (
    <div className="sell-page">
      <div className="sell-header">
        <h1>Sell an Item</h1>
        <p>
          List your tech, study gear, or electronics for other students.
        </p>
      </div>

      <form
        className="sell-form"
        onSubmit={handleSubmit}
      >
        <label>
          Item Title
          <input
            type="text"
            placeholder="MacBook Air M1"
            required
          />
        </label>

        <label>
          Category
          <select required>
            <option value="">
              Select a category
            </option>

            {categories.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>
        </label>

        <label>
          Price
          <input
            type="number"
            placeholder="500"
            required
          />
        </label>

        <label>
          Condition
          <select required>
            <option>Like New</option>
            <option>Good</option>
            <option>Fair</option>
          </select>
        </label>

        <label>
          Location
          <input
            type="text"
            placeholder="Clementi"
            required
          />
        </label>

        <label>
          Description
          <textarea
            rows="5"
            placeholder="Describe your item..."
            required
          />
        </label>

        <button
          type="submit"
          className="submit-listing-button"
        >
          Create Listing
        </button>
      </form>
    </div>
  );
}

export default Sell;