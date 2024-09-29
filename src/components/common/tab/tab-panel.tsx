import { motion } from 'framer-motion'

import type { ReactNode } from 'react'
import { useTabContext } from './context'
import type { ClassName } from '@/models/common'
import cn from '@/utils/cn'

interface TabPanelProps extends ClassName {
  tabId: string
  children: ReactNode
}

const TabPanel = ({ tabId, children, className }: TabPanelProps) => {
  const { activeTab } = useTabContext()

  if (tabId !== activeTab) return null

  return (
    <div className={cn('', className)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default TabPanel
