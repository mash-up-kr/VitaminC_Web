import { useEffect, useState } from 'react'

const useCookie = (name: string) => {
  const [cookie, setCookie] = useState('')

  useEffect(() => {
    const cookies = document.cookie
    const entries = cookies.split('; ').map((c) => c.split('='))
    const value = entries.find((entry) => entry[0] === name)?.[1] || ''
    setCookie(value)
  }, [name])

  return cookie
}

export default useCookie
