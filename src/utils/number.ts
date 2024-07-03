// 소수점 n 번째 자리에서 반올림
export const roundToNthDecimal = (value: number, n: number): number => {
  const factor = Math.pow(10, n - 1)
  return Math.round(value * factor) / factor
}
