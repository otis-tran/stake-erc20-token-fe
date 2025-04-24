import StakeCard from './StakeCard';

interface StakeInfoProps {
    totalStaked?: string | number;
    availableToStake?: string | number;
    rewards?: string | number;
}

const StakeInfo = ({
    totalStaked = '950',
    availableToStake = '1,000',
    rewards = '45'
}: StakeInfoProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            <StakeCard
                amount={totalStaked}
                title="Total Staked"
            />
            <StakeCard
                amount={availableToStake}
                title="Available to Stake"
            />
            <StakeCard
                amount={rewards}
                title="Rewards Earned"
            />
        </div>
    );
};

export default StakeInfo; 