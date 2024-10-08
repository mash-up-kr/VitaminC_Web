import type { ChangeEvent } from 'react'

import SearchInput from '@/components/common/search-input'
import useSafeRouter from '@/hooks/use-safe-router'

interface SearchFormProps {
  value: string
  mapId: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onResetValue: VoidFunction
  onSubmit: (formData: FormData) => void
}

const SearchForm = ({
  value,
  mapId,
  onChange,
  onSubmit,
  onResetValue,
}: SearchFormProps) => {
  const router = useSafeRouter()

  const handleClickPrev = async () => {
    router.push(`/map/${mapId}`)
  }

  return (
    <form action={onSubmit}>
      <SearchInput
        ref={(node) => {
          node?.focus()
        }}
        name="query"
        value={value}
        leftIcon={{
          icon: {
            type: 'caretLeft',
            size: 'xl',
          },
          label: '뒤로 가기',
          onClick: handleClickPrev,
        }}
        rightIcon={{
          icon: { type: 'delete', size: 'xl', onClick: onResetValue },
          label: '입력 내용 지우기',
        }}
        onChange={onChange}
      />
    </form>
  )
}

export default SearchForm
