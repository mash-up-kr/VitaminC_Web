/* User */
type UserRole = 'ADMIN' | 'USER'
type Provider = 'KAKAO'
export interface User {
  id: number
  nickname?: string
  provider: Provider
  providerId: string
  role: UserRole
}

export interface Token {
  token: string
}
