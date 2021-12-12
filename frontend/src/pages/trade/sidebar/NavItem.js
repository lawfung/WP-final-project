import DeleteIcon from '@mui/icons-material/Delete';
import {IconContainer, NavItemContainer } from "./styles"

export function NavItem({ children, to, label, icon, expand, clean = true, ...props }) {

    return (
        <NavItemContainer>
            {/* <NavLink ref={item} to={to} activeClassName='active' {...props}> */}
            <div>
                <IconContainer>
                    {icon}
                </IconContainer>
                <span>{label}</span>
                {clean ? 
                    <IconContainer className='trashCan'>
                        <DeleteIcon width='0.75rem' />
                    </IconContainer>
                    : <></>
                }
            </div>
            {/* </NavLink> */}
        </NavItemContainer>
    )
}