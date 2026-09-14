function Notes() {
  return (
    <main className="notes-page">
      <div className="notes-header">
        <h1>Project Notes</h1>
        <p>
          A quick overview of the idea, technical implementation, and current limitations.
        </p>
      </div>

      <section className="notes-section">
        <h2>1. What I Built</h2>

        <p>
          SecondDesk is an AI-powered second-hand marketplace designed for
          university students in Singapore. It provides a mobile-friendly
          browsing experience where users can explore listings and save 
          products without signing in. Most importantly, they can use the 
          AI assistant to find and compare items.
        </p>
      </section>

      <section className="notes-section">
        <h2>2. Who It's For &amp; The Problem</h2>

        <h3>Target Audience</h3>
        <p>
          SecondDesk is designed for university students who need affordable
          second-hand equipment for studying and everyday campus life.
        </p>

        <h3>Problem Statement</h3>
        <p>
          Students may have to search through many listings or visit different
          sellers to find products that fit their needs and budget. SecondDesk
          makes this more convenient by bringing relevant options together in
          one place, allowing students to check details and compare items
          before deciding what to buy.
        </p>
      </section>

      <section className="notes-section">
        <h2>3. How The Marketplace Works</h2>

        <p>
          Users can browse and filter listings by category, condition, and
          price. Each listing has its own detail page with descriptions,
          specifications, and seller information. Users can then save items,
          add them to their cart, and place a simulated order. The AI
          assistant is available throughout the marketplace for product
          searches and catalogue questions.
        </p>

        <div className="notes-flow">
          <span>Browse Listings</span>
          <span>→</span>
          <span>View Item</span>
          <span>→</span>
          <span>Save / Add to Cart</span>
          <span>→</span>
          <span>Simulated Order</span>
        </div>
      </section>

      <section className="notes-section">
        <h2>4. AI Search &amp; Catalogue Q&amp;A</h2>

        <h3>Natural-Language Search</h3>

        <p>
          Users can describe what they are looking for in their own words.
          SecondDesk converts the query and catalogue listings into
          embeddings using <code>text-embedding-3-small</code>, then uses
          cosine similarity to retrieve relevant listings.
        </p>

        <p>
          Category, location, and maximum price constraints are also applied
          when identified from the query. The retrieved listings are passed
          to GPT-5.6-terra, which generates the response and returns the
          relevant listing IDs for the clickable recommendation cards.
        </p>

        <h3>Catalogue Q&amp;A</h3>

        <p>
          The assistant can answer catalogue questions and compare products
          using only information from the retrieved listings. If the
          catalogue does not contain enough information, it is instructed
          to say so rather than inventing an answer.
        </p>

        <div className="notes-flow">
          <span>User question</span>
          <span>→</span>
          <span>Semantic retrieval + filters</span>
          <span>→</span>
          <span>Relevant listings</span>
          <span>→</span>
          <span>GPT-5.6-terra</span>
          <span>→</span>
          <span>Answer + recommendations</span>
        </div>
      </section>

      <section className="notes-section">
        <h2>5. Technology Choices</h2>

        <p>
          The frontend uses React and Vite, with CSS for the interface and
          responsive layout. The backend uses Node.js and Express to handle
          AI requests while keeping the model gateway credentials server-side.
        </p>

        <p>
          The catalogue is stored as JSON because the project uses a small
          seeded dataset of 30 listings. This keeps the implementation
          lightweight without adding unnecessary database infrastructure.
        </p>
      </section>

      <section className="notes-section">
        <h2>6. AI Tools Used</h2>

        <ul>
          <li>GPT-5.6-terra</li>
          <li>text-embedding-3-small</li>
          <li>Cursor</li>
          <li>ChatGPT</li>
        </ul>

        <p>
          I used Cursor and ChatGPT to support debugging and testing throughout 
          the project. They were particularly useful when I ran into issues with 
          the AI assistant, refined the responsive layout, and tested 
          different natural-language queries to improve result relevance.
        </p>
      </section>

      <section className="notes-section">
        <h2>7. Example AI tests</h2>

        <h3>1. Budget Search</h3>

        <p>
          <strong>Question:</strong> Show me a laptop under $800 near Punggol.
        </p>

        <p>
          <strong>AI Reply:</strong> A suitable laptop near Punggol under $800 
          is available: Lenovo ThinkPad T14 Gen 2 for $650 in good condition. 
          It has an Intel Core i5-1135G7, 16GB RAM, and 512GB SSD.
        </p>

        <h3>2. Product Comparison</h3>

        <p>
          <strong>Question:</strong> Compare Lenovo and MacBook.
        </p>

        <p>
          <strong>AI Reply:</strong> The Lenovo ThinkPad T14 Gen 2 costs $650 
          and offers more RAM and storage, while the MacBook Air M1 costs $720 
          and is lighter with longer stated battery life. Choose the Lenovo for 
          more memory and storage, or the MacBook for portability and battery life.
        </p>

        <h3>3. Attribute-Based Search</h3>

        <p>
          <strong>Question:</strong> Which device is best for note-taking?
        </p>

        <p>
          <strong>AI Reply:</strong> The Samsung Galaxy Tab S8 is the best fit for 
          note-taking: it includes an S Pen and has an 11-inch screen, making it 
          well suited for handwritten notes and annotating lecture slides.
        </p>

        <h3>Validation</h3>

        <ul>
          <li>
            Tested budget, comparison, and attribute-based queries against
            the seeded catalogue.
          </li>
          <li>
            Verified that recommendations only link to existing catalogue
            listings.
          </li>
          <li>
            Tested cases with no suitable matches and missing information
            to ensure the AI does not invent results.
          </li>
        </ul>
      </section>

      <section className="notes-section">
        <h2>8. What Is Simulated</h2>

        <ul>
          <li>
            The 30 marketplace listings, seller profiles, and transactions
            are seeded or simulated for demonstration purposes.
          </li>
          <li>
            The cart and checkout flow are simulated. No real payment is
            processed.
          </li>
          <li>
            The Sell Item feature is simulated and new listings are not
            persisted to the catalogue.
          </li>
        </ul>
      </section>

      <section className="notes-section">
        <h2>9. What I Chose Not To Build</h2>

        <ul>
          <li>User authentication</li>
          <li>Real payment processing</li>
          <li>Seller-to-buyer messaging</li>
          <li>Delivery or meetup coordination</li>
          <li>Persistent user-created listings</li>
          <li>Production database or vector database</li>
        </ul>

        <p>
          These features were intentionally kept out of scope because
          of the three-day assessment timeline. I prioritised the
          core marketplace experience, natural-language search, and
          catalogue Q&amp;A instead.
        </p>
      </section>

      <section className="notes-section">
        <h2>10. Known Limitations</h2>

        <ul>
          <li>
            The catalogue is limited to 30 seeded listings and does
            not represent live marketplace inventory.
          </li>
          <li>
            AI recommendations may occasionally miss a relevant
            listing because retrieval is based on semantic similarity.
          </li>
          <li>
            AI answers are limited by the information available in the
            catalogue.
          </li>
          <li>
            Search performance has only been tested against the seeded
            dataset.
          </li>
          <li>
            Listing embeddings are generated and cached in memory rather than
            stored in a persistent vector database.
          </li>
        </ul>
      </section>
    </main>
  );
}

export default Notes;