
type Props={
  children:React.ReactNode
}

export default function Header({children}:Props) {
  return (
    <header className="header">
    {children}
    </header>
  );
}
export  function HeaderTop({children}:Props)
{
  return   <div className="header__top">{children}</div>
}