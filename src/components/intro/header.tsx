import Logo from '/public/korrk-logo.png'

const Header = () => {
  return (
    <header className="h-[60px] w-full p-5">
      <img src={Logo.src} height="40px" width="94px" />
    </header>
  )
}

export default Header
