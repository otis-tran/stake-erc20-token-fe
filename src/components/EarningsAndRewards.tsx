import { FC } from 'react';

interface SeasonPointsProps {
  season: number;
  cpuPoints: number;
  gpuPoints: number;
}

const SeasonPoints: FC<SeasonPointsProps> = ({ season, cpuPoints, gpuPoints }) => {
  return (
    <div className="space-y-1">
      <div className="text-gray-400 uppercase text-sm">SEASON {season}</div>
      <div className="flex gap-8">
        <div className="space-x-2">
          <span className="text-gray-400">CPU Points:</span>
          <span className="text-white font-bold">{cpuPoints}</span>
        </div>
        <div className="space-x-2">
          <span className="text-gray-400">GPU Points:</span>
          <span className="text-white font-bold">{gpuPoints}</span>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
}

const StatCard: FC<StatCardProps> = ({ title, value, unit }) => {
  return (
    <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
      <div className="text-gray-400 text-sm mb-3">{title}</div>
      <div className="flex items-baseline gap-2">
        <span className="text-white text-3xl font-bold">{value}</span>
        {unit && (
          <div className="flex items-center gap-1">
            {unit === 'IO COIN' ? (
              <>
                <img 
                  src="/io-coin-logo.png" 
                  alt="IO Coin" 
                  className="w-5 h-5"
                />
                <span className="text-gray-400">COIN</span>
              </>
            ) : (
              <span className="text-gray-400">{unit}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

interface EarningsAndRewardsProps {
  seasons?: {
    cpuPoints: number;
    gpuPoints: number;
  }[];
  blockRewards?: number;
  jobEarnings?: number;
  computeHours?: number;
  computeJobs?: number;
}

const EarningsAndRewards: FC<EarningsAndRewardsProps> = ({
  seasons = [
    { cpuPoints: 0, gpuPoints: 0 },
    { cpuPoints: 0, gpuPoints: 0 },
    { cpuPoints: 0, gpuPoints: 0 }
  ],
  blockRewards = 0.00,
  jobEarnings = 0.00,
  computeHours = 0.00,
  computeJobs = 0
}) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-4">Earnings & Rewards</h2>
        <p className="text-gray-400">
          Earned incentives from renting your GPU as a cluster/instance, waiting for you to redeem.
        </p>
      </div>

      <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 space-y-6">
        <div>
          <div className="text-gray-400 uppercase text-sm mb-4">IGNITION PROGRAM POINTS</div>
          <div className="text-sm text-gray-400">
            Worker Points earned from idling or hired GPUs during io.net's Ignition Rewards Program
          </div>
        </div>

        <div className="space-y-4">
          {seasons.map((season, index) => (
            <SeasonPoints
              key={index}
              season={index + 1}
              cpuPoints={season.cpuPoints}
              gpuPoints={season.gpuPoints}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Block Rewards" 
          value={blockRewards.toFixed(2)}
          unit="IO COIN"
        />
        <StatCard 
          title="Total Job Earnings" 
          value={jobEarnings.toFixed(2)}
          unit="IO COIN"
        />
        <StatCard 
          title="Total Compute Hours Served" 
          value={computeHours.toFixed(2)}
          unit="Hrs"
        />
        <StatCard 
          title="Total Compute Jobs Served" 
          value={computeJobs}
        />
      </div>
    </div>
  );
};

export default EarningsAndRewards; 