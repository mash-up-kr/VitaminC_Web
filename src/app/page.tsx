import { Button, QRCode } from '@/components'

const Home = () => {
  return (
    <main className="w-full min-h-screen flex flex-col justify-center items-center bg-neutral-600">
      <QRCode url="http://localhost:3000" />
      <Button colorScheme="orange">HI</Button>
    </main>
  )
}

export default Home
