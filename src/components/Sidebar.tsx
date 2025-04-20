
import { ReactNode } from "react";

type Props={
  children:ReactNode;
}

export default function Sidebar({children}:Props) {
  return (
    <div className="sidebar">
   {children}
    </div>
  );
}
export function SidebarTop({children}:Props){
  return (
    <div className="sidebar__top">
       {children}
      </div>
  )
}
