'use client'

import { Button, Chip, ChipButton, QRCode, Typography } from '@/components'
import Tooltip from '@/components/tooltip'

const Home = () => {
  return (
    <main className="w-full min-h-screen flex flex-col justify-center items-center bg-neutral-600">
      <QRCode url="http://localhost:3000" />
      <Button colorScheme="orange">HI</Button>
      <Typography size="h0" color="yellow-100">
        Typography
      </Typography>
      <Typography size="h1" color="orange-400">
        Typography
      </Typography>
      <Typography size="h2">Typography</Typography>
      <Typography size="h3">Typography</Typography>
      <Typography size="h4">Typography</Typography>
      <Typography size="h5">Typography</Typography>
      <Typography size="h5-2">Typography</Typography>
      <Typography size="h6">Typography</Typography>
      <Typography size="h7">Typography</Typography>
      <Typography size="body0">Typography</Typography>
      <Typography size="body1">Typography</Typography>
      <Typography size="body2">Typography</Typography>
      <Typography size="body3">Typography</Typography>
      <Typography size="body4">Typography</Typography>

      <Tooltip label="아아아아아아아" onClose={() => null}>
        테스트 테스트
      </Tooltip>
    </main>
  )
}

export default Home