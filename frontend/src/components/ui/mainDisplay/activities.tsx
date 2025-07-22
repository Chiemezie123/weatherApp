import { useEffect, useState } from "react";
import { activityCardData, LAT, LON } from "@/constants/option";
import ActivityCard from "@/components/cards/activityCard";
import Graphcard from "@/components/cards/graphcard";
import { useWeather } from "@/hooks/useWeather";
import Mountain from "@/assets/images/Mountain.png";
import Running from "@/assets//images/Man_Running.png";
import Picnic from "@/assets/images/Umbrella_On_Ground.png";
import Stargazing from "@/assets/images/Shooting_Star.png";





export interface HourlyWeatherData {
  dt: number;
  temp: number;
  weather: Array<{
    description: string;
    icon: string;
  }>;
  humidity: number;
  wind_speed: number;
  uvi: number;
  clouds: number;
  pressure: number;
  visibility: number;
  pop?: number; 
  aqi ? : number;
}


export interface ProcessedChartData {
  dt: number;
  temp: number;
  humidity: number;
  pop: number;
  clouds: number;
  uvi: number;
  wind_speed: number;
  aqi?: { value: number };
}

const Activities = () => {
  const { weather } = useWeather(LAT, LON);
 

  const [weatherType, setWeatherType] = useState<
    "hiking" | "running" | "picnic" | "stargazing"
  >("hiking");

  const [recommendation, setRecommendation] = useState({
    title: "Loading...",
    description: "Please wait while we generate a summary.",
  });

  const [chartData, setChartData] = useState<{ time: string; value: number }[]>([]);

  const selectActivityImage = [
    {
      name: "hiking",
      imgSrc: Mountain,
    },
    {
      name: "running",
      imgSrc: Running,
    },
    {
      name: "picnic",
      imgSrc: Picnic,
    },
    {
      name: "stargazing",
      imgSrc: Stargazing,
    },
  ];




function processChartData(
  hourlyData: Array<ProcessedChartData>,
  type: "hiking" | "running" | "picnic" | "stargazing"
): Array<{ time: string; value: number }>

{
  return hourlyData
    .filter((_, i) => i % 3 === 0)
    .map((hour) => {
      const time = new Date(hour.dt * 1000);
      const timeLabel = time.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const temp = hour.temp;
      const humidity = hour.humidity;
      const pop = hour.pop;
      const clouds = hour.clouds;
      const uvi = hour.uvi;
      const wind = hour.wind_speed;
      const aqi = hour.aqi?.value || 1;

      let score = 0;

      if (type === "picnic") {
        const hourOfDay = time.getHours();
        const isDaytime = hourOfDay >= 6 && hourOfDay <= 18;
        if (isDaytime) {
          if (temp >= 18 && temp <= 28) score++;
          if (humidity < 60) score++;
          if (pop < 0.2) score++;
          if (clouds < 40) score++;
          if (uvi < 6) score++;
          if (wind < 5) score++;
          if (aqi <= 2) score++;
        }
        score = Math.min(5, (score / 7) * 5);
      }

      if (type === "hiking") {
        const hourOfDay = time.getHours();
        const isDaytime = hourOfDay >= 6 && hourOfDay <= 18;
        if (isDaytime) {
          if (temp >= 10 && temp <= 25) score++;
          if (pop < 0.1) score++;
          if (uvi < 6) score++;
          if (wind < 6) score++;
          if (aqi <= 2) score++;
        }
        score = Math.min(5, score);
      }

      if (type === "running") {
        const hourOfDay = time.getHours();
        const isDaytime = hourOfDay >= 6 && hourOfDay <= 18;
        if (isDaytime) {
          if (temp >= 10 && temp <= 25) score++;
          if (pop < 0.1) score++;
          if (uvi < 6) score++;
          if (wind < 6) score++;
          if (aqi <= 2) score++;
        }
        score = Math.min(5, score);
      }

      if (type === "stargazing") {
        const hourOfDay = time.getHours();
        const isNight = hourOfDay >= 20 || hourOfDay <= 4;

        if (isNight) {
          if (temp >= 5 && temp <= 20) score++;
          if (humidity < 80) score++;
          if (pop < 0.1) score++;
          if (clouds < 20) score++;
          if (aqi <= 2) score++;
        }
        score = Math.min(5, score);
      }

      return {
        time: timeLabel,
        value: score,
      };
    });
}


useEffect(() => {
  if (weather?.hourly) {
    const fetchRecommendation = async () => {
      try {
        const updatedData = processChartData(
          weather.hourly.map((hour: HourlyWeatherData) => ({
            dt: hour.dt,
            temp: hour.temp,
            humidity: hour.humidity,
            pop: hour.pop ?? 0, 
            clouds: hour.clouds,
            uvi: hour.uvi,
            wind_speed: hour.wind_speed,
            aqi: typeof hour.aqi === "number" ? { value: hour.aqi } : undefined,
          })),
          weatherType
        );
        setChartData(updatedData);

        const response = await fetch("api/recommendation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ weatherType, chartData: updatedData }),
        });

        const data = await response.json();

        if (data?.title && data?.description) {
          setRecommendation(data);
        } else {
          setRecommendation({
            title: "Recommendation not available",
            description: "We couldn't generate a summary at this time.",
          });
        }
      } catch {
        setRecommendation({
          title: "Error generating recommendation",
          description: "Please try again later.",
        });
      } finally {
        console.log("Recommendation fetched successfully");
      }
    };

    fetchRecommendation();
  }
}, [weather, weatherType]);







  return (
    <div className="w-full flex gap-4 items-start">

      <div className="w-full flex flex-col items-start max-w-[262px] gap-[15px]">
        {activityCardData.map((card, index) => (
          <ActivityCard
            check={weatherType}
            key={index}
            imgSrc={card.imgSrc}
            text={card.text}
            onClick={() => setWeatherType(card.text as typeof weatherType)}
          />
        ))}
      </div>

      <div className="w-full">
        <Graphcard
          title={recommendation?.title}
          description={recommendation?.description}
          chartDetails={
            chartData.length > 0
              ? { chartData, activity: weatherType }
              : undefined
          }
          imgSrc={
            selectActivityImage.find((item) => item.name === weatherType)
              ?.imgSrc || ""
          }
        />
      </div>
    </div>
  );
};

export default Activities;
