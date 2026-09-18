# SecondDesk

SecondDesk is a second-hand marketplace designed for university students in Singapore. It provides a mobile-friendly browsing experience where users can explore listings and save products without signing in. Most importantly, they can use the AI assistant to find and compare items.

## Target Audience

SecondDesk is designed for university students who need affordable second-hand equipment for studying and everyday campus life.

## Problem Statement

Students may have to search through many listings or visit different sellers to find products that fit their needs and budget. SecondDesk makes this more convenient by bringing relevant options together in one place, allowing students to check details and compare items before deciding what to buy.

## Features
* Browse and search marketplace listings
* Filter by category, condition, price, and location
* Sort listings by price or recency
* View detailed product information
* Save listings to favourites
* AI assistant for natural-language product search and catalogue Q&A
* AI-powered product recommendations and comparisons

## AI Search & Catalogue Q&A

### Natural-Language Search

Users can describe what they are looking for in their own words. The query and catalogue listings are converted into embeddings using `text-embedding-3-small`, and cosine similarity is used to retrieve relevant listings. The retrieved listings are then passed to GPT-5.6-terra, which generates the response and returns relevant listing IDs for the recommendation cards.

### Catalogue Q&A

The AI assistant can answer questions and compare products using information from the retrieved catalogue listings. If the available catalogue information is insufficient, the assistant is instructed to say so rather than invent information.

### Flow:

User query → Semantic retrieval + filters → Relevant listings → GPT-5.6-terra → Answer + recommendations

## Tech Stack

* **Frontend:** React and Vite, with CSS for the interface and responsive layout.
* **Backend:** Node.js and Express to handle AI requests while keeping model gateway credentials server-side.
* **AI:** GPT-5.6-terra for response generation and catalogue Q&A; `text-embedding-3-small` for semantic search and retrieval.
* **Catalogue:** JSON-based seeded dataset containing 30 marketplace listings.

## Example AI tests

### 1. Budget Search

**Question:** Show me a laptop under $800 near Punggol.

**AI Reply:** A suitable laptop near Punggol under $800 is available: Lenovo ThinkPad T14 Gen 2 for $650 in good condition. It has an Intel Core i5-1135G7, 16GB RAM, and 512GB SSD.

### 2. Product Comparison

**Question:** Compare Lenovo and MacBook.

**AI Reply:** The Lenovo ThinkPad T14 Gen 2 costs $650 and offers more RAM and storage, while the MacBook Air M1 costs $720 and is lighter with longer stated battery life. Choose the Lenovo for more memory and storage, or the MacBook for portability and battery life.

### 3. Attribute-Based Search

**Question:** Which device is best for note-taking?

**AI Reply:** The Samsung Galaxy Tab S8 is the best fit for note-taking: it includes an S Pen and has an 11-inch screen, making it well suited for handwritten notes and annotating lecture slides.

### Validation

* Tested budget, comparison, and attribute-based queries against the seeded catalogue.
* Verified that recommendations only link to existing catalogue listings.
* Tested cases with no suitable matches and missing information to ensure the AI does not invent results.

## Project Status

SecondDesk is a prototype project built to demonstrate an AI-assisted marketplace experience. The marketplace listings are seeded, and some platform functionality, such as checkout and selling items, are simulated for demonstration purposes.
