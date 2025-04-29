import { FC } from 'react';
import { useAccount, useBalance, useChainId } from 'wagmi';
import { saigon } from 'wagmi/chains';
import { formatUnits } from 'viem';

interface NetworkInfoProps {
  chainId: number;
  status: 'connected' | 'disconnected';
}

const NetworkInfo: FC<NetworkInfoProps> = ({ chainId, status }) => {
  const getNetworkName = (id: number) => {
    switch (id) {
      case 1:
        return 'Ethereum Mainnet';
      case 5:
        return 'Goerli Testnet';
      case 11155111:
        return 'Sepolia Testnet';
      case 2020:
        return 'Ronin mainnet';
      case 2021:
        return 'Saigon testnet';
      default:
        return 'Unknown Network';
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 w-full">
      <div className="bg-black/30 rounded-xl p-4 backdrop-blur-sm border border-white/10">
        <div className="text-gray-400 text-sm mb-1">Chain ID</div>
        <div className="text-white font-medium">{chainId}</div>
      </div>
      <div className="bg-black/30 rounded-xl p-4 backdrop-blur-sm border border-white/10">
        <div className="text-gray-400 text-sm mb-1">Network</div>
        <div className="text-white font-medium">{getNetworkName(chainId)}</div>
      </div>
      <div className="bg-black/30 rounded-xl p-4 backdrop-blur-sm border border-white/10">
        <div className="text-gray-400 text-sm mb-1">Status</div>
        <div className="flex items-center gap-2">
          <span className={`font-medium ${status === 'connected' ? 'text-green-400' : 'text-red-400'}`}>
            {status}
          </span>
          <div className={`h-2 w-2 rounded-full ${status === 'connected' ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  isLoading?: boolean;
}

const StatCard: FC<StatCardProps> = ({ title, value, unit, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
        <div className="text-gray-400 text-sm mb-3">{title}</div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-400">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
      <div className="text-gray-400 text-sm mb-3">{title}</div>
      <div className="flex items-baseline gap-2">
        <span className="text-white text-3xl font-bold">{value}</span>
        {unit && (
          <div className="flex items-center gap-1">
            {unit === 'ETH' ? (
              <>
                <img
                  src="/ethereum-logo.png"
                  alt="Ethereum"
                  className="w-5 h-5"
                />
                <span className="text-gray-400">ETH</span>
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

const WalletInfo: FC = () => {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { data: balance, isLoading: isBalanceLoading } = useBalance({
    address,
    chainId: saigon.id,
  })

  if (!isConnected) {
    return (
      <div className="w-full max-w-3xl mx-auto">
        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-2">Wallet Information</h2>
          <p className="text-gray-400">
            Please connect your wallet to view your account information.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-6">Wallet Information</h2>

        <div className="space-y-6">
          <div>
            <div className="text-gray-400 text-sm mb-2">WALLET ADDRESS</div>
            <div className="bg-black/30 rounded-xl p-4 backdrop-blur-sm border border-white/10">
              <div className="text-white font-mono text-sm break-all">
                {address}
              </div>
            </div>
          </div>

          <div>
            <div className="text-gray-400 text-sm mb-2">BALANCE</div>
            <div className="bg-black/30 rounded-xl p-4 backdrop-blur-sm border border-white/10">
              {isBalanceLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-gray-400">Loading...</span>
                </div>
              ) : balance ? (
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-medium text-white">
                    {formatUnits(balance.value, balance.decimals)}
                  </span>
                  <span className="text-gray-400">{balance.symbol}</span>
                </div>
              ) : (
                <span className="text-gray-400">0.00</span>
              )}
            </div>
          </div>

          <div>
            <div className="text-gray-400 text-sm mb-2">NETWORK INFORMATION</div>
            <NetworkInfo
              chainId={chainId}
              status={isConnected ? 'connected' : 'disconnected'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletInfo; 
