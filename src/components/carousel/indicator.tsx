import cn from '@/utils/cn'

interface IndicatorProps {
  activeIndex: number
  numOfSlides: number
  onClick: (index: number) => void
}

const Indicator = ({ activeIndex, numOfSlides, onClick }: IndicatorProps) => {
  return (
    <div className="w-full h-[44px] flex justify-center items-center">
      <ul className="px-3 py-2 rounded-[50px] bg-[#BFBFBF] bg-opacity-[0.44] flex gap-2">
        {[...Array(numOfSlides)].map((_, i) => (
          <li key={i} className="h-2 w-2 flex">
            <button
              className={cn(
                'bg-black h-2 w-2 rounded-full',
                i !== activeIndex && 'bg-opacity-30',
              )}
              aria-pressed={i === activeIndex}
              aria-label={`${i + 1} 번째 사진으로 이동`}
              onClick={() => onClick(i)}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Indicator
