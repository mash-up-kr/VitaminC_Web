'use client'

import { useCallback, useState } from 'react'

import SearchInput from '@/components/search-input'
import { ChipButton, Typography } from '@/components'
import { recentSearchStorage } from '@/utils/storage'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const Search = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const search = searchParams.get('search') ?? ''

  const [recentKeywords, setRecentKeywords] = useState(
    recentSearchStorage.getValueOrNull() ?? [],
  )
  const [query, setQuery] = useState(search)
  const isShowRecentKeywords =
    query === '' && !!recentKeywords.length && !!search

  const createQueryString = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(key, value)

      return params.toString()
    },
    [searchParams],
  )

  const addUniqueKeyword = (keyword: string) => {
    const existRecentKeywords = [...(recentKeywords || [])]
    if (!existRecentKeywords.includes(keyword)) {
      recentSearchStorage.set([...existRecentKeywords, keyword])
      setRecentKeywords([...existRecentKeywords, keyword])
    }
  }

  const searchByKeyword = async (formData: FormData) => {
    const searchKeyword = formData.get('query') as string | null
    if (searchKeyword) {
      createQueryString('search', searchKeyword)
      addUniqueKeyword(searchKeyword)
      setQuery('')
      // TODO: API 연동 및 결과 컴포넌트 로드
      router.push(`${pathname}?${createQueryString('search', searchKeyword)}`)
    }
  }

  const deleteRecentKeyword = (targetIndex: number) => {
    const existRecentKeywords = [...(recentKeywords || [])]

    if (targetIndex !== -1) {
      existRecentKeywords.splice(targetIndex, 1)
      recentSearchStorage.set(existRecentKeywords)
      setRecentKeywords(existRecentKeywords)
    }
  }

  return (
    <div className="w-full min-h-dvh bg-neutral-700 px-5 pt-2">
      <form action={searchByKeyword}>
        <SearchInput
          name="query"
          value={query}
          leftIcon={{
            icon: {
              type: 'caretLeft',
              size: 'xl',
            },
            label: '뒤로 가기',
            onClick: () => router.back(),
          }}
          rightIcon={{
            icon: { type: 'delete', size: 'xl', onClick: () => setQuery('') },
            label: '인풋 지우기',
          }}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      {isShowRecentKeywords && (
        <div className="mt-3 flex flex-col gap-3">
          <Typography size="h6" color="neutral-300">
            최근 검색어
          </Typography>

          <ul className="flex flex-wrap gap-x-[10px] gap-y-5">
            {recentKeywords.map((keyword, index) => (
              <ChipButton
                key={keyword}
                rightIcon={{ type: 'close' }}
                onClick={() => deleteRecentKeyword(index)}
              >
                {keyword}
              </ChipButton>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Search
