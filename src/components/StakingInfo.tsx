import { useStakingData } from '@/hooks/useStakingData'
import { formatEther } from 'viem'

export default function StakingInfo() {
    const { staked, reward, apy, tokenBalance, ethUsdPrice } = useStakingData()
    
    return (
        <div className="w-full max-w-2xl p-6 space-y-4 border rounded-lg">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold">Staking Information</h2>

                <div className="space-y-1">
                    <p>Staked Amount: {formatEther(staked)} OTIS</p>
                    <p>Current Reward: {formatEther(reward)} OTIS</p>
                    <p>APY: {apy.toFixed(2)}%</p>
                    <p>Your Token Balance: {formatEther(tokenBalance)} OTIS</p>
                    <p>ETH/USD Price: ${Number(ethUsdPrice) / 100000000}</p>
                </div>
            </div>

            <div className="space-x-4">
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Stake
                </button>
                <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                    Claim Rewards
                </button>
                <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                    Unstake
                </button>
            </div>
        </div>
    )
} 
