import type { NextPage } from "next"
import { Alert, Button, Container, Stack, Typography } from "@mui/material"
import MetaMaskCard from "../components/connectors/MetaMask"
import ProviderExample from "../components/ProviderExample"
import { SaleList } from "../components/SaleList"

import { MetaMask } from "@web3-react/metamask"
import { Network } from "@web3-react/network"
import { hooks as metaMaskHooks, metamask } from "../connectors/metamask"
import { hooks as networkHooks, network } from "../connectors/network"
import { Web3ReactProvider, Web3ReactHooks } from "@web3-react/core"

const connectors: [MetaMask | Network, Web3ReactHooks][] = [
  [metamask, metaMaskHooks],
  [network, networkHooks],
]

const Home: NextPage = () => {
  return (
    <Container>
      <Stack spacing={2}>
        <Typography variant="h3">BCDeimos</Typography>
        <MetaMaskCard />
        <ProviderExample>
          <SaleList />
        </ProviderExample>
      </Stack>
    </Container>
  )
}

export default Home
