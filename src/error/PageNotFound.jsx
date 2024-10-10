import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <div>
            <h2>404 - Página Não Encontrada</h2>
            <p>
                A página que você está procurando não existe. Volte para a <Link to="/">página inicial</Link>.
            </p>
        </div>
    );
};

export default PageNotFound;
