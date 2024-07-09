import { LocalStorageManager } from './local-storage'
import { SessionStorageManager } from './session-storage'

export const AUTH_KEY = '@@auth-token'
export const authTokenStorage = new LocalStorageManager<string>(AUTH_KEY)

export const RECENT_SEARCH_KEYWORD_KEY = '@@recent-search-keyword-key'
export const recentSearchStorage = new LocalStorageManager<string[]>(
  RECENT_SEARCH_KEYWORD_KEY,
  [],
)

export const MAP_BOUND = '@@map-bound'
export const mapBoundSessionStorage = new SessionStorageManager<{
  latitude1: number
  longitude1: number
  latitude2: number
  longitude2: number
}>(MAP_BOUND)

mapBoundSessionStorage.onChange((v, v2) => console.log(v2))
