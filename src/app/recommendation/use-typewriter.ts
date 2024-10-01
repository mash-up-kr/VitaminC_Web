import { useEffect, useState } from 'react'

const useTypewriter = (text: string, speed = 100, enabled = true) => {
  const [typingText, setTypingText] = useState('')
  const [typingStart, setTypingStart] = useState(false)
  const [typingComplete, setTypingComplete] = useState(false)

  useEffect(() => {
    setTypingStart(true)

    let i = 0
    const typingInterval = setInterval(() => {
      if (enabled && i < text.length) {
        setTypingText(text.substring(0, i + 1))
        i++
      } else {
        setTypingComplete(true)
        clearInterval(typingInterval)
      }
    }, speed)

    return () => {
      clearInterval(typingInterval)
    }
  }, [text, speed])

  return { typingText, typingStart, typingComplete }
}

export default useTypewriter
