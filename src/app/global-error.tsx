'use client'

import * as Sentry from '@sentry/nextjs'
import NextError from 'next/error'
import { useEffect } from 'react'

const parseError = (error: Error): string => {
  return `웹팀 채찍 맞아라~~ 🦹🏿‍♀️👹🦹🏿

    에러 메세지 : ${error.message}

    에러 위치 : ${error.stack
      ?.split('\n')
      .slice(0, 2)
      .map((message) => message.trim())
      .join('\n')}

    에러 환경 : ${process.env.NODE_ENV}

    당장 고쳐서 올렷!
  `
}

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string }
}) {
  useEffect(() => {
    Sentry.captureException(error)
    const errorMessage = parseError(error)

    fetch('http://localhost:3000/api/error-alert', {
      method: 'POST',
      body: JSON.stringify({ errorMessage }),
    })
  }, [error])

  return (
    <html>
      <body>
        {/* `NextError` is the default Next.js error page component. Its type
        definition requires a `statusCode` prop. However, since the App Router
        does not expose status codes for errors, we simply pass 0 to render a
        generic error message. */}
        <NextError statusCode={0} />
      </body>
    </html>
  )
}
