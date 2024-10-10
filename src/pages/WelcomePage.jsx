import React from 'react';
import { Link } from 'react-router-dom';
import UserInfoButton from '../components/UserInfoButton';

const WelcomePage = () => {
    return (
        <div className='page'>
            <h1 className='title'>Bem-Vindo ao Sistema de Login!</h1>
            <p className='text'>
                Você está logado.
                <Link className='text' to="/protected">Ver Perfil</Link>
            </p>
            <UserInfoButton />
        </div>
    );
};

export default WelcomePage;