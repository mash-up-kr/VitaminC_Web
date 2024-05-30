'use client'

const Error = ({ error }: { error: Error }) => {
  return <p className="px-24 py-16">Error: {error.message}</p>
}

export default Error
