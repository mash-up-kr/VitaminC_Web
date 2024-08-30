import getCookieFromClient from './client'
import getCookieFromServer from './server'

import isServer from '@/utils/is-server'

const getCookie = (name: string) => {
  return isServer() ? getCookieFromServer(name) : getCookieFromClient(name)
}

export default getCookie
