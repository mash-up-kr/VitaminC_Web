import { APIError } from '@/models/interface'

const getDelay = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/delay?delay=1000', {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await res.json()
    if (Reflect.has(data, 'ok') && Reflect.has(data, 'message')) return data

    throw new APIError({ name: 'api/delay', message: 'API Error' })
  } catch (e) {
    if (e instanceof Error) {
      return e
    }
  }
}

const getData = async (url: string) => {
  if (url === '/api/delay') {
    return getDelay()
  } else {
    throw Error('Not implemented')
  }
}

let cache = new Map()

export const fetchData = (url: string) => {
  if (!cache.has(url)) {
    cache.set(url, getData(url))
  }
  return cache.get(url)
}
