import Image from 'next/image';
import React, { FC } from 'react';
import './Header.scss';

interface Props {}

const Header: FC<Props> = (props) => {
  return (
    <header className='header'>
      <div className="header__left">
        <div className="header__logoContainer">
          {/* <Image src="/images/bakery-logo.webp" alt='Bakery Logo' width={100} height={100}/> */}
          <h2>Bakery Leaderboard</h2>
        </div>
      </div>
      <div className="header__right"></div>
    </header>
  )
}

export default Header