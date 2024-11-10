import React, {useEffect, useState} from 'react';
import s from './Header.module.scss'
import Link from "next/link";
import { pages } from '@/utils/const';

import Icon from '@mdi/react';
import { mdiCarLimousine, mdiBellOutline, mdiMenu, mdiClose } from '@mdi/js';
import {ModalPageWindow} from "@/components/kit/ModalPageWindow";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const onCloseModal = () => {
    setMenuOpen(false);
  }

  const notification = () => {
    console.log('notification');
  }
  return (
    <>
      <header className={s.headerWrapper}>
        <button className={s.burger} onClick={notification}>
          <Icon path={mdiBellOutline} size="24px" className={s.iconButton} />
        </button>

        {/*@fixme изменить урл на главную в будущем*/}
        <Link href={pages.profile.link} className={s.logoWrapper}>
          <span>доедешь-пиши.рф</span>
          <div className={s.iconWrapper}>
            <Icon path={mdiCarLimousine} size="40px" />
          </div>
        </Link>

        <button onClick={() => setMenuOpen(prev => !prev)} className={s.burger}>
          <Icon path={menuOpen ? mdiClose : mdiMenu} size="32px" />
        </button>
      </header>

      <ModalPageWindow
        isOpen={menuOpen}
        onClose={onCloseModal}
        className={s.modalPage}
        backdropClassName={s.backdrop}
        slidePosition="x"
      >
        <div className={s.modalWrapper}>
          <h1>menu</h1>
        </div>
      </ModalPageWindow>
    </>
  );
};