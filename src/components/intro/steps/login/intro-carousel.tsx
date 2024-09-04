import Carousel from '@/components/common/carousel'
import Typography from '@/components/common/typography'

const Title = ({ content }: { content: string }) => {
  return (
    <div className="whitespace-pre-line px-5 py-12 text-center">
      <Typography size="body0-2" color="neutral-000">
        {content}
      </Typography>
    </div>
  )
}

const CarouselItem = ({
  src,
  alt,
  title,
}: {
  src: string
  alt: string
  title: string
}) => {
  return (
    <>
      <Title content={title} />
      <img src={src} alt={alt} className="object-cover min-h-[240px]" />
    </>
  )
}

const items = [
  {
    src: '/images/intro-lost-map.gif',
    title: `보물섬으로 가는 지도를\n잃어버렸어...`,
    alt: '잃어버린 지도',
  },
  {
    src: '/images/intro-find-treasure.gif',
    title: `맛집으로 지도를 채우면\n보물섬이 나온다던데!`,
    alt: '보물섬',
  },
  {
    src: '/images/intro-lost-map.gif',
    title: `혼자서는 못할것 같아\n함께 채워볼래?`,
    alt: '항해',
  },
]

export const IntroCarousel = () => {
  return (
    <Carousel
      items={items.map((item) => (
        <CarouselItem
          key={item.src}
          src={item.src}
          title={item.title}
          alt={item.alt}
        />
      ))}
    />
  )
}
