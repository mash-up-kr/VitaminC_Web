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
        'w-full h-[44px] flex justify-center items-center',
        position === 'inside' && 'absolute bottom-[10px] z-[100]',
      )}
    >
      <ul className="px-3 py-2 rounded-[50px] bg-[#BFBFBF] bg-opacity-[0.44] flex gap-2">
        {[...Array(numOfSlides)].map((_, index) => (
          <li key={index} className="h-2 w-2 flex">
            <button
              className={cn(
                'bg-black h-2 w-2 rounded-full',
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
