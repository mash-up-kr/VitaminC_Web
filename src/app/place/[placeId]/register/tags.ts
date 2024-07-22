import { TagItem } from '@/types/api/maps'

const TEMP_REGISTER_TAGS: { type: TagItem['type']; content: string }[] = [
  {
    type: 'U1F924',
    content: '존맛',
  },
  {
    type: 'U1F35A',
    content: '양이 많아',
  },
  {
    type: 'U1F96C',
    content: '건강한 맛이야',
  },
  {
    type: 'U1F331',
    content: '재료가 신선해',
  },
  {
    type: 'U1F371',
    content: '반찬이 잘 나와',
  },
  {
    type: 'U1F48E',
    content: '좀 비싸',
  },
  {
    type: 'U1F4B0',
    content: '저렴해',
  },
  {
    type: 'U1F911',
    content: '가성비가 좋아',
  },
  {
    type: 'U1F60C',
    content: '아늑해',
  },
  {
    type: 'U1F92B',
    content: '조용해',
  },
  {
    type: 'U1F60E',
    content: '트랜디해',
  },
  {
    type: 'U1F496',
    content: '친절해',
  },
  {
    type: 'U2728',
    content: '깔끔해',
  },
  {
    type: 'UFamily',
    content: '자리가 넓어',
  },
  {
    type: 'U1F6BB',
    content: '화장실이 깨끗해',
  },
  {
    type: 'UParking',
    content: '주차가능',
  },
]

export const REGISTER_TAGS: TagItem[] = TEMP_REGISTER_TAGS.map((v, index) => ({
  ...v,
  id: index,
  mapId: '1',
  createdAt: new Date().toString(),
}))
