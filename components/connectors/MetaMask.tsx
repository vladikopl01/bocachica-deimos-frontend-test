import { useEffect } from "react"
import {
  Card,
  CardContent,
  Stack,
  Alert,
  Button,
  Typography,
  Box,
} from "@mui/material"

import { hooks, metamask } from "../../connectors/metamask"
import { Status } from "../Status"
import { Chain } from "../Chain"
import { Accounts } from "../Accounts"
import { ChainSelector } from "../ChainSelector"

const {
  useChainId,
  useAccounts,
  useError,
  useIsActivating,
  useIsActive,
  useProvider,
  useENSNames,
} = hooks

export default function MetaMaskCard() {
  const chainId = useChainId()
  const accounts = useAccounts()
  const error = useError()
  const isActivating = useIsActivating()

  const isActive = useIsActive()

  const provider = useProvider()
  const ENSNames = useENSNames(provider)

  useEffect(() => {
    void metamask.connectEagerly()
  }, [])

  return (
    <Card>
      <CardContent>
        <Status isActivating={isActivating} error={error} isActive={isActive} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box mr="1rem">
            <Chain chainId={chainId} />
          </Box>
          <Accounts
            accounts={accounts}
            provider={provider}
            ENSNames={ENSNames}
          />
        </Box>

        <ChainSelector
          connector={metamask}
          chainId={chainId}
          isActivating={isActivating}
          error={error}
          isActive={isActive}
        />
      </CardContent>
    </Card>
  )
}
