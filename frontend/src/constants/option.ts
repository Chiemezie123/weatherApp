import umbrella from "@/assets/images/Umbrella.png";
import outdoor from "@/assets/images/Beach With Umbrella.png";
import uv from "@/assets/images/Sun.png";
import drive from "@/assets/images/Sport Utility Vehicle.png";
import clothing from "@/assets/images/T Shirt.png";
import heat from "@/assets/images/Thermometer.png";
import Mountain from "@/assets/images/Mountain.png";
import Running from "@/assets//images/Man_Running.png";
import Picnic from "@/assets/images/Umbrella_On_Ground.png";
import Stargazing from "@/assets/images/Shooting_Star.png";
import Cycling from "@/assets/images/Woman_Biking.png";
import Gardening from "@/assets/images/House_With_Garden.png";

import type { ActivityCardProps } from "@/components/cards/activityCard";



export const LAT = 6.5244; 
export   const LON = 3.3792; 

export const healthCardData: ActivityCardProps[] = [
  {
    imgSrc: umbrella,
    text: "Umbrella",
    onClick: () => {},
  },

  {
    imgSrc: outdoor,
    text: "Outdoor",
    onClick: () => {},
  },

  {
    imgSrc: uv,
    text: "UV Index",
    onClick: () => {},
  },
  {
    imgSrc: drive,
    text: "Driving Safety",
    onClick: () => {},
  },
  {
    imgSrc: clothing,
    text: "Clothing",
    onClick: () => {},
  },
  {
    imgSrc: heat,
    text: "Heat Stroke",
    onClick: () => {},
  },
];

export const activityCardData: ActivityCardProps[] = [
  {
    imgSrc: Mountain,
    text: "Hiking",
    onClick: () => {},
  },

  {
    imgSrc: Running,
    text: "Running",
    onClick: () => {},
  },

  {
    imgSrc: Picnic,
    text: "Picnic",
    onClick: () => {},
  },
  {
    imgSrc: Stargazing,
    text: "Stargazing",
    onClick: () => {},
  },
  {
    imgSrc: Cycling,
    text: "Cycling",
    onClick: () => {},
  },
  {
    imgSrc: Gardening,
    text: "Gardening",
    onClick: () => {},
  },
];
