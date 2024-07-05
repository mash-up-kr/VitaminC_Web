export interface Query {
  q: string
}

export interface QueryParams extends Query {
  rect: string
}
