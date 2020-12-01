import React from 'react';

import { Logo, HeaderContainer, ContainerCenter } from './style';


import Icone from '../../assets/logo.jpg';


function Header(props) {
    return (
        <>
            <HeaderContainer>
                <ContainerCenter>
                    <Logo src={Icone} alt="Pitu - Encurtador de URL" />
                    <h1>Pitu</h1>
                    <p>{props.children}</p>
                </ContainerCenter>
            </HeaderContainer>
        </>
    )
}

export default Header;