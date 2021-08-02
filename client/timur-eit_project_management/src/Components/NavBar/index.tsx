import {NavLink} from 'react-router-dom'
import React, {useMemo} from 'react';
import {INavBarButtons} from './navBarButtons'
import './style.scss'

interface NavBarProps {
    [property: string]: INavBarButtons,
}

const NavBar: React.FC<NavBarProps> = ({ navBarData }) => {
    const navBarTitles: Array<string> = useMemo(() => Object.keys(navBarData), [navBarData])
    return (
        <menu className='pm-navbar'>
            {navBarTitles.map((item): React.ReactElement<NavLink> => {
                const itemName: string = navBarData[item].name
                const itemPath: string = navBarData[item].path

                return (
                    <NavLink
                        key={item}
                        to={itemPath}
                        activeClassName="highlighted"
                    >
                        {itemName}
                    </NavLink>
                )
            })}
        </menu>
    )
}

export default NavBar