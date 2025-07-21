

export const getSuggestion = (temp: number, condition: string) => {
  const lowerCondition = condition.toLowerCase()
  if (lowerCondition.includes("rain")) return "Take an umbrella 🌧️"
  if (temp > 30) return "Stay hydrated 🥤 and wear light clothing"
  if (temp < 15) return "Wear a jacket 🧥"
  return "You're good to go! 😎"
}



export async function getRecommendations(weatherData) {
  try {
    const response = await fetch('http://localhost:5000/api/recommendation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ weatherData }),
    });

    const data = await response.json();
    
    console.log(data, "lets see the data")
    
    const message = data.choices?.[0]?.message?.content;
    return message;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return 'Sorry, something went wrong.';
  }
}

export async function getSummary(weatherData) {
  console.log("Weather data in getSummary:", weatherData);
  try {
    const response = await fetch('http://localhost:5000/api/summary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ weatherData }),
    });

    const data = await response.json();
    
    console.log(data, "lets see the data")
    
    const message = data.choices?.[0]?.message?.content;
    return message;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return 'Sorry, something went wrong.';
  }
}


export function toPercentage(value:number, total:number) {
  if (total === 0) return "0%";
  const percentage = (value / total) * 100;
  return `${Math.ceil(percentage)}%`;
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