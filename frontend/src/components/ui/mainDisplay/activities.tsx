import { useEffect, useState } from "react";
import { activityCardData, LAT, LON } from "@/constants/option";
import ActivityCard from "@/components/cards/activityCard";
import Graphcard from "@/components/cards/graphcard";
import { useWeather } from "@/hooks/useWeather";
import Mountain from "@/assets/images/Mountain.png";
import Running from "@/assets//images/Man_Running.png";
import Picnic from "@/assets/images/Umbrella_On_Ground.png";
import Stargazing from "@/assets/images/Shooting_Star.png";
import Cycling from "@/assets/images/Woman_Biking.png";
import Gardening from "@/assets/images/House_With_Garden.png";


const Activities = () => {
  const { weather, error, loading } = useWeather(LAT, LON);

  const [weatherType, setWeatherType] = useState<
    "hiking" | "running" | "picnic" | "stargazing"
  >("hiking");


  


  const [chartData, setChartData] = useState([]);

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

  function processChartData(hourlyData, type) {
    return hourlyData
      .filter((_, i) => i % 3 === 0)
      .map((hour) => {
        const time = new Date(hour.dt * 1000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        switch (type) {
          case "hiking":
            return {
                time,
            };
          case "running":
            return {};
          case "picnic":
            return {};
          case "stargazing":
            return {};
         
          default:
            return { time };
        }
      });
  }

  useEffect(() => {
    if (weather?.hourly) {
      const updatedData = processChartData(weather?.hourly, weatherType);
      setChartData(updatedData);
    }
  }, [weather, weatherType]);

  console.log(
    "Rendering chart with data:",
    weather?.hourly,
    "for type:",
    weatherType
  );

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
          title="Good day to be Outdoor!"
          description="Today is a good day to be outdoor. Ideal time: 1 PM - 3 AM."
           chartDetails={
            chartData.length > 0 ? { chartData, activity:weatherType } : undefined
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
