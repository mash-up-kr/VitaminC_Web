import isServer from '@/utils/is-server'
import getCookieFromServer from './server'
import getCookieFromClient from './client'

const getCookie = (name: string) => {
  return isServer() ? getCookieFromServer(name) : getCookieFromClient(name)
}

export default getCookie
