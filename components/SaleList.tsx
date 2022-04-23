import { Box } from "@mui/system"
import { useWeb3React } from "@web3-react/core"
import { useEffect, useState } from "react"
import { BCDeimosContract } from "../abis/types"
import { useBCDeimosContract } from "../hooks/useContract"
import { SaleCard } from "./SaleCard"

export function SaleList() {
  const { account } = useWeb3React()
  const contract = useBCDeimosContract() as BCDeimosContract
  const [saleCount, setSaleCount] = useState<number>(0)

  useEffect(() => {
    if (account) {
      contract
        .connect(account as string)
        .getSaleCount()
        .then((res) => {
          setSaleCount(res)
        })
        .catch(console.error)
    }
  }, [account])

  const saleIds = Array.from({ length: saleCount }, (_, i) => i + 1)
  const saleCards = saleIds.map((item, index) => {
    return <SaleCard saleId={item} key={index} />
  })
  console.log("Contract: ", contract)
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {saleCards}
    </Box>
  )
}
