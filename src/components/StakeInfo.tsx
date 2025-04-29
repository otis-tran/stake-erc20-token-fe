import { FC } from 'react';

interface StakeMetricProps {
  label: string;
  value: string;
  currency?: string;
}

const StakeMetric: FC<StakeMetricProps> = ({ label, value, currency }) => {
  return (
    <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:bg-black/50 transition-all duration-300">
      <div className="text-gray-400 text-sm mb-2">{label}</div>
      <div className="flex items-baseline gap-1">
        {currency && (
          <span className="text-gray-400 text-xl font-medium">{currency}</span>
        )}
        <span className="text-white text-3xl font-bold tracking-tight">{value}</span>
      </div>
    </div>
  );
};

interface StakeInfoProps {
  netStakedIO?: string;
  netStakedUSD?: string;
  grossStaked?: string;
  totalGPUs?: string;
}

const StakeInfo: FC<StakeInfoProps> = ({
  netStakedIO = "5,086,794.34",
  netStakedUSD = "4,153,911.56",
  grossStaked = "8,254,767.27",
  totalGPUs = "6,213"
}) => {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StakeMetric
          label="Net Staked Amount (TVL in $IO)"
          value={netStakedIO}
          currency="$IO"
        />
        <StakeMetric
          label="Net Staked Amount (TVL in USD)"
          value={netStakedUSD}
          currency="$"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StakeMetric
          label="Gross Staked Amount"
          value={grossStaked}
          currency="$IO"
        />
        <StakeMetric
          label="GPUs/CPUs With Full Stake"
          value={totalGPUs}
        />
      </div>
    </div>
  );
};

export default StakeInfo; 
