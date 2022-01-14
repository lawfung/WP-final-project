import React from "react";
import { IconContainer, NavItemContainer } from "./styles"

export function NavItem({ children, to, label, icon, onClick=()=>{}, clean = true, ...props }) {
  return (
    <NavItemContainer>
      <div onClick={() => {onClick();}} >
        <IconContainer>
          {icon}
        </IconContainer>
        <span>{label}</span>
      </div>
      {/* </NavLink> */}
    </NavItemContainer>
  )
}
