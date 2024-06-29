type ChangeHandler<T> = (key: string, value: T | null) => void

export class LocalStorageManager<T> {
  private key: string

  private initialValue: T | null

  private inMemoryStorage: Map<string, T | null>

  private handlers: Set<ChangeHandler<T>>

  private value: T | null

  constructor(key: string, initialValue: T | null = null) {
    this.key = key
    this.initialValue = initialValue
    this.inMemoryStorage = new Map<string, T | null>()
    this.handlers = new Set<ChangeHandler<T>>()

    this.value = this.getSnapshot(key, initialValue)
    this.initialize()
  }

  private trigger = (key: string) => {
    this.handlers.forEach((handler) => handler(key, this.value))
  }

  private getSnapshot = (key: string, initialValue: T | null): T | null => {
    try {
      const item = localStorage.getItem(key)
      return item !== null ? (JSON.parse(item) as T) : initialValue
    } catch (error) {
      this.inMemoryStorage.set(key, initialValue)
      return initialValue
    }
  }

  private subscribe = (onStoreChange: ChangeHandler<T>) => {
    const onChange = (localKey: string) => {
      if (this.key === localKey) {
        onStoreChange(localKey, this.value)
      }
    }
    this.handlers.add(onChange)
    return () => this.handlers.delete(onChange)
  }

  public set = (nextValue: T) => {
    try {
      localStorage.setItem(this.key, JSON.stringify(nextValue))
    } catch (error) {
      this.inMemoryStorage.set(this.key, nextValue)
    }
    this.value = nextValue
    this.trigger(this.key)
  }

  public remove = () => {
    try {
      localStorage.removeItem(this.key)
    } catch (error) {
      this.inMemoryStorage.set(this.key, null)
    }
    this.value = null
    this.trigger(this.key)
  }

  private initialize = () => {
    if (!this.initialValue) return

    try {
      const value = localStorage.getItem(this.key)
      if (!value) {
        localStorage.setItem(this.key, JSON.stringify(this.initialValue))
      }
    } catch (error) {
      const value = this.inMemoryStorage.get(this.key)
      if (!value) {
        this.inMemoryStorage.set(this.key, this.initialValue)
      }
    }
    this.trigger(this.key)
  }

  public getValueOrNull = (): T | null => this.value

  public onChange = (callback: ChangeHandler<T>) => {
    return this.subscribe(callback)
  }

  public getInMemoryStorage = (): Map<string, T | null> => {
    return this.inMemoryStorage
  }
}
