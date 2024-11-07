import React from 'react';
import s from './Header.module.scss'
import Link from "next/link";
import { pages } from '@/utils/const';

import Icon from '@mdi/react';
import { mdiCarLimousine, mdiBellOutline, mdiMenu } from '@mdi/js';

export const Header = () => {
  return (
    <header className={s.wrapper}>
      <Icon path={mdiBellOutline} size="24px" className={s.iconButton} />
      {/*@fixme изменить урл на главную в будущем*/}
      <Link href={pages.profile.link} className={s.logoWrapper}>
        <span>доедешь-пиши.рф</span>
        <div className={s.iconWrapper}>
          <Icon path={mdiCarLimousine} size="40px"/>
        </div>
      </Link>
      <Icon path={mdiMenu} size="32px" />
    </header>
  );
};