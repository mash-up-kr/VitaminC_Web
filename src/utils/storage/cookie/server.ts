'use server'

import { cookies } from 'next/headers'

const getCookieFromServer = (name: string) => {
  return cookies().get(name)?.value
}

export default getCookieFromServer
