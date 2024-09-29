import type { ReactNode } from 'react'
import { createContext, useContext } from 'react'

interface TabContextProps<T extends string> {
  activeTab: T
  setActiveTab: (tab: T) => void
}

const TabContext = createContext<TabContextProps<any> | null>(null);

export const TabProvider = <T extends string>({
  activeTab,
  children,
  setActiveTab,
}: {
  activeTab: T
  setActiveTab: (tab: T) => void
  children: ReactNode
}) => {
  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  )
}

export const useTabContext = () => {
  const context = useContext(TabContext)
  if (!context) {
    throw new Error('useTabContext must be used within a TabProvider')
  }
  return context
}
