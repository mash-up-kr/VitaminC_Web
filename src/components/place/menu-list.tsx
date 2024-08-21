'use client'

import type { ClassName } from '@/models/interface'
import cn from '@/utils/cn'
import { ChipButton, Typography } from '../common'
import type { PlaceDetail } from '@/types/api/place'
import { ProxyImage } from '@/components'
import { useState } from 'react'

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
          className="max-w-full w-full h-[148px] rounded-[6px] mt-[10px] object-cover"
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

              {menu.photo && (
                <ProxyImage
                  src={menu.photo}
                  alt={`${menu.menu}`}
                  className="w-[60px] h-[60px] rounded max-w-[60px] object-cover"
                />
              )}
            </li>
          ))}
      </ul>
      {!showMoreMenu && menuList.length > INITIAL_VISIBLE_MENU_LENGTH && (
        <div className="w-full h-[71px] flex justify-center items-center border-t-[1px] border-neutral-600">
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
