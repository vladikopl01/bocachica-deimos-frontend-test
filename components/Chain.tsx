import { Box, Chip } from "@mui/material"

import type { Web3ReactHooks } from "@web3-react/core"
import { CHAINS } from "../connectors/chains"

export function Chain({
  chainId,
}: {
  chainId: ReturnType<Web3ReactHooks["useChainId"]>
}) {
  if (chainId === undefined) return null

  const name = chainId ? CHAINS[chainId]?.name : undefined

  if (name) {
    return (
      <Box mb="1rem">
        <Chip label={name} />
      </Box>
    )
  }

  return (
    <div>
      <Chip label={"Chain ID: " + chainId} />
    </div>
  )
}
