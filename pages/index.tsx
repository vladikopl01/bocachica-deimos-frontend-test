import type { NextPage } from "next"
import { Alert, Button, Container, Stack, Typography } from "@mui/material"
import MetaMaskCard from "../components/connectors/MetaMask"
import ProviderExample from "../components/ProviderExample"

const Home: NextPage = () => {
  return (
    <Container>
      <ProviderExample />
      <Stack spacing={2}>
        <Typography variant="h3">BCDeimos</Typography>
        <MetaMaskCard />
      </Stack>
    </Container>
  )
}

export default Home
