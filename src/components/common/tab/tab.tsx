import type { ReactNode } from 'react'
import { TabProvider } from './context'
import type { ClassName } from '@/models/common'
import cn from '@/utils/cn'

interface TabProps<T extends string> extends ClassName {
  children: ReactNode
  activeTab: T
  setActiveTab: (tab: T) => void
}

const Tab = <T extends string>({
  activeTab,
  children,
  className,
  setActiveTab,
}: TabProps<T>) => {
  return (
    <TabProvider activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className={cn('flex flex-col gap-[19px]', className)}>
        {children}
      </div>
    </TabProvider>
  )
}

export default Tab
