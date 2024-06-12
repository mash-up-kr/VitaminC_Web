const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center gap-4">
      {children}
    </div>
  )
}

export default Layout
