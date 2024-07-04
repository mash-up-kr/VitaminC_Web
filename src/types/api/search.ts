export interface Query {
  q: string
}

export type RectCoordinates = `${string},${string},${string},${string}`

export interface QueryParams extends Query {
  rect: RectCoordinates
}
