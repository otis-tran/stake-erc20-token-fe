import { useAccount, useReadContract } from 'wagmi'
import { useEffect, useState } from 'react'
import { DYNAMIC_STAKE_ABI } from '../../contracts/abis/dynamic-stake'
import { OTIS_TRAN_TOKEN_ABI } from '../../contracts/abis/otis-tran-token'
import { EAC_AGGREGATOR_PROXY_ABI } from '../../contracts/abis/eac-aggregator-proxy'


export const CONTRACT_ADDRESS = '0xCF58c636805f34C9e4d50cD5270d4Ee3a1A4f4D7'
export const TOKEN_ADDRESS = '0x23Bc11a50F726D7C15EF62d78978a942D6644681'
export const CHAINLINK_ETH_USD_FEED='0x798c8F5FF3dBa2B8CD95814936e1725c539d5C98'

export const useStakingData = () => {
  const { address } = useAccount()
  const [apy, setApy] = useState<number>(0)

  const { data: staked = BigInt(0) } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: DYNAMIC_STAKE_ABI,
    functionName: 'staked',
    args: [address!],
  })

  const { data: reward = BigInt(0) } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: DYNAMIC_STAKE_ABI,
    functionName: 'calculateReward',
    args: [address!],
    query: {
      refetchInterval: 1000,
    },
  })

  // Giả định ETH = $1574 để tính APY tạm
  useEffect(() => {
    const ethPrice = 1574
    const rewardRate = ethPrice / 1252389
    const yearly = rewardRate * 525600
    const estimatedApy = (yearly / ethPrice) * 100
    setApy(estimatedApy)
  }, [])

  const { data: ethUsdPrice = BigInt(0) } = useReadContract({
    address: CHAINLINK_ETH_USD_FEED,
    abi: EAC_AGGREGATOR_PROXY_ABI,
    functionName: 'latestAnswer',
    query: {
      refetchInterval: 1000,
    },
  });
  
  const { data: tokenBalance = BigInt(0) } = useReadContract({
    address: TOKEN_ADDRESS,
    abi: OTIS_TRAN_TOKEN_ABI,
    functionName: 'balanceOf',
    args: [address!],
    query: {
      refetchInterval: 1000,
    },
  });
  
  return {
    staked,
    reward,
    apy,
    tokenBalance,
    ethUsdPrice,
  }
}
