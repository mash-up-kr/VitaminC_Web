'use client'

import { useState } from 'react'

import ChipButton from '@/components/common/chip-button'
import ProxyImage from '@/components/common/proxy-image'
import Typography from '@/components/common/typography'
import type { PlaceDetail } from '@/models/api/place'
import type { ClassName } from '@/models/common'
import cn from '@/utils/cn'

interface MenuListProps extends ClassName {
  mainPhotoUrl: string
  menuList: PlaceDetail['menuList']
}

const INITIAL_VISIBLE_MENU_LENGTH = 5

const MenuList = ({ className, mainPhotoUrl, menuList }: MenuListProps) => {
  const [showMoreMenu, setShowMoreMenu] = useState(
    menuList.length <= INITIAL_VISIBLE_MENU_LENGTH,
  )

  return (
    <div className={cn('bg-neutral-700', className)}>
      <div className="flex gap-[3px]">
        <Typography size="body1" className="text-[#D5D5D5]">
          메뉴
        </Typography>
        <Typography size="body1" className="text-[#0385FF]">
          {menuList.length}
        </Typography>
      </div>

      {mainPhotoUrl && (
        <ProxyImage
          src={mainPhotoUrl}
          alt="메인 음식"
          className="mt-[10px] h-[148px] w-full max-w-full rounded-[6px] object-cover"
        />
      )}

      <ul className="flex flex-col divide-y divide-neutral-600">
        {menuList
          .slice(
            0,
            showMoreMenu ? menuList.length : INITIAL_VISIBLE_MENU_LENGTH,
          )
          .map((menu) => (
            <li
              key={menu.menu}
              className="flex min-h-[96px] flex-1 items-center justify-between"
            >
              <div className="flex flex-col gap-1">
                <Typography size="h5" color="neutral-000">
                  {menu.menu}
                </Typography>
                <Typography size="body3" color="neutral-200">
                  {menu.price}원
                </Typography>
              </div>

              {menu.photo && (
                <ProxyImage
                  src={menu.photo}
                  alt={`${menu.menu}`}
                  className="h-[60px] w-[60px] max-w-[60px] rounded object-cover"
                />
              )}
            </li>
          ))}
      </ul>
      {!showMoreMenu && menuList.length > INITIAL_VISIBLE_MENU_LENGTH && (
        <div className="flex h-[71px] w-full items-center justify-center border-t-[1px] border-neutral-600">
          <ChipButton
            fontSize="body3"
            rightIcon={{ type: 'caretDown', size: 'sm', stroke: 'neutral-000' }}
            onClick={() => {
              setShowMoreMenu(true)
            }}
          >
            더보기
          </ChipButton>
        </div>
      )}
    </div>
  )
}

export default MenuList
