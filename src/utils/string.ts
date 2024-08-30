export const countCharacters = (value: string) => {
  // 이모지(e.g. 😀)를 String: length로 계산하면 1보다 큰 값이 나오므로 길이 보정
  const utf16Length = value.length
  const numOfCharacters = Array.from(value).length

  const offset = utf16Length - numOfCharacters

  return { num: numOfCharacters, offset }
}
