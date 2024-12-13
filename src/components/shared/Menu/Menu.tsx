import { mdiAccountOutline, mdiAccountPlusOutline, mdiChevronRight, mdiLogout, mdiRoutes} from "@mdi/js";
import Icon from "@mdi/react";

import {useContext} from 'react';

import {Avatar} from "@/components/kit/Avatar";
import {AuthContext} from "@/context/AuthContext";
import {useRouter} from "next/router";

import cn from 'classnames';
import s from './Menu.module.scss';

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

const Unauthorized = () => {
  const router = useRouter();
  const handleLogin = () => router.push("/auth/login");
  const handleRegister = () => router.push("/auth/register");

  return (
    <div className={s.tabsWrapper}>
      <div className={cn(s.row, s.tabWrapper)} onClick={handleRegister}>
        <div className={s.row}>
          <Icon path={mdiAccountPlusOutline} size={1.2}/>
          <span style={{fontSize: '18px', fontWeight: '500'}}>Зарегистрироваться</span>
        </div>
        <ChevronIcon isLarge={true}/>
      </div>
      <div className={cn(s.row, s.tabWrapper)} onClick={handleLogin}>
        <div className={s.row}>
          <Icon path={mdiAccountOutline} size={1.2}/>
          <span style={{fontSize: '18px', fontWeight: '500'}}>Войти</span>
        </div>
        <ChevronIcon isLarge={true}/>
      </div>
    </div>
  )
}

export const Menu = () => {
  const {isUserLogged, handleLogOut, userInfo} = useContext(AuthContext);

  return (
    <div className={s.modalWrapper}>
      <>
        {isUserLogged ? (
          <>
            {userInfo && <UserInfo name={userInfo.name} login={userInfo.login}/>}
            <hr/>
            <div className={s.tabsWrapper}>
              <div className={cn(s.row, s.tabWrapper)}>
                <div className={s.row}>
                  <Icon path={mdiRoutes} size={1}/>
                  <span>Мои поездки</span>
                </div>
                <ChevronIcon/>
              </div>
              <div className={cn(s.row, s.tabWrapper)}>
                <div className={s.row}>
                  <Icon path={mdiAccountOutline} size={1}/>
                  <span>Профиль</span>
                </div>
                <ChevronIcon/>
              </div>
              <hr/>
              <div className={cn(s.row, s.tabWrapper)} onClick={handleLogOut}>
                <div className={s.row}>
                  <Icon path={mdiLogout} size={1}/>
                  <span>Выйти</span>
                </div>
                <ChevronIcon/>
              </div>
            </div>
          </>
        ) : (
          <Unauthorized />
        )}
      </>
    </div>
  );
};