interface StakeCardProps {
  amount: string | number;
  title?: string;
}

const StakeCard = ({ amount, title }: StakeCardProps) => {
  return (
    <div className="w-[300px] h-[180px] rounded-lg bg-black border border-white p-6 flex flex-col shadow-md ">
      {/* Card Title */}
      {title && (
        <div className="text-white text-lg font-medium">
          {title}
        </div>
      )}

      {/* Amount */}
      <div className="text-6xl font-bold text-white tracking-wider mt-6">
        {amount}
      </div>
    </div>
  );
};

export default StakeCard;
