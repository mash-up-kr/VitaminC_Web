import { LocalStorageManager } from './local-storage'

export const AUTH_KEY = '@@auth-token'
export const authTokenStorage = new LocalStorageManager<string>(AUTH_KEY)

export const RECENT_SEARCH_KEYWORD_KEY = '@@recent-search-keyword-key'
export const recentSearchStorage = new LocalStorageManager<string[]>(
  RECENT_SEARCH_KEYWORD_KEY,
  [],
)
