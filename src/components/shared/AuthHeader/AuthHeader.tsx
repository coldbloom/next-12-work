import { mdiClose } from '@mdi/js';
import Icon from '@mdi/react';

import { GoBackBtn } from "@/components/kit/GoBackBtn";
import { useRouter } from 'next/router';
import s from './AuthHeader.module.scss';
import cn from 'classnames';

type AuthHeaderProps = {
  withGoBack?: boolean;
};

export const AuthHeader = ({ withGoBack }: AuthHeaderProps) => {
  const router = useRouter();

  return (
    <header className={cn(s.headerWrapper, { [s.spaceBetween]: withGoBack })}>
      {withGoBack && <GoBackBtn style={{ marginTop: 0 }} />}
      <button className={s.closeBtn} onClick={() => router.push('/')}>
        <Icon path={mdiClose} size="32px" />
      </button>
    </header>
  );
};