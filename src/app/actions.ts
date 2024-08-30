'use server'

import { cookies } from 'next/headers'

const setCookie = (name: string, value: string) => {
  cookies().set(name, value)
}

const deleteCookie = (name: string) => {
  cookies().delete(name)
}

export { setCookie, deleteCookie }
