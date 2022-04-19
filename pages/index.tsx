import type { NextPage } from "next"
import { Alert, Button, Container, Stack, Typography } from "@mui/material"

const Home: NextPage = () => {
  return (
    <Container>
      <Stack spacing={2}>
        <Typography variant="h3">BCDeimos</Typography>
        <Alert severity="warning">Metamask is not connected</Alert>
        <Button variant="contained" color="success">
          Connect to MetaMask
        </Button>
      </Stack>
    </Container>
  )
}

export default Home
