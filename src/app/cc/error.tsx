'use client'

import { useEffect } from 'react'
import { Button } from '@/components/Button'

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div>
      <h2>Something went wrong!</h2>
      <Button
        label="Try again"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      />
    </div>
  )
}

export default Error
