import { Contract } from "@ethersproject/contracts"
import { abi as BCDEIMOS_ABI } from "../abis/BCDeimosContract.json"
import { useMemo } from "react"
import { useWeb3React } from "@web3-react/core"
import { getContract } from "../utility"
import { Web3Provider } from "@ethersproject/providers"
import { CONTRACT_ADDRESS } from "../utility/constants"

function useContract(ABI: any, address: string | undefined): Contract | null {
  const { provider, account } = useWeb3React()

  return useMemo(() => {
    if (!address || !ABI || !provider) return null
    try {
      return getContract(address, ABI, provider as Web3Provider)
    } catch (error) {
      console.error("Failed to get contract", error)
      return null
    }
  }, [address, ABI, provider])
}

export function useBCDeimosContract(): Contract | null {
  return useContract(BCDEIMOS_ABI, CONTRACT_ADDRESS)
}
