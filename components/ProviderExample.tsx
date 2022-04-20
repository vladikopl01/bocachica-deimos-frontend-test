import {
  useWeb3React,
  Web3ReactHooks,
  Web3ReactProvider,
} from "@web3-react/core"
import { MetaMask } from "@web3-react/metamask"
import { Network } from "@web3-react/network"
import type { Connector } from "@web3-react/types"
import { hooks as metaMaskHooks, metamask } from "../connectors/metamask"
import { hooks as networkHooks, network } from "../connectors/network"

function getName(connector: Connector) {
  if (connector instanceof MetaMask) return "Metamask"
  if (connector instanceof Network) return "Network"
  return "Unknown"
}

const connectors: [MetaMask | Network, Web3ReactHooks][] = [
  [metamask, metaMaskHooks],
  [network, networkHooks],
]

function Child() {
  const { connector, account } = useWeb3React()
  console.log(`Current account is: ${account}`)
  console.log(`Connector is: ${getName(connector)}`)
  return null
}

export default function ProviderExample() {
  return (
    <Web3ReactProvider connectors={connectors}>
      <Child />
    </Web3ReactProvider>
  )
}
