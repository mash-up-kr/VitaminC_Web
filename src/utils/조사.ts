import type { 조사Option } from '@/constants/hangul'
import {
  가_CHAR_CODE,
  종성,
  중성,
  초성,
  힣_CHAR_CODE,
} from '@/constants/hangul'

const 한글_여부 = (letter: string) => {
  const charCode = letter.charCodeAt(0)
  if (isNaN(charCode) || charCode < 가_CHAR_CODE || charCode > 힣_CHAR_CODE) {
    return false
  }
  return true
}

const 마지막_문자_받침_여부 = (word: string) => {
  const 마지막_문자 = word.slice(-1)
  const charCode = 마지막_문자.charCodeAt(0)

  return (
    !isNaN(charCode) &&
    한글_여부(마지막_문자) &&
    (charCode - 가_CHAR_CODE) % 28 !== 0
  )
}

const disassemble문자 = (letter: string) => {
  if (!letter || !한글_여부(letter)) {
    return undefined
  }
  const charCode = letter.charCodeAt(0)
  const hangulCode = charCode - 가_CHAR_CODE

  const lastIndex = hangulCode % 28
  const middleIndex = ((hangulCode - lastIndex) / 28) % 21
  const firstIndex = Math.floor((hangulCode - lastIndex) / 28 / 21)

  return {
    first: 초성[firstIndex],
    middle: 중성[middleIndex],
    last: 종성[lastIndex],
  }
}

const get조사 = (word: string, 조사: 조사Option) => {
  const has받침 = 마지막_문자_받침_여부(word)
  let index = has받침 ? 0 : 1
  const is종성ㄹ = disassemble문자(word[word.length - 1])?.last === 'ㄹ'

  if (조사 === '와/과' || (has받침 && is종성ㄹ && 조사 === '으로/로')) {
    index = index === 0 ? 1 : 0
  }

  return 조사.split('/')[index]
}

export default get조사
