import React, { useState } from 'react';
import Header from './header/header';
import Menu from './menu/menu';

export default function Footer () {

    const [menuState, setMenuState] = useState(true);

    
    function toggleMenu() {
        menuState ? setMenuState(false) : setMenuState(true)
    }

  return(
      <React.Fragment>
        <Header toggleMenu={ toggleMenu }></Header>
        <Menu showMenu={ menuState }></Menu>
      </React.Fragment>
  );
}