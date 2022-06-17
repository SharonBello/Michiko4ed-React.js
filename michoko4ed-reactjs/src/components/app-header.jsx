import React, { useEffect, useState } from 'react'
import { LogoFull, HamburgerMenu, SearchBar } from '../services/svg.service.js'
import { NavLink, useLocation, useSearchParams } from 'react-router-dom'
import { Search } from './search.jsx'
import { logout } from '../store/actions/user.actions.js'
import { useSelector, useDispatch } from 'react-redux'
import { ProfileMenu } from './profile-menu.jsx'
import { SideMenu } from './side-menu.jsx'

export const AppHeader = (props) => {
    const { loggedUser } = useSelector((storeState) => storeState.userModule)
    const dispatch = useDispatch()
    const [profileMenu, setMenu] = useState(false)
    const [isSideMenu, setSideMenu] = useState(false)

    const { pathname } = useLocation()

    const onLogout = () => {
        dispatch(logout())
        let flag = !profileMenu;
        setMenu(flag);
    }

    const onToggleMenu = () => {
        let flag = !profileMenu;
        setMenu(flag);
    }

    const onToggleSideMenu = () => {
        let flag = !isSideMenu
        setSideMenu(flag)
    }

    if (loggedUser && !loggedUser.imgUrl) {
        loggedUser.imgUrl = "https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg"
    }

    return (
        <header className="header">
            <div className="top container">
                <div className="logo-search-container">
                    <button onClick={onToggleSideMenu} className="hamburger-icon">
                        {isSideMenu && <SideMenu menuOpen={isSideMenu} closeMenu={onToggleSideMenu} user={loggedUser} />}
                    </button>
                    <div className="logo">
                        <NavLink to="/" className="site-logo">
                            <LogoFull />
                        </NavLink>
                    </div>
                    <form className="search-bar">
                        <Search />
                    </form>
                </div>
                <ul className="nav-list clean-list" >
                    <li>
                        <NavLink to="/games" className="explore-nav-link nav-link">Games</NavLink>
                    </li>
                    <li>
                        {!loggedUser && <NavLink to="/login" rel="nofollow" className="open-popup-login nav-link">Login/Join</NavLink>}
                        <div className="avatar-container">
                            {loggedUser && <img className="avatar-img" src={`${loggedUser.imgUrl}`} onClick={onToggleMenu} alt="Avatar"></img>}
                        </div>
                        <div className="profile-container">
                            {profileMenu && <ProfileMenu onLogout={onLogout} user={loggedUser} closeMenu={onToggleMenu} />}
                        </div>
                    </li>
                </ul>
            </div>
        </header>
    )
}
