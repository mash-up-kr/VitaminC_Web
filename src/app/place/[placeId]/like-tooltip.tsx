import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import cn from '@/utils/cn'
import type { ClassName } from '@/models/common'
import Avatar from '@/components/common/avatar'

interface LikeToolTipProps extends ClassName {
  likeMembers: string[]
  onClick: VoidFunction
}

const LikeAvatarMotion = motion(Avatar)

const LikeToolTip = ({ likeMembers, className, onClick }: LikeToolTipProps) => {
  const previousAvatarsRef = useRef<string[]>(likeMembers)

  const displayedAvatars =
    likeMembers.length > 3 ? likeMembers.slice(0, 3) : likeMembers

  const hasChanged = previousAvatarsRef.current.length !== likeMembers.length

  useEffect(() => {
    previousAvatarsRef.current = likeMembers
  }, [likeMembers])

  const animationProps = hasChanged
    ? {
        initial: { x: -5, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: 5, opacity: 0 },
        transition: { duration: 0.3, ease: 'linear' },
      }
    : {}

  const containerWidth =
    likeMembers.length > 3
      ? 120
      : `calc(32px + ${likeMembers.length} * 24px - ${likeMembers.length - 1} * 3px)`

  if (likeMembers.length === 0) return null

  return (
    <motion.button
      type="button"
      className={cn(
        'px-4 py-[6px] rounded-full bg-neutral-600 flex items-center transition-all',
        className,
      )}
      onClick={onClick}
      initial={{ opacity: 0, y: -10 }}
      animate={{ width: containerWidth, opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{
        ease: 'backIn',
        duration: 0.15,
      }}
    >
      <div
        className="absolute top-[-5.41px] right-[13px] w-[14px] h-[7px] bg-neutral-600 rounded-[1px] transform"
        style={{
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        }}
      />

      <div className="flex items-center">
        <div className="flex items-center space-x-[-3px]">
          <AnimatePresence>
            {displayedAvatars.map((avatar, index) => (
              <LikeAvatarMotion
                key={`${avatar}-${index}`}
                value={avatar}
                size="sm"
                className="p-0 transition-all"
                {...animationProps}
              />
            ))}
          </AnimatePresence>
        </div>

        {likeMembers.length > 3 && (
          <div className="whitespace-nowrap ml-[6px] text-[12px] text-neutral-000 font-bold">
            + {likeMembers.length - 3}
          </div>
        )}
      </div>
    </motion.button>
  )
}

export default LikeToolTip
