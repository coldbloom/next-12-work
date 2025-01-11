import { mdiCarLimousine, mdiBellOutline, mdiMenu, mdiClose } from '@mdi/js';
import Icon from '@mdi/react';

import { useEffect, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { ModalPageWindow } from '@/components/kit/ModalPageWindow';
import { Menu } from '@/components/shared/Menu';

import { observer } from 'mobx-react-lite';
import { menuStore } from '@/store/menuStore';

import s from './Header.module.scss'

export const Header = observer(() => {
  const { isOpen } = menuStore;

  const isAuthNow = useMemo(() => localStorage.getItem('isAuthNow'), []);

  const pathName = usePathname();

  const setMenuOpen = (isOpen: boolean) => menuStore.setOpenMenu(isOpen);
  const onCloseMenu = () => menuStore.setOpenMenu(false);

  const notification = () => {
    console.log('notification');
  }

  useEffect(() => {
    menuStore.setOpenMenu(false);
  }, [pathName]);

  useEffect(() => {
    if (isAuthNow === '1') {
      setTimeout(() => setMenuOpen(true), 300)
      localStorage.setItem('isAuthNow', '0');
    }
  }, [isAuthNow]);

  return (
    <>
      <header className={s.headerWrapper}>
        <button className={s.burger} onClick={notification}>
          <Icon path={mdiBellOutline} size="24px" className={s.iconButton} />
        </button>

        <Link href="/" className={s.logoWrapper}>
          {/*<span>доедешь-пиши.рф</span>*/}
          <span>БлаБлаАвто</span>
          <div className={s.iconWrapper}>
            <Icon path={mdiCarLimousine} size="40px" />
          </div>
        </Link>

        <button onClick={() => setMenuOpen(!isOpen)} className={s.burger}>
          <Icon path={isOpen ? mdiClose : mdiMenu} size="32px" />
        </button>
      </header>

      <ModalPageWindow
        isOpen={isOpen}
        onClose={onCloseMenu}
        className={s.modalPage}
        backdropClassName={s.backdrop}
        slidePosition="x"
        exitActiveFast={true}
      >
        <Menu />
      </ModalPageWindow>
    </>
  );
});