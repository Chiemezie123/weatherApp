import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
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

    return res.status(200).json(parsed);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong." });
  }
}
