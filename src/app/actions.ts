'use server'

import { cookies } from 'next/headers'
import { revalidatePath, revalidateTag } from 'next/cache'

const setCookie = async (name: string, value: string) => {
  cookies().set(name, value)
}

const deleteCookie = async (name: string) => {
  cookies().delete(name)
}

const revalidatePlaces = async (mapId: string) => {
  revalidateTag(`places-${mapId}`)
}

export { setCookie, deleteCookie, revalidatePlaces }
