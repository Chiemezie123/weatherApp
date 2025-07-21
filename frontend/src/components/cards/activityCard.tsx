

export interface ActivityCardProps {
  imgSrc: string;
  text: string;
  onClick: () => void;
}

const ActivityCard = ({ imgSrc, text, onClick }: ActivityCardProps) => {
  return (
    <div
      className="w-full h-[72px] flex items-center gap-4 p-4 rounded-2xl border border-grey-100 cursor-pointer"
      onClick={onClick}
    >
      <div className="w-10 h-10 flex items-center justify-center border border-grey-100 rounded-[100px]">
        <img src={imgSrc} alt={imgSrc} className="w-6 h-6" />
      </div>
      <div className="">
        <p className="text-grey-900 font-medium">{text}</p>
      </div>
    </div>
  );
};

export default ActivityCard;
