import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material"
import { useWeb3React } from "@web3-react/core"
import { ethers, BigNumber } from "ethers"
import { useEffect, useState } from "react"
import { BCDeimosContract } from "../abis/types"
import { useBCDeimosContract } from "../hooks/useContract"

export function SaleCard({ saleId }: { saleId: number }) {
  const { account } = useWeb3React()
  const contract = useBCDeimosContract() as BCDeimosContract
  const [sale, setSale] = useState<{
    saleId: number
    saleInfo: BCDeimosContract.SaleInfoStruct
  }>()

  useEffect(() => {
    const fetchSale = async () => {
      const sale = await contract.connect(account as string).getSale(saleId)
      setSale({ saleId: sale[0], saleInfo: sale[1] })
    }

    fetchSale().catch(console.error)
  }, [account, contract, saleId])

  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        mb: "1rem",
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14, mb: "1rem" }}>
          Sale ID: {sale?.saleId}
        </Typography>
        <Typography sx={{ fontSize: 12 }}>
          Deposit token address: {sale?.saleInfo.depositToken}
        </Typography>
        <Typography sx={{ fontSize: 12, mb: "0.5rem" }}>
          Distribute token address: {sale?.saleInfo.distributeToken}
        </Typography>
        <Typography sx={{ fontSize: 12 }}>
          Min deposit:{" "}
          {ethers.utils.formatUnits(
            sale?.saleInfo.minDeposit.toString() as string
          )}
        </Typography>
        <Typography sx={{ fontSize: 12, mb: "0.5rem" }}>
          Max deposit:{" "}
          {ethers.utils.formatUnits(
            sale?.saleInfo.maxDeposit.toString() as string
          )}
        </Typography>
        <Typography sx={{ fontSize: 12 }}>
          Target deposit:{" "}
          {ethers.utils.formatUnits(
            sale?.saleInfo.targetDeposit.toString() as string
          )}
        </Typography>
        <Typography sx={{ fontSize: 12 }}>
          Current deposit:{" "}
          {ethers.utils.formatUnits(
            sale?.saleInfo.currentDeposit.toString() as string
          )}
        </Typography>
        <Typography sx={{ fontSize: 12, mb: "0.5rem" }}>
          Target distribute:{" "}
          {ethers.utils.formatUnits(
            sale?.saleInfo.targetDistribute.toString() as string
          )}
        </Typography>
        <Typography sx={{ fontSize: 12 }}>
          Start date:{" "}
          {new Date(
            Number(sale?.saleInfo.startDate.toString()) * 1000
          ).toUTCString()}
        </Typography>
        <Typography sx={{ fontSize: 12 }}>
          End date:{" "}
          {new Date(
            Number(sale?.saleInfo.endDate.toString()) * 1000
          ).toUTCString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" color="success">
          Deposit
        </Button>
        <Button size="small" variant="contained" color="warning">
          Claim
        </Button>
        <Button size="small" variant="contained" color="error">
          Refund
        </Button>
      </CardActions>
    </Card>
  )
}
