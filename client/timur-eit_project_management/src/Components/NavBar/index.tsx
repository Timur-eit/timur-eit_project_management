import {Link} from 'react-router-dom'
import React from 'react';
import {navBarButtons} from './navBarButtons'

interface Props {
    [property: string]: string
}

const NavBar: React.FC<Props> = () => {
    const navBarTitles = Object.keys(navBarButtons)
    
    return (
        <menu>  
            {navBarTitles.map(item => {
                return <Link to={navBarButtons[item].path}>
                    {navBarButtons[item].name}
                </Link>
            })}        
        </menu>
    )   
}

export default NavBar