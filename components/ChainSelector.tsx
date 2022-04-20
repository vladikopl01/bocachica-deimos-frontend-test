import { useCallback, useState } from "react"

import type { Web3ReactHooks } from "@web3-react/core"
import type { MetaMask } from "@web3-react/metamask"
import { Network } from "@web3-react/network"

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Box,
} from "@mui/material"

import { CHAINS, getAddChainParameters, URLS } from "../connectors/chains"

function SelectNetwork({
  chainId,
  switchChain,
  displayDefault,
  chainIds,
}: {
  chainId: number | undefined
  switchChain: (chainId: number) => void | undefined
  displayDefault: boolean
  chainIds: number[]
}) {
  return (
    <Box mb="1rem">
      <FormControl>
        <InputLabel id="chain-select-label">Network</InputLabel>
        <Select
          labelId="chain-select-label"
          id="chain-select"
          value={chainId}
          label="Network"
          onChange={(event) => {
            switchChain?.(Number(event.target.value))
          }}
          disabled={switchChain === undefined}
        >
          {displayDefault ? (
            <MenuItem value={-1}>Default chain</MenuItem>
          ) : null}
          {chainIds.map((chainId) => (
            <MenuItem key={chainId} value={chainId}>
              {CHAINS[chainId]?.name ?? chainId}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export function ChainSelector({
  connector,
  chainId,
  isActivating,
  error,
  isActive,
}: {
  connector: MetaMask | Network
  chainId: ReturnType<Web3ReactHooks["useChainId"]>
  isActivating: ReturnType<Web3ReactHooks["useIsActivating"]>
  error: ReturnType<Web3ReactHooks["useError"]>
  isActive: ReturnType<Web3ReactHooks["useIsActive"]>
}) {
  const isNetwork = connector instanceof Network
  const displayDefault = !isNetwork
  const chainIds = (isNetwork ? Object.keys(URLS) : Object.keys(CHAINS)).map(
    (chainId) => Number(chainId)
  )

  const [desiredChainId, setDesiredChainId] = useState<number>(
    isNetwork ? 1 : -1
  )

  const switchChain = useCallback(
    async (desiredChainId: number) => {
      setDesiredChainId(desiredChainId)
      if (desiredChainId === chainId) return
      if (desiredChainId === -1 && chainId !== undefined) return

      if (connector instanceof Network) {
        await connector.activate(
          desiredChainId === -1 ? undefined : desiredChainId
        )
      } else {
        await connector.activate(
          desiredChainId === -1
            ? undefined
            : getAddChainParameters(desiredChainId)
        )
      }
    },
    [connector, chainId]
  )

  if (error) {
    return (
      <div>
        <SelectNetwork
          chainId={desiredChainId}
          switchChain={switchChain}
          displayDefault={displayDefault}
          chainIds={chainIds}
        />
        <Button
          variant="contained"
          onClick={() =>
            connector instanceof Network
              ? void connector.activate(
                  desiredChainId === -1 ? undefined : desiredChainId
                )
              : void connector.activate(
                  desiredChainId === -1
                    ? undefined
                    : getAddChainParameters(desiredChainId)
                )
          }
        >
          Try again?
        </Button>
      </div>
    )
  } else if (isActive) {
    return (
      <div>
        <SelectNetwork
          chainId={desiredChainId === -1 ? -1 : chainId}
          switchChain={switchChain}
          displayDefault={displayDefault}
          chainIds={chainIds}
        />
        <Button
          variant="contained"
          color="error"
          onClick={() => void connector.deactivate()}
        >
          Disconnect
        </Button>
      </div>
    )
  } else {
    return (
      <div>
        <SelectNetwork
          chainId={desiredChainId}
          switchChain={isActivating ? undefined : switchChain}
          displayDefault={displayDefault}
          chainIds={chainIds}
        />
        <Button
          variant="contained"
          color="success"
          onClick={
            isActivating
              ? undefined
              : () =>
                  connector instanceof Network
                    ? connector.activate(
                        desiredChainId === -1 ? undefined : desiredChainId
                      )
                    : connector.activate(
                        desiredChainId === -1
                          ? undefined
                          : getAddChainParameters(desiredChainId)
                      )
          }
          disabled={isActivating}
        >
          Connect to MetaMask
        </Button>
      </div>
    )
  }
}
