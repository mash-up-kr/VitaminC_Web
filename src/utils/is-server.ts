const isServer = () => {
  return typeof window === 'undefined'
}

export default isServer
