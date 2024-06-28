import { LocalStorageManager } from './local-storage'

export const AUTH_KEY = '@@auth-token'
export const authTokenStorage = new LocalStorageManager<string>(AUTH_KEY)
