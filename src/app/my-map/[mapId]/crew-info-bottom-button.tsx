'use client'

import BottomModal from '@/components/common/bottom-modal'
import Button from '@/components/common/button'
import { notify } from '@/components/common/custom-toast'
import Typography from '@/components/common/typography'
import useFetch from '@/hooks/use-fetch'
import useSafeRouter from '@/hooks/use-safe-router'
import { APIError } from '@/models/api'
import type { ClassName } from '@/models/common'
import type { MapInfo } from '@/models/map'
import { api } from '@/utils/api'
import cn from '@/utils/cn'
import { useState } from 'react'

interface CrewInfoBottomButtonProps extends ClassName {
  mapName: MapInfo['name']
  mapId: MapInfo['id']
  isMyMap: boolean
}

const CrewInfoBottomButton = ({
  isMyMap,
  className,
  mapName,
  mapId,
}: CrewInfoBottomButtonProps) => {
  const router = useSafeRouter()
  const { revalidate } = useFetch()
  const [isOpenExitMapModal, setIsOpenExitMapModal] = useState(false)

  const handleExitMap = async () => {
    // TODO: 토스트 색상 처리 및 문구 수정
    try {
      const { data: mapList } = await api.maps.get()
      if (mapList.length === 1) {
        notify.error('최소 1개의 지도에는 속해있어야 합니다.')
        return
      }

      await api.users.maps.mapId.delete({ mapId })
      revalidate(['map-list'])
      notify.success(`${mapName} 지도에서 나갔습니다.`)

      router.safeBack({ defaultHref: '/my-map' })
    } catch (error) {
      if (error instanceof APIError) {
        notify.error(error.message)
        return
      }
      notify.error('예상치 못한 에러가 발생했습니다.')
    }
  }

  return (
    <>
      {isMyMap ? (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] px-5 h-[102px] flex justify-center items-center invitation-gradient">
          <Button
            colorScheme="orange"
            onClick={() => {
              // TODO: 초대장로직
            }}
          >
            초대장 보내기
          </Button>
        </div>
      ) : (
        <div className={cn('py-6 w-full', className)}>
          <button
            type="button"
            onClick={() => setIsOpenExitMapModal(true)}
            className="w-full"
          >
            <Typography size="body1" color="neutral-400">
              지도 나가기
            </Typography>
          </button>
        </div>
      )}

      <BottomModal
        layout="confirm"
        title={`정말${mapName} 지도를\n나가시겠어요?`}
        isOpen={isOpenExitMapModal}
        cancelMessage="아니요"
        confirmMessage="나가기"
        onClose={() => setIsOpenExitMapModal(false)}
        onCancel={() => setIsOpenExitMapModal(false)}
        onConfirm={handleExitMap}
      />
    </>
  )
}

export default CrewInfoBottomButton
