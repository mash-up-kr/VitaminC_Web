const getCookieFromClient = (name: string) => {
  const cookies = document.cookie
  const entries = cookies.split('; ').map((c) => c.split('='))
  const value = entries.find((entry) => entry[0] === name)?.[1] || ''

  return value
}

export default getCookieFromClient
