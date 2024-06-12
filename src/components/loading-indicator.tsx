import Spinner from './spinner'

const LoadingIndicator = () => {
  return (
    <div role="status" className="flex items-center gap-2">
      <Spinner />
      <span>Loading...</span>
    </div>
  )
}

export default LoadingIndicator
