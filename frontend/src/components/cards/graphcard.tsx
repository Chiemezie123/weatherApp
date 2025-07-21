

interface GraphcardProps {
  title: string;
  description: string;
}

const Graphcard = ({ title, description }: GraphcardProps) => {
  return (
    <div className=" w-full flex flex-col items-start gap-12 rounded-2xl border p-4">
      <div className="flex flex-col items-start justify-center gap-2">
        <div className="rounded-[100px] border border-grey-200 w-10 h-10"></div>
        <div className="flex flex-col items-start ">
          <h2 className="text-lg leading-[150%] font-bold text-grey-900">
            {title}
          </h2>
          <p className="text-md text-grey-700 leading-[150%]">{description}</p>
        </div>
      </div>
      <div>

      </div>
    </div>
  );
};

export default Graphcard;
