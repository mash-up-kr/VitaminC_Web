import type { ClassName } from '@/models/interface'
import cn from '@/utils/cn'
import { Typography } from '../common'
import { KakaoPlaceDetail } from '@/types/map/kakao-raw-type'

interface MenuListProps extends ClassName {
  mainPhotoUrl: string
  photoList: KakaoPlaceDetail['photoList']
  menuList: KakaoPlaceDetail['menuList']
}

const MenuList = ({
  className,
  mainPhotoUrl,
  photoList,
  menuList,
}: MenuListProps) => {
  return (
    <div className={cn('bg-neutral-700', className)}>
      <div className="flex gap-[3px]">
        <Typography size="h5" className="text-[#D5D5D5]">
          메뉴
        </Typography>
        <Typography size="h5" className="text-[#0385FF]">
          {menuList.length}
        </Typography>
      </div>

      <img
        src={mainPhotoUrl}
        alt="메인 음식"
        className="max-w-full rounded-[6px] mt-[10px] object-fill"
      />

      <ul className="flex flex-col divide-y divide-neutral-600">
        {menuList.map((menu, index) => (
          <li
            key={menu.menu}
            className="flex flex-1 justify-between items-center min-h-[96px]"
          >
            <div className="flex flex-col gap-1">
              <Typography size="h5" color="neutral-000">
                {menu.menu}
              </Typography>
              <Typography size="body3" color="neutral-200">
                {menu.price}원
              </Typography>
            </div>

            <img
              src={photoList[index] ?? ''}
              alt={`${menu.menu}`}
              className="w-[60px] h-[60px] rounded max-w-[60px] object-cover"
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MenuList
