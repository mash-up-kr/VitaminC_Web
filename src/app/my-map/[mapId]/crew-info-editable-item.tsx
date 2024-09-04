'use client'

import Avatar from '@/components/common/avatar'
import Chip from '@/components/common/chip'
import Typography from '@/components/common/typography'
import type { MapMemberData } from '@/models/map'
import { korRole } from './constant'
import { useState } from 'react'
import Icon from '@/components/common/icon'
import BottomModal from '@/components/common/bottom-modal'

const RoleButton = ({
  role,
  title,
  description,
  isCurrentRole,
  onClick,
}: {
  role: MapMemberData['role'] | null
  title: string
  description: string
  isCurrentRole: boolean
  onClick: (role: MapMemberData['role'] | null) => void
}) => {
  return (
    <li className="w-full py-4">
      <button
        type="button"
        className="w-full flex justify-between items-center"
        onClick={() => onClick(role)}
      >
        <div className="flex flex-1 flex-col gap-[2px]">
          <Typography size="body1" color="neutral-000" className="text-start">
            {title}
          </Typography>
          {description && (
            <Typography size="body3" color="neutral-400" className="text-start">
              {description}
            </Typography>
          )}
        </div>

        {isCurrentRole && <Icon type="check" stroke="orange-400" size="xl" />}
      </button>
    </li>
  )
}

const roles: {
  role: MapMemberData['role'] | null
  title: string
  description: string
}[] = [
  {
    role: 'WRITE',
    title: '편집가능',
    description: '맛집 등록 및 본인이 등록한 맛집 삭제가 가능해요.',
  },
  {
    role: 'READ',
    title: '보기만 가능',
    description: '등록된 맛집 검색과 보기만 가능해요.',
  },
  {
    role: null,
    title: '지도에서 내보내기',
    description: '',
  },
] as const

const CrewInfoEditableItem = ({
  member,
  isMe,
  avatarColor,
}: {
  member: MapMemberData
  avatarColor: Parameters<typeof Avatar>[0]['colorScheme']
  isMe: boolean
}) => {
  const [userRole, setUserRole] = useState(member.role)

  const [isOpenRoleModal, setIsOpenRoleModal] = useState(false)
  const [isOpenOutModal, setIsOpenOutModal] = useState(false)

  return (
    <>
      <li className="flex justify-between items-center h-[52px]">
        <div className="flex items-center gap-2">
          <Avatar value={member.nickname} colorScheme={avatarColor} me={isMe} />
          <Typography size="body1" color="neutral-100">
            {member.nickname}
          </Typography>
          {member.role === 'ADMIN' && (
            <Chip size="sm" colorScheme="neutral-800" className="ml-[-2px]">
              모임장
            </Chip>
          )}
        </div>

        <button
          type="button"
          className="flex items-center gap-[2px]"
          disabled={member.role === 'ADMIN'}
          onClick={() => {
            if (member.role === 'ADMIN') return
            setIsOpenRoleModal(true)
          }}
        >
          <Typography size="body3" color="neutral-200">
            {korRole[member.role]}
          </Typography>
          <Icon type="caretDown" size="md" stroke="neutral-200" />
        </button>
      </li>

      <BottomModal
        layout="none"
        className="z-[9999]"
        title={`${member.nickname}님의 권한을 설정해주세요`}
        isOpen={isOpenRoleModal}
        body={
          <ul className="flex flex-col">
            {roles.map((info) => (
              <RoleButton
                key={info.title}
                title={info.title}
                role={info.role}
                description={info.description}
                isCurrentRole={info.role === userRole}
                onClick={(role) => {
                  console.log(role)
                  if (!role) {
                    console.log('hihi')
                    setIsOpenRoleModal(false)
                    setIsOpenOutModal(true)
                    return
                  }
                  setUserRole(role)
                  // TODO: role API
                }}
              />
            ))}
          </ul>
        }
        onClose={() => setIsOpenRoleModal(false)}
        onCancel={() => setIsOpenRoleModal(false)}
        confirmMessage=""
        onConfirm={() => {}}
      />

      <BottomModal
        layout="confirm"
        className="z-[10000]"
        title={`정말 ${member.nickname}님을 지도에서 내보낼까요?`}
        isOpen={isOpenOutModal}
        body={`${member.nickname}님이 등록한 맛집은 지도에 남아있어요.`}
        cancelMessage="취소"
        confirmMessage="내보내기"
        onClose={() => setIsOpenOutModal(false)}
        onCancel={() => setIsOpenOutModal(false)}
        onConfirm={() => {
          // TODO: api 연동
        }}
      />
    </>
  )
}

export default CrewInfoEditableItem
