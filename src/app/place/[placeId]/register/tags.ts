import type { TagItem } from '@/types/api/maps'

const TEMP_REGISTER_TAGS: { iconType: TagItem['iconType']; name: string }[] = [
  {
    iconType: 'U1F924',
    name: '존맛',
  },
  {
    iconType: 'U1F35A',
    name: '양이 많아',
  },
  {
    iconType: 'U1F96C',
    name: '건강한 맛이야',
  },
  {
    iconType: 'U1F331',
    name: '재료가 신선해',
  },
  {
    iconType: 'U1F371',
    name: '반찬이 잘 나와',
  },
  {
    iconType: 'U1F48E',
    name: '좀 비싸',
  },
  {
    iconType: 'U1F4B0',
    name: '저렴해',
  },
  {
    iconType: 'U1F911',
    name: '가성비가 좋아',
  },
  {
    iconType: 'U1F60C',
    name: '아늑해',
  },
  {
    iconType: 'U1F92B',
    name: '조용해',
  },
  {
    iconType: 'U1F60E',
    name: '트랜디해',
  },
  {
    iconType: 'U1F496',
    name: '친절해',
  },
  {
    iconType: 'U2728',
    name: '깔끔해',
  },
  {
    iconType: 'UFamily',
    name: '자리가 넓어',
  },
  {
    iconType: 'U1F6BB',
    name: '화장실이 깨끗해',
  },
  {
    iconType: 'UParking',
    name: '주차가능',
  },
]

export const REGISTER_TAGS: TagItem[] = TEMP_REGISTER_TAGS.map((v, index) => ({
  ...v,
  id: index,
  mapId: '1',
  createdAt: new Date().toString(),
}))
