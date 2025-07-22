export const getSuggestion = (temp: number, condition: string) => {
  const lowerCondition = condition.toLowerCase();
  if (lowerCondition.includes("rain")) return "Take an umbrella 🌧️";
  if (temp > 30) return "Stay hydrated 🥤 and wear light clothing";
  if (temp < 15) return "Wear a jacket 🧥";
  return "You're good to go! 😎";
};

export async function getRecommendations(weatherData) {
  try {
    const response = await fetch("http://localhost:5000/api/recommendation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ weatherData }),
    });

    const data = await response.json();

    console.log(data, "lets see the data");

    const message = data.choices?.[0]?.message?.content;
    return message;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return "Sorry, something went wrong.";
  }
}

export async function getSummary(weatherData) {
  console.log("Weather data in getSummary:", weatherData);
  try {
    const response = await fetch("http://localhost:5000/api/summary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ weatherData }),
    });

    const data = await response.json();

    console.log(data, "lets see the data");

    const message = data.choices?.[0]?.message?.content;
    return message;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return "Sorry, something went wrong.";
  }
}

export function toPercentage(value: number, total: number) {
  if (total === 0) return "0%";
  const percentage = (value / total) * 100;
  return `${Math.ceil(percentage)}%`;
}

export function calculateOutdoorScore(hour) {
  const temp = hour.temp;
  const uvi = hour.uvi;
  const precipitation = hour.pop * 100; // Convert to percentage
  const wind = hour.wind_speed;
  const humidity = hour.humidity;

  // Hard block: if it's likely to rain heavily, score is low regardless
  if (precipitation > 80) return 10; // Not suitable due to high rain

  let score = 100;

  // 🌡️ Temperature Scoring
  if (temp < 15 || temp > 30) {
    score -= 20;
  } else if ((temp >= 15 && temp < 20) || (temp > 25 && temp <= 30)) {
    score -= 10;
  }

  // 🌞 UV Index
  if (uvi > 8) {
    score -= 20;
  } else if (uvi > 5) {
    score -= 10;
  }

  // 🌧️ Precipitation (already handled extreme case above)
  if (precipitation > 50) {
    score -= 30;
  } else if (precipitation > 30) {
    score -= 20;
  } else if (precipitation > 10) {
    score -= 10;
  }

  // 💨 Wind
  if (wind > 20) {
    score -= 20;
  } else if (wind > 10) {
    score -= 10;
  }

  // 💧 Humidity
  if (humidity < 30 || humidity > 80) {
    score -= 10;
  }

  // Clamp score between 0 and 100
  return Math.max(0, Math.min(100, score));
}

export function vehicleMovementScore(hour: {
  visibility?: number; // in meters
  wind_speed?: number; // in m/s
  pop?: number; // in mm or 0.x format
}): number {
  let score = 100;

  const visibility = hour.visibility ?? 0; // in meters
  const wind = hour.wind_speed ?? 0; // in m/s
  const precip = hour.pop ?? 0; // assumed to be mm (or scale like 0.7)
  console.log(
    "Visibility:",
    visibility,
    "Wind Speed:",
    wind,
    "Precipitation:",
    precip
  );
  // Visibility scoring
  if (visibility < 2000) {
    score -= 60;
  } else if (visibility < 6000) {
    score -= 10;
  }

  // Wind speed scoring
  if (wind > 14) {
    score -= 20;
  } else if (wind > 8) {
    score -= 10;
  }

  // Precipitation scoring (new logic)
  if (precip > 70 || precip > 0.7) {
    score -= 70; // heavy rainfall
  } else if (precip > 10 || precip > 0.2) {
    score -= 20; // moderate rainfall
  } else if (precip > 2 || precip > 0.05) {
    score -= 10; // light rain
  }

  return Math.max(0, Math.min(100, score));
}

// const [recommendation, setRecommendation] = useState("");

// const handleGetRecommendation = async () => {
//   if (!weather?.current) return;

//   const message = await getRecommendations({
//     temperature: weather.current.temp,
//     weather: weather.current.weather[0].description,
//     humidity: weather.current.humidity,
//     windspeed: weather.current.wind_speed,
//     uvIndex: weather.current.uvi,
//     Cloudiness: weather.current.clouds,
//   });

//   setRecommendation(message);
// };
