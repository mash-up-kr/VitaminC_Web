// https://gist.github.com/ca0v/73a31f57b397606c9813472f7493a940?permalink_comment_id=3728415#gistcomment-3728415

export const debounce = <T extends (...args: any[]) => any>(
  ms: number,
  callback: T,
): ((...args: Parameters<T>) => Promise<ReturnType<T>>) => {
  let timer: NodeJS.Timeout | undefined

  return (...args: Parameters<T>) => {
    if (timer) {
      clearTimeout(timer)
    }
    return new Promise<ReturnType<T>>((resolve) => {
      timer = setTimeout(() => {
        const returnValue = callback(...args) as ReturnType<T>
        resolve(returnValue)
      }, ms)
    })
  }
}
