// 소수점 n 번째 자리에서 반올림
export const roundToNthDecimal = (value: number, n: number): number => {
  const factor = Math.pow(10, n - 1)
  return Math.round((value + Number.EPSILON) * factor) / factor
}

export const roundOnePoint = (value: number): string => {
  return roundToNthDecimal(value, 2).toFixed(1)
}

// value를 [min, max]로 제한
export const clamp = <T extends number>(value: number, min: T, max: T): T => {
  if (value < min) {
    return min
  }
  if (value > max) {
    return max
  }

  return value as T
}
