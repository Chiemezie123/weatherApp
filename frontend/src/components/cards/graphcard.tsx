import WeatherChart from "./weatherChart";
import type { WeatherChartProps } from "./weatherChart";

interface GraphcardProps {
  title: string;
  description: string;
  chartDetails?: WeatherChartProps;
  imgSrc?: string; // Optional image source for the card
}

const Graphcard = ({
  title,
  description,
  chartDetails,
  imgSrc,
  
}: GraphcardProps) => {
  return (
    <div className=" w-full flex flex-col items-start gap-12 rounded-2xl border p-4">
      <div className="flex flex-col items-start justify-center gap-2">
        <div className="rounded-[100px] border border-grey-200 w-10 h-10 flex items-center justify-center">
          <img src={imgSrc} alt={imgSrc} className="w-6 h-6" />
        </div>
        <div className="flex flex-col items-start ">
          <h2 className="text-lg leading-[150%] font-bold text-grey-900">
            {title}
          </h2>
          <p className="text-md text-grey-700 leading-[150%]">{description}</p>
        </div>
      </div>
      <div className="w-full">
        {chartDetails ? (
          <WeatherChart
            chartData={chartDetails.chartData}
            category={chartDetails.category}
            activity={chartDetails.activity}
          />
        ) : (
          <p>No chart data available</p>
        )}
      </div>
    </div>
  );
};

export default Graphcard;
