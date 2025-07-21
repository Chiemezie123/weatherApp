import { useState } from 'react'
import { activityCardData } from '@/constants/option';
import ActivityCard from '@/components/cards/activityCard';
import Graphcard from '@/components/cards/graphcard';

const Activities = () => {

    const [graphUpdate, setGraphUpdate] = useState<string>("");
    
      const handleGraphUpdate = (update: string) => {
        setGraphUpdate(update);
      };
    
      console.log("Graph Update: ", graphUpdate);

  return (
    <div className="w-full flex gap-4 items-start">
      <div className="w-full flex flex-col items-start max-w-[262px] gap-[15px]">
        {activityCardData.map((card, index) => (
          <ActivityCard
            key={index}
            imgSrc={card.imgSrc}
            text={card.text}
            onClick={handleGraphUpdate.bind(null, card.text)}
          />
        ))}
      </div>
      <div className="w-full">
        <Graphcard
          title="Good day to be Outdoor!"
          description="Today is a good day to be outdoor. Ideal time: 1 PM - 3 AM."
        />
      </div>
    </div>
  )
}

export default Activities