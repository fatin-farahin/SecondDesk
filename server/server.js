import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import listings from "../src/data/listings.json" with { type: "json" };

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  baseURL: "https://174.138.16.223/v1",
  apiKey: process.env.CLASSGW_KEY,
});

const embeddingClient = new OpenAI({
  baseURL: "https://174.138.16.223/openrouter/v1",
  apiKey: process.env.CLASSGW_KEY,
});

async function getEmbedding(text) {
  const response = await embeddingClient.embeddings.create({
    model: "openai/text-embedding-3-small",
    input: text,
  });

  return response.data[0].embedding;
}

function cosineSimilarity(a, b) {
  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    magnitudeA += a[i] * a[i];
    magnitudeB += b[i] * b[i];
  }

  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0;
  }

  return (
    dotProduct /
    (Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB))
  );
}

let listingEmbeddings = null;

async function getListingEmbeddings() {
  if (listingEmbeddings) {
    return listingEmbeddings;
  }

  const inputs = listings.map(
    (listing) => `
Title: ${listing.title}
Category: ${listing.category}
Price: $${listing.price}
Condition: ${listing.condition}
Location: ${listing.location}
Description: ${listing.description}
Specifications: ${JSON.stringify(listing.specifications)}
`
  );

  const response = await embeddingClient.embeddings.create({
    model: "openai/text-embedding-3-small",
    input: inputs,
  });

  listingEmbeddings = response.data.map((item, index) => ({
    id: listings[index].id,
    embedding: item.embedding,
  }));

  return listingEmbeddings;
}

app.post("/api/ai", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || !question.trim()) {
      return res.status(400).json({
        error: "Please enter a question.",
      });
    }

    const queryEmbedding = await getEmbedding(question);

    const embeddings = await getListingEmbeddings();

    const rankedListings = embeddings
    .map((item) => ({
      ...item,
      score: cosineSimilarity(queryEmbedding, item.embedding),
    }))
    .sort((a, b) => b.score - a.score);

    const relevantIds = rankedListings
      .slice(0, 8)
      .map((item) => item.id);

    const relevantListings = listings.filter((listing) =>
      relevantIds.includes(listing.id)
    );

    const listingContext = relevantListings
      .map(
        (listing) => `
        ID: ${listing.id}
        Title: ${listing.title}
        Category: ${listing.category}
        Price: $${listing.price}
        Condition: ${listing.condition}
        Location: ${listing.location}
        Description: ${listing.description}
        Specifications: ${JSON.stringify(listing.specifications)}
        `
      )
      .join("\n");

    const response = await client.chat.completions.create({
      model: "gpt-5.6-terra",
      messages: [
        {
          role: "system",
          content: `
            You are SecondDesk AI, an assistant for a student marketplace in Singapore.

            Help users find suitable listings and answer questions using the retrieved marketplace data.

            Rules:
            - Only recommend products that actually exist in the retrieved listings.
            - Do not invent products, prices, specifications, sellers, or availability.
            - Consider the user's budget, category, requirements and preferences.
            - You can recommend listings, answer factual questions, and compare listings.
            - When comparing listings, only compare information provided in the retrieved listings.
            - If the catalogue does not provide information needed to answer a question, clearly say that the information is not available.
            - For price and budget questions, use the exact prices provided.
            - Recommend 3 to 5 matching listings when enough suitable listings exist.
            - Rank recommendations from most suitable to least suitable.
            - If none of the retrieved listings actually satisfy the user's request, say that no suitable listing was found and return an empty recommendations array.
            - Do not claim that you can purchase items, contact sellers, or perform marketplace actions.

            Return your response as valid JSON with exactly two fields:

            {
            "answer": "Your concise response.",
            "recommendations": [listing IDs]
            }

            For recommendations:
            - Only include IDs of listings that actually match the user's request.
            - Rank the IDs from most suitable to least suitable.
            - Use an empty array if there are no suitable listings.

            Retrieved marketplace listings:

            ${listingContext}
            `,
        },
        {
          role: "user",
          content: question,
        },
      ],
    });

    const rawAnswer = response.choices[0].message.content;

    const parsedAnswer = JSON.parse(rawAnswer);

    res.json({
      answer: parsedAnswer.answer,
      recommendations: parsedAnswer.recommendations,
    });
  } catch (error) {
    console.error("AI error:", error);

    res.status(500).json({
      error: "Sorry, I couldn't process your request right now.",
    });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`SecondDesk AI server running on port ${PORT}`);
});