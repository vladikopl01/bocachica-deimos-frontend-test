import { Alert, Box } from "@mui/material"

import type { Web3ReactHooks } from "@web3-react/core"

export function Status({
  isActivating,
  error,
  isActive,
}: {
  isActivating: ReturnType<Web3ReactHooks["useIsActivating"]>
  error: ReturnType<Web3ReactHooks["useError"]>
  isActive: ReturnType<Web3ReactHooks["useIsActive"]>
}) {
  return (
    <Box mb="1rem">
      {error ? (
        <Alert severity="error">
          {error.name ?? "Error"}
          {error.message ? `: ${error.message}` : null}
        </Alert>
      ) : isActivating ? (
        <Alert severity="info">Connecting...</Alert>
      ) : isActive ? (
        <Alert severity="success">Metamask connected</Alert>
      ) : (
        <Alert severity="warning">MetaMask is not connected</Alert>
      )}
    </Box>
  )
}
