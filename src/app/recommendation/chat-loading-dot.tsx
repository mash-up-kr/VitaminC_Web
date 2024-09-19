import cn from '@/utils/cn'
import { motion } from 'framer-motion'

const ChatLoadingDot = ({ className }: { className?: string }) => {
  const container = {
    animate: {
      transition: {
        staggerChildren: 0.36,
      },
    },
  }

  const dotAnimation = {
    initial: { y: 0, backgroundColor: '#EFEFFD' },
    animate: {
      y: [0, -3, 0],
      backgroundColor: ['#EFEFFD', '#FFDE59', '#EFEFFD'],
      transition: {
        duration: 0.36,
        ease: 'easeIn',
        repeat: Infinity,
        repeatDelay: 0.72,
      },
    },
  }

  return (
    <motion.div
      className={cn('flex justify-center items-center gap-1', className)}
      variants={container}
      initial="initial"
      animate="animate"
    >
      <motion.div
        className="w-[5px] h-[5px] rounded-full bg-purple-50 relative"
        variants={dotAnimation}
      />
      <motion.div
        className="w-[5px] h-[5px] rounded-full bg-purple-50 relative"
        variants={dotAnimation}
      />
      <motion.div
        className="w-[5px] h-[5px] rounded-full bg-purple-50 relative"
        variants={dotAnimation}
      />
    </motion.div>
  )
}

export default ChatLoadingDot
