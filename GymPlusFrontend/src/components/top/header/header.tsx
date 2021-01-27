import React from 'react';
import {ReactComponent as GplusIcon} from '../../../assets/G-logo.svg';

export interface IHeaderProps{
  toggleMenu: () => void;
}

export default function Booking(props: IHeaderProps) {

  

  return(
      <div className="header">
        <GplusIcon className="icon"></GplusIcon>
        <span onClick={props.toggleMenu}><i className="fas fa-bars"></i></span>
      </div>
  );
}

