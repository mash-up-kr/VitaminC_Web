'use server'

import { cookies } from 'next/headers'

const setCookie = async (name: string, value: string) => {
  cookies().set(name, value)
}

const deleteCookie = async (name: string) => {
  cookies().delete(name)
}

export { setCookie, deleteCookie }
