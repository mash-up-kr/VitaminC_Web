'use client'

import { Button, Chip, ChipButton, QRCode, Typography } from '@/components'
import { notify } from '@/components/common/custom-toast'

const Home = () => {
  return (
    <main className="w-full min-h-screen flex flex-col justify-center items-center bg-neutral-600">
      <QRCode url="http://localhost:3000" />
      <Button colorScheme="orange" onClick={() => notify.success('success!')}>
        click success
      </Button>
      <Button colorScheme="neutral" onClick={() => notify.error('error!')}>
        click error
      </Button>
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
      <Chip size="sm" fontSize="h7" colorScheme="orange">
        진영 Pick
      </Chip>
      <Chip size="md" fontSize="body3" colorScheme="neutral-400">
        🍝 태그설명
      </Chip>
      <Chip size="md" fontSize="body3" colorScheme="orange">
        🍝 태그설명
      </Chip>
      <Chip size="lg" fontSize="body0" colorScheme="neutral-500">
        도라방스
      </Chip>
      <ChipButton rightIcon={{ type: 'close' }}>한우갈비</ChipButton>
    </main>
  )
}

export default Home
