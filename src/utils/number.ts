// 소수점 n 번째 자리에서 반올림
export const roundToNthDecimal = (value: number, n: number): number => {
  const factor = Math.pow(10, n - 1)
  return Math.round((value + Number.EPSILON) * factor) / factor
}

// value를 [min, max]로 제한
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max)
}
