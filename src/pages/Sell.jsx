import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import listings from "../data/listings.json";
import CustomSelect from "../components/CustomSelect";

function Sell() {
  const categories = [
    ...new Set(
      listings.map((listing) => listing.category)
    ),
  ];

  const [submitted, setSubmitted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("Like New");
  const [categoryError, setCategoryError] = useState("");
  const categoryRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedCategory) {
      setCategoryError("Please select a category.");

      categoryRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      return;
    }

    setCategoryError("");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="order-success-page">
        <div className="order-success-card">
          <div className="success-icon">✓</div>

          <h1>Listing submitted!</h1>

          <p className="success-note">
            This is a simulated feature.
          </p>

          <Link to="/" className="continue-shopping-button">
            Back to Browse
          </Link>
        </div>
      </main>
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

        <div ref={categoryRef} className="form-field">
          <label>
            Category

            <CustomSelect
              value={selectedCategory}
              onChange={(value) => {
                setSelectedCategory(value);
                setCategoryError("");
              }}
              placeholder="Select a category"
              options={categories.map((category) => ({
                value: category,
                label: category,
              }))}
            />

            {categoryError && (
              <p className="form-error">
                Please select a category.
              </p>
            )}
          </label>
        </div>

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
          <CustomSelect
            value={selectedCondition}
            onChange={setSelectedCondition}
            options={[
              {
                value: "Like New",
                label: "Like New",
              },
              {
                value: "Good",
                label: "Good",
              },
              {
                value: "Fair",
                label: "Fair",
              },
            ]}
          />
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