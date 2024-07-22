'use client'
import { useState, useEffect } from 'react'

import { Avatar, Chip, Typography } from '../common'
import { BoardingMembersProps } from './types'
import { APIError } from '@/models/interface'
import { notify } from '../common/custom-toast'
import { api } from '@/utils/api'

const memberColors = [
  'coral',
  'dark-blue',
  'sky-blue',
  'violet',
  'green',
] as const

const BoardingMembers = ({ owner, members, userId }: BoardingMembersProps) => {
  return (
    <ul className="w-full bg-neutral-600 max-h-[268px] overflow-y-scroll no-scrollbar">
      {members.map((member, index) => (
        <li key={member.id} className="flex items-center px-4 h-[52px]">
          <Avatar
            me={member.id === userId}
            value={member.nickname}
            colorScheme={memberColors[index % memberColors.length]}
          />
          <Typography
            as="span"
            size="body1"
            color="neutral-100"
            className="ml-2"
          >
            {member.nickname}
          </Typography>
          {owner.id === member.id && (
            <Chip size="sm" colorScheme="neutral-800" className="ml-[6px]">
              주인장
            </Chip>
          )}
        </li>
      ))}
    </ul>
  )
}

export default BoardingMembers
