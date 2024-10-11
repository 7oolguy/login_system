import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <div className='container'>
            <h2 className='page-title red-dot'>404 - Página Não Encontrada</h2>
            <p className='page-text'>
                A página que você está procurando não existe. Volte para a <Link className='page-link' to="/">página inicial</Link>.
            </p>
        </div>
    );
};

export default PageNotFound;
