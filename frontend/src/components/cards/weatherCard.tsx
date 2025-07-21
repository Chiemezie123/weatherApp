// src/components/WeatherCard.tsx
import { getSuggestion } from "@/features/weather/weatherUtils"

interface Props {
  data: any
}

export default function WeatherCard({ data }: Props) {
  const { current, daily } = data
  const today = daily[0]
  const suggestion = getSuggestion(current.temp, current.weather[0].main)

  return (
    <div className="bg-white rounded-xl p-6 shadow-md max-w-md text-center">
      <h2 className="text-2xl font-bold mb-2">Today’s Weather in lagos , Nigeria</h2>
      <img
        className="w-20 mx-auto"
        src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
        alt={current.weather[0].description}
      />
      <p className="text-4xl font-bold">{current.temp}°C</p>
      <p className="text-gray-600 capitalize">{current.weather[0].description}</p>
      <p className="text-sm text-gray-500 mt-2">Feels like {current.feels_like}°C</p>
      <p className="text-sm text-gray-500">Humidity: {current.humidity}%</p>
      <p className="text-sm text-gray-500">Wind: {current.wind_speed} km/h</p>
      <p className="mt-4 font-medium text-blue-600">{suggestion}</p>
    </div>
  )
}
