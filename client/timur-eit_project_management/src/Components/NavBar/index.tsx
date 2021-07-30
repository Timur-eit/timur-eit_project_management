import {Link} from 'react-router-dom'
import React, {useMemo, useState} from 'react';
import {INavBarButtons} from './navBarButtons'
import './style.scss'
import classNames from 'classnames'
interface NavBarProps {
    [property: string]: INavBarButtons
}

interface IitemBarClassCondition {
    [property: string]: boolean
}

const NavBar: React.FC<NavBarProps> = ({ navBarData }) => {
    
    const [currentItemPath, setClickedItem] = useState<string>('')
    const currentItemHandler = (itemPath: string): void => {
        setClickedItem((): string => itemPath)
    }
    const navBarTitles: Array<string> = useMemo(() => Object.keys(navBarData), [navBarData]) 
    
    return (
        <menu className='pm-navbar'>
            {navBarTitles.map((item): React.ReactElement<'a'> => {
                const itemName: string = navBarData[item].name
                const itemPath: string = navBarData[item].path
                const itemClassCondition: IitemBarClassCondition = {
                    'highlighted': currentItemPath === itemPath,
                }
                const navBarItemClass: string = classNames(itemClassCondition)
                return (
                    <Link
                        key={item}
                        to={itemPath}
                        onClick={() => currentItemHandler(itemPath) }
                        className={navBarItemClass}

                    >
                        {itemName}
                    </Link>
                )
            })}
        </menu>
    )
}

export default NavBar