const getMessage = async () => {
  const data = await fetch('http://localhost:3000/api/delay?delay=1000', {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json())

  const message =
    Reflect.has(data, 'ok') && Reflect.has(data, 'message')
      ? data.message
      : 'API Error'

  return message
}

const getData = async (url: string) => {
  if (url === '/api/delay') {
    return getMessage()
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
