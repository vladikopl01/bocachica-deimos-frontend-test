import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers"
import { Contract } from "@ethersproject/contracts"
import { getAddress } from "@ethersproject/address"
import { AddressZero } from "@ethersproject/constants"

export function isAddress(value: any): string | false {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

export function getSigner(
  library: Web3Provider,
  account: string
): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked()
}

export function getProviderOrSigner(
  library: Web3Provider,
  account?: string
): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library
}

export function getContract(
  address: string,
  ABI: any,
  library: Web3Provider,
  account?: string
): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }
  return new Contract(
    address,
    ABI,
    getProviderOrSigner(library, account) as any
  )
}
