import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';
import {logout} from '../../../http'
import {useDispatch, useSelector} from 'react-redux'
import {setAuth} from '../../../store/authSlice'

const Navigation = () => {
    const dispatch = useDispatch() 
    const {isAuth} = useSelector(state => state.auth)
    const brandStyle = {
        color: '#fff',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '22px',
        display: 'flex',
        alignItems: 'center',
    };

    const logoText = {
        marginLeft: '10px',
    };

    const logoutUser = async () => {
        try {
            const {data} = await logout();
            dispatch(setAuth(data))
        }
        catch(err) {
            console.log(err)
        }
    }

    return (
        <nav className={`${styles.navbar} container`}>
            <Link style={brandStyle} to="/">
                <img src="/images/logo.png" alt="logo" />
                <span style={logoText}>Codershouse</span>
            </Link>

           {isAuth && <button onClick={logoutUser}>Logout</button>}
        </nav>
    );
};

export default Navigation;
