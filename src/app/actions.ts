'use server'

import { cookies } from 'next/headers'

const setCookie = (name: string, value: string) => {
  cookies().set(name, value)
}

export { setCookie }
