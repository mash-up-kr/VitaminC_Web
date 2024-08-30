import cn from '@/utils/cn'

interface IndicatorProps {
  activeIndex: number
  numOfSlides: number
  position: 'bottom' | 'inside'
  onClick: (index: number) => void
}

const Indicator = ({
  activeIndex,
  numOfSlides,
  position,
  onClick,
}: IndicatorProps) => {
  return (
    <div
      className={cn(
        'flex h-[44px] w-full items-center justify-center',
        position === 'inside' && 'absolute bottom-[10px] z-[100]',
      )}
    >
      <ul className="flex gap-2 rounded-[50px] bg-[#BFBFBF] bg-opacity-[0.44] px-3 py-2">
        {[...Array(numOfSlides)].map((_, index) => (
          <li key={index} className="flex h-2 w-2">
            <button
              className={cn(
                'h-2 w-2 rounded-full bg-black',
                index !== activeIndex && 'bg-opacity-30',
              )}
              aria-pressed={index === activeIndex}
              aria-label={`${index + 1} 번째 사진으로 이동`}
              onClick={() => onClick(index)}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Indicator
