import type { IconKey } from '@/components/common/icon'
import Typography from '@/components/common/typography'
import type { ClassName } from '@/models/common'
import cn from '@/utils/cn'
import SearchIconChip from './search-icon-chip'

interface SearchMenuListProps extends ClassName {
  onClickMenu: (menu: string) => void
}

const menus: {
  icon: IconKey
  label: string
}[] = [
  {
    icon: '찜',
    label: '찜, 탕, 찌개',
  },
  {
    icon: '일식',
    label: '돈까스, 회, 일식',
  },
  {
    icon: '피자',
    label: '피자',
  },
  {
    icon: '고기',
    label: '고기, 구이',
  },
  {
    icon: '호프',
    label: '호프/ 요리주점',
  },
  {
    icon: '양식',
    label: '양식',
  },
  {
    icon: '치킨',
    label: '치킨',
  },
  {
    icon: '중식',
    label: '중식',
  },
  {
    icon: '아시안',
    label: '아시안',
  },
  {
    icon: '백반',
    label: '백반, 죽, 국수',
  },
  {
    icon: '분식',
    label: '분식',
  },
  {
    icon: '카페',
    label: '카페, 디저트',
  },
  {
    icon: '패스트푸드',
    label: '패스트푸드',
  },
]

const SearchMenuList = ({ className, onClickMenu }: SearchMenuListProps) => {
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <Typography size="body3" color="neutral-300">
        메뉴
      </Typography>

      <ul className="flex flex-wrap gap-[10px]">
        {menus.map((menu) => (
          <button
            type="button"
            key={menu.label}
            onClick={() => onClickMenu(menu.label)}
          >
            <SearchIconChip
              iconType={menu.icon}
              label={menu.label}
              className="px-[10px] py-2"
            />
          </button>
        ))}
      </ul>
    </div>
  )
}

export default SearchMenuList
