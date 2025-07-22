import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/api/recommendation", async (req, res) => {
  const { weatherData } = req.body;

  console.log(weatherData, "lol");
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that suggests weather-appropriate activities.",
          },
          {
            role: "user",
            content: `Here is the weather data: ${JSON.stringify(
              weatherData
            )}. Based on this, what activities can be done today?`,
          },
        ],
      }),
    });

    const result = await response.json();
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong." });
  }
});

app.post("/api/summary", async (req, res) => {
  const { weatherData } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1",
        messages: [
          {
            role: "system",
            content:
              "brief summary of an activity based on the weather data provided. The response should be a short line of 7 words or less. eg Expect partly sunny skies. The high will reach 91° on this humid day. do not pass 7 words, dont talk about the weather parameters just describe !!",
          },
          {
            role: "user",
            content: `Here is the weather data: ${JSON.stringify(
              weatherData
            )}.brief summary of an activity based on the weather data provided. The response should be a short line of 7 words or less. eg Expect partly sunny skies. The high will reach 91° on this humid day. do not pass 7 words ,dont talk about the weather parameters just describe !!`,
          },
        ],
      }),
    });

    const result = await response.json();
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong." });
  }
});

app.post("/api/returnInformation", async (req, res) => {
  const { weatherType, chartData } = req.body;

  if (!chartData || !weatherType) {
    return res.status(400).json({ error: "Missing weatherType or chartData" });
  }

  try {
    const prompt = `
You are a weather assistant. Based on the following weather data and activity type, generate a recommendation title and a short, friendly description (1-2 sentences) for a chart card.

Activity Type: ${weatherType}
Data (time series, partial): ${JSON.stringify(chartData.slice(0, 6))}

Respond in this format:
{
  "title": "...",
  "description": "..."
}
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    const result = await response.json();
    const content = result.choices?.[0]?.message?.content ?? "";

    const parsed = JSON.parse(content);

    res.status(200).json(parsed);
  } catch (error) {
    console.error("AI error:", error);
    res.status(500).json({ error: "Failed to generate recommendation." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
