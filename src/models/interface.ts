/* API */
export interface APIErrorType {}

class ErrorNameMessage extends Error {
  constructor({ name, message }: { name: string; message: string }) {
    super(message)
    this.name = name
    this.message = message
  }
}

export class APIError extends ErrorNameMessage {
  status: number

  constructor({
    status,
    name,
    message,
  }: {
    status: number
    name: string
    message: string
  }) {
    super({ name, message })
    this.status = status
  }
}

export class ParseJSONError extends ErrorNameMessage {}

export interface ResponseOk {
  ok: boolean
  message: string
}

/* ClassName */
export interface ClassName {
  className?: string
}

export type DateType =
  `${number}${number}-${number}${number}-${number}${number}`
export type TimeType =
  `${number}${number}:${number}${number}:${number}${number}`
export type DateTimeType =
  `${DateType}T${TimeType}.${number}${number}${number}Z`

export interface MutatedAt {
  createdAt: DateTimeType
  updatedAt: DateTimeType
}

/* Intro */
export enum IntroStep {
  LOADING = -1,
  LOGIN,
  NICKNAME,
  NEW_MAP,
  MAPNAME,
  INVITE,
}
