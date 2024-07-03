'use client'

import { useState } from 'react'

import SearchInput from '@/components/search-input'
import { ChipButton, Typography } from '@/components'
import { recentSearchStorage } from '@/utils/storage'

const Search = () => {
  const [recentKeywords, setRecentKeywords] = useState(
    recentSearchStorage.getValueOrNull() ?? [],
  )
  const [query, setQuery] = useState('')

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
      addUniqueKeyword(searchKeyword)
      setQuery('')
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
    <div className="mt-2">
      <form action={searchByKeyword}>
        <SearchInput
          name="query"
          value={query}
          // TODO: router 연동
          leftIcon={{
            icon: {
              type: 'caretLeft',
              size: 'xl',
            },
            label: '뒤로 가기',
          }}
          rightIcon={{
            icon: { type: 'delete', size: 'xl', onClick: () => setQuery('') },
            label: '인풋 지우기',
          }}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
      {recentKeywords.length && (
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
