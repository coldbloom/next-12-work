import { mdiAccountOutline, mdiAccountPlusOutline, mdiChevronRight, mdiLogout, mdiRoutes} from "@mdi/js";
import Icon from "@mdi/react";

import { PropsWithChildren, ReactNode, useContext } from 'react';

import { Avatar } from "@/components/kit/Avatar";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";

import cn from 'classnames';
import s from './Menu.module.scss';
import Link from "next/link";

import { observer } from 'mobx-react-lite';
import { userInfoStore } from '@/store/userInfoStore';

const ChevronIcon = ({ isLarge }: { isLarge?: boolean }) => <Icon path={mdiChevronRight} size={ isLarge ? 1.2 : 1} className={s.chevronIcon} />;

const UserInfo = ({ name, login }: { name: string; login: string }) => (
  <div className={s.userInfoWrapper}>
    <Avatar size="m">{name}</Avatar>
    <div className={s.textWrapper}>
      <span>{name}</span>
      <span>{login}</span>
    </div>
  </div>
);

type TabProps = {
  icon: ReactNode;
  onClick: () => void;
  chevronIconLarge?: boolean;
} & PropsWithChildren;

const Tab = ({ icon, onClick, children, chevronIconLarge = true }: TabProps) => (
  <div className={cn(s.row, s.tabWrapper)} onClick={onClick}>
    <div className={s.row}>
      {icon}
      {children}
    </div>
    <ChevronIcon isLarge={chevronIconLarge} />
  </div>
);

type LinkTabProps = {
  text: string;
  icon: string;
  url: string;
};

const LinkTab = ({text, icon, url}: LinkTabProps) => (
  <Link className={cn(s.row, s.tabWrapper)} href={url}>
    <div className={s.row}>
    <Icon path={icon} size={1}/>
      <span>{text}</span>
    </div>
    <ChevronIcon/>
  </Link>
)

const AuthorizedTabs = () => {
  const { handleLogOut } = useContext(AuthContext);

  return (
    <div className={s.tabsWrapper}>
      <LinkTab text="Мои поездки" icon={mdiRoutes} url="/" />
      <LinkTab text="Профиль" icon={mdiAccountOutline} url="/profile" />
      <hr/>
      <Tab icon={<Icon path={mdiLogout} size={1} />} onClick={handleLogOut} chevronIconLarge={false} >
        <span>Выйти</span>
      </Tab>
    </div>
  )
}

const UnauthorizedTabs = () => {
  const router = useRouter();
  const handleLogin = () => router.push("/auth/login");
  const handleRegister = () => router.push("/auth/register");

  return (
    <div className={s.tabsWrapper}>
      <Tab icon={<Icon path={mdiAccountPlusOutline} size={1.2} />} onClick={handleRegister}>
        <span style={{fontSize: '18px', fontWeight: '500'}}>Зарегистрироваться</span>
      </Tab>
      <Tab icon={<Icon path={mdiAccountOutline} size={1.2}/>} onClick={handleLogin}>
        <span style={{fontSize: '18px', fontWeight: '500'}}>Войти</span>
      </Tab>
    </div>
  )
}

export const Menu = observer(() => {
  const { isUserLogged, handleLogOut } = useContext(AuthContext);
  const { userInfo } = userInfoStore;

  return (
    <div className={s.modalWrapper}>
      <>
        {isUserLogged ? (
          <>
            {userInfo && <UserInfo name={userInfo.name} login={userInfo.login}/>}
            <hr/>
            <AuthorizedTabs />
          </>
        ) : (
          <UnauthorizedTabs />
        )}
      </>
    </div>
  );
});