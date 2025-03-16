import debounce from 'lodash.debounce'
import { useState, useEffect, useCallback, useRef } from 'react'

interface UseInfiniteScrollProps<T> {
  totalData: T[]
  itemsPerPage: number
  threshold?: number
}

const INITIAL_PAGE = 1

export const useInfiniteScroll = <T extends any>({
  totalData,
  itemsPerPage,
  threshold = 100,
}: UseInfiniteScrollProps<T>) => {
  const [data, setData] = useState<T[]>(totalData.slice(0, itemsPerPage))
  const [page, setPage] = useState(INITIAL_PAGE)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(totalData.length > itemsPerPage)
  const listRef = useRef<HTMLDivElement | null>(null)

  const loadMoreData = useCallback(() => {
    if (isLoading || !hasMore) return

    setIsLoading(true)
    setTimeout(() => {
      const startIndex = page * itemsPerPage
      const endIndex = startIndex + itemsPerPage
      const newData = totalData.slice(startIndex, endIndex)

      if (newData.length === 0) {
        setHasMore(false)
      } else {
        setData((prevData) => [...prevData, ...newData])
        setPage((prevPage) => prevPage + 1)
      }

      setIsLoading(false)
    }, 100)
  }, [page, itemsPerPage, totalData, isLoading, hasMore])

  const handleScroll = useCallback(() => {
    if (!listRef.current) return

    const { scrollTop, scrollHeight, clientHeight } = listRef.current
    if (
      scrollHeight - scrollTop <= clientHeight + threshold &&
      !isLoading &&
      hasMore
    ) {
      loadMoreData()
    }
  }, [isLoading, hasMore, loadMoreData, threshold])

  useEffect(() => {
    setData(totalData.slice(0, itemsPerPage))
  }, [itemsPerPage, totalData])

  useEffect(() => {
    const ref = listRef.current
    if (!ref) return

    const debouncedHandleScroll = debounce(handleScroll, 300)

    ref.addEventListener('scroll', debouncedHandleScroll)

    return () => {
      ref.removeEventListener('scroll', debouncedHandleScroll)
    }
  }, [handleScroll])

  return { data, isLoading, listRef }
}
