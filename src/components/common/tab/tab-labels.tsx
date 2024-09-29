import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useTabContext } from './context'
import type { ClassName } from '@/models/common'
import cn from '@/utils/cn'
import Typography from '../typography'

interface TabLabelsProps extends ClassName {
  labels: string[]
}

const TabLabels = ({ labels, className }: TabLabelsProps) => {
  const { activeTab, setActiveTab } = useTabContext()
  const [tabRects, setTabRects] = useState<{ left: number; width: number }[]>(
    [],
  )
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    if (containerRef.current && buttonRefs.current.length === labels.length) {
      const rects = buttonRefs.current.map((button) =>
        button ? button.getBoundingClientRect() : { left: 0, width: 0 },
      )
      const containerRect = containerRef.current.getBoundingClientRect()
      const adjustedRects = rects.map((rect) => ({
        left: rect.left - containerRect.left,
        width: rect.width,
      }))
      setTabRects(adjustedRects)
    }
  }, [labels])

  const activeIndex = labels.findIndex((label) => label === activeTab)

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      <div className="flex gap-4">
        {labels.map((label, index) => (
          <button
            key={label}
            ref={(el) => {
              buttonRefs.current[index] = el
            }}
            type="button"
            onClick={() => setActiveTab(label)}
          >
            <Typography
              size="h5"
              color="neutral-000"
              className="relative font-[500]"
            >
              {label}
            </Typography>
          </button>
        ))}
      </div>

      {activeIndex >= 0 && tabRects[activeIndex] && (
        <motion.div
          className="absolute bottom-[-4px] h-[1px] bg-neutral-000"
          layoutId="underline"
          initial={false}
          animate={{
            left: `${tabRects[activeIndex].left}px`,
            width: `${tabRects[activeIndex].width}px`,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
    </div>
  )
}

export default TabLabels
