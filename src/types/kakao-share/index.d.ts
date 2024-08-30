/// <reference path="share.d.ts" />

declare namespace Kakao {
  export function isInitialized(): boolean

  export function init(apiKey: string): void

  export function cleanup(): void
}
