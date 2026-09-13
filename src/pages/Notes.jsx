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
        <h2>1. What I built</h2>

        <p>
          SecondDesk is an AI-powered second-hand marketplace designed
          for university students in Singapore. Users can browse
          listings, view item details, save items, and use the AI
          assistant to search for products or ask questions about the
          catalogue.
        </p>

        <p>
          The marketplace currently has 30 seeded listings covering
          laptops, monitors, keyboards, mice, tablets, calculators,
          textbooks, headphones, USB-C docks, and webcams.
        </p>
      </section>

      <section className="notes-section">
        <h2>2. Who it's for and the problem</h2>

        <p>
          The target audience is university students looking for
          affordable second-hand academic and study-related equipment.
        </p>

        <p>
          New university students often need laptops, textbooks, and
          other study equipment but may have to go through many
          listings to find something suitable. SecondDesk aims to make
          this easier by helping students quickly discover relevant
          products and compare their options using natural-language
          search and catalogue assistance.
        </p>
      </section>

      <section className="notes-section">
        <h2>3. How the marketplace works</h2>

        <p>
          Users can start from the Browse page and filter listings by
          category, condition, and price. They can also sort listings
          and save items for later. Each listing has its own detail
          page with the item's description, specifications, seller
          information, and other relevant details.
        </p>

        <p>
          The AI assistant is available from the marketplace and can
          be used both to find listings and to ask questions about
          them.
        </p>

        <div className="notes-flow">
          <span>Homepage</span>
          <span>→</span>
          <span>Browse Listings</span>
          <span>→</span>
          <span>View Item</span>
          <span>→</span>
          <span>AI Search / Q&amp;A</span>
        </div>
      </section>

      <section className="notes-section">
        <h2>4. AI search and catalogue Q&amp;A</h2>

        <h3>Natural-language search</h3>

        <p>
          Instead of requiring users to search using exact product
          names or keywords, SecondDesk allows them to describe what
          they are looking for in their own words.
        </p>

        <p>
          The user's query is converted into an embedding using
          OpenAI's text-embedding-3-small model through the 
          OpenRouter gateway. The same embedding process is used 
          to represent the catalogue listings. Cosine similarity 
          is then used to find the listings that are most relevant 
          to the query.
        </p>

        <p>
          The most relevant listings are passed to GPT-5.6-terra as
          context. The model then generates a response based on those
          listings and returns the relevant listing IDs, which are
          shown as clickable recommendation cards in the interface.
        </p>

        <h3>Catalogue Q&amp;A</h3>

        <p>
          The same assistant can answer questions about the catalogue
          and compare products. It is instructed to only use
          information available in the retrieved listings and to say
          when the catalogue does not contain enough information to
          answer a question.
        </p>

        <div className="notes-flow">
          <span>User question</span>
          <span>→</span>
          <span>Semantic retrieval</span>
          <span>→</span>
          <span>Relevant listings</span>
          <span>→</span>
          <span>GPT-5.6-terra</span>
          <span>→</span>
          <span>Answer + listing recommendations</span>
        </div>
      </section>

      <section className="notes-section">
        <h2>5. Technology choices</h2>

        <p>
          The frontend was built with React and Vite, with CSS used
          for the interface and responsive layout. I chose this setup
          because it allowed me to build and iterate on the marketplace
          UI quickly while keeping the project lightweight.
        </p>

        <p>
          The backend uses Node.js and Express to handle the AI
          requests. The catalogue is stored as JSON because the
          assessment only requires a small seeded dataset of 30
          listings. This avoids adding database infrastructure that
          would not provide much benefit at this stage and allowed me
          to focus more on the AI search and catalogue Q&amp;A.
        </p>
      </section>

      <section className="notes-section">
        <h2>6. AI tools used during development</h2>

        <ul>
          <li>GPT-5.6-terra: Model used for catalogue Q&A and recommendations</li>
          <li>text-embedding-3-small: Model used for semantic retrieval</li>
          <li>Cursor: AI coding assistance</li>
          <li>ChatGPT: AI coding assistance, debugging, and testing</li>
        </ul>

        <p>
          I used Cursor and ChatGPT to support implementation, debugging, 
          and iteration throughout the project. They were particularly useful 
          when I ran into issues with the AI assistant, when refining the 
          responsive layout and overall interface, and when testing different 
          natural-language queries to improve the relevance of the results. 
          This helped me iterate on the project more efficiently throughout development.
        </p>
      </section>

      <section className="notes-section">
        <h2>7. Example AI tests</h2>

        <h3>Natural-language search</h3>

        <ul>
          <li>Lightweight laptop for programming under $700</li>
          <li>Monitor suitable for coding</li>
          <li>Cheap calculator for engineering students</li>
          <li>Tablet for note-taking below $300</li>
          <li>Show me a laptop under $700 near Tampines</li>
        </ul>

        <h3>Catalogue Q&amp;A</h3>

        <ul>
          <li>Which laptop is best for programming?</li>
          <li>Compare the ThinkPad T14 and Dell Latitude 5420.</li>
          <li>Which item offers the best value for money?</li>
          <li>Which laptop has the best battery life?</li>
          <li>Which device is best for note-taking?</li>
        </ul>

        <h3>Validation</h3>

        <p>The AI was tested against several scenarios to check both retrieval relevance and catalogue grounding:</p>
        <ul>
          <li>Natural-language product searches returned relevant listings.</li>
          <li>Budget constraints were respected, such as finding laptops under $600.</li>
          <li>Product comparisons were based only on information available in the catalogue.</li>
          <li>Questions about missing specifications were answered by acknowledging that the information was not available rather than guessing.</li>
          <li>Requests with no suitable match returned no recommendations instead of suggesting an unsuitable listing.</li>
          <li>Recommended listings are returned as clickable cards linking to their detail pages.</li>
        </ul>
      </section>

      <section className="notes-section">
        <h2>8. What is simulated</h2>

        <p>
          The marketplace uses seeded sample listings rather than
          real marketplace inventory. There are no real sellers or
          transactions.
        </p>

        <p>
          The Sell Item feature is also simulated. Users can complete
          the listing form and receive a confirmation message, but the
          new listing is not persisted or added to the marketplace
          catalogue.
        </p>

        <p>
          Payments, messaging, and delivery or meetup logistics are
          not connected to real services.
        </p>
      </section>

      <section className="notes-section">
        <h2>9. What I chose not to build</h2>

        <ul>
          <li>User authentication</li>
          <li>Real payment processing</li>
          <li>Shopping cart</li>
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
        <h2>10. Known limitations</h2>

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
        </ul>
      </section>
    </main>
  );
}

export default Notes;