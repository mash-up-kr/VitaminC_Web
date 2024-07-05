import { LocalStorageManager } from './local-storage'

export const AUTH_KEY = '@@auth-token'
export const authTokenStorage = new LocalStorageManager<string>(AUTH_KEY)

export const RECENT_SEARCH_KEYWORD_KEY = '@@recent-search-keyword-key'
export const recentSearchStorage = new LocalStorageManager<string[]>(
  RECENT_SEARCH_KEYWORD_KEY,
  [],
)

export const INVITATION_LINK = '@@invitation-link'
export const invitationLinkStorage = new LocalStorageManager<string>(
  INVITATION_LINK,
)

export const NEW_MAP_ID = '@@new-map-id'
export const newMapIdStorage = new LocalStorageManager<string>(NEW_MAP_ID)

export const NICKNAME = '@@nickname'
export const nicknameStorage = new LocalStorageManager<string>(NICKNAME)
