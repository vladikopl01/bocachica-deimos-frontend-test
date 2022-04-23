import type { BigNumber } from "@ethersproject/bignumber"
import { formatEther } from "@ethersproject/units"
import { Box, ListItemText, Typography } from "@mui/material"
import type { Web3ReactHooks } from "@web3-react/core"
import { useEffect, useState } from "react"

function useBalance(
  provider?: ReturnType<Web3ReactHooks["useProvider"]>,
  accounts?: string[]
): BigNumber[] | undefined {
  const [balances, setBalances] = useState<BigNumber[] | undefined>()

  useEffect(() => {
    if (provider && accounts?.length) {
      let state = false
      void Promise.all(
        accounts.map((account) => provider.getBalance(account))
      ).then((balances) => {
        if (!state) {
          setBalances(balances)
        }
      })

      return () => {
        state = true
        setBalances(undefined)
      }
    }
  }, [provider, accounts])

  return balances
}

export function Accounts({
  accounts,
  provider,
  ENSNames,
}: {
  accounts: ReturnType<Web3ReactHooks["useAccounts"]>
  provider: ReturnType<Web3ReactHooks["useProvider"]>
  ENSNames: ReturnType<Web3ReactHooks["useENSNames"]>
}) {
  const balances = useBalance(provider, accounts)

  if (accounts === undefined) return null

  return (
    <Box mb="1rem">
      <Typography>Accounts: </Typography>
      {accounts.length === 0
        ? "None"
        : accounts?.map((account, i) => (
            <ListItemText
              key={account}
              style={{
                margin: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {ENSNames?.[i] ?? account}
              {balances?.[i] ? ` (Ξ${formatEther(balances[i])})` : null}
            </ListItemText>
          ))}
    </Box>
  )
}
