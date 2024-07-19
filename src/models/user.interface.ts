/* User */
type UserRole = 'ADMIN' | 'USER'
type Provider = 'KAKAO'
export interface User {
  id: string
  nickname?: string
  provider: Provider
  providerId: string
  role: UserRole
}
