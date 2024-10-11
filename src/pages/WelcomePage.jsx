import React from 'react';
import { Link } from 'react-router-dom';
import UserInfoButton from '../components/UserInfoButton';

const WelcomePage = () => {
    return (
        <div className='container'>
            <h1 className='page-title'>Bem-Vindo ao Sistema de Login!</h1>
            <p className='page-text'>
                Você está logado.
                <Link className='page-link' to="/protected">Ver Perfil</Link>
            </p>
            <UserInfoButton />
        </div>
    );
};

export default WelcomePage;