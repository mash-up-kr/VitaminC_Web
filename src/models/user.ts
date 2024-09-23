type UserRole = 'ADMIN' | 'USER'
type Provider = 'KAKAO'
export interface User {
  id: number
  nickname?: string
  profileImage?: string
  provider: Provider
  providerId: string
  role: UserRole
}

export interface Creator {
  id: User['id']
  nickname: User['nickname']
  provider: 'KAKAO'
  providerId: string
  profileImage: string
}

export interface Token {
  token: string
}
