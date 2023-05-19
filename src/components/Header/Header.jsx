import React from 'react';
import { Link } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';
import './Header.scss';

const Header = () => {
    const { handleLogout, loading } = useLogin();
    return (
        <nav className='header'>
            <h2 className='header__title'>Todo.</h2>    
            <div className="header__nav">
                <Link to='/' >Home</Link>
                <Link to='/profile' >Profile</Link>
                <button className='logout-btn' disabled={loading} onClick={handleLogout} >Logout</button>
            </div>
        </nav>
    )
}

export default Header
