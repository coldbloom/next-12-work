import { Avatar } from '@/components/kit/Avatar';
import { userInfoStore } from '@/store/userInfoStore';

import s from './UserInfo.module.scss'

export const UserInfo = () => {
  const { userInfo } = userInfoStore;

  if (!userInfo) return null;

  const { name, login, avatarPath } = userInfo;
  return (
    <div className={s.userInfoWrapper}>
      <Avatar size="m" avatarPath={avatarPath}>{name}</Avatar>
      <div className={s.textWrapper}>
        <span>{name}</span>
        <span>{login}</span>
      </div>
    </div>
  )
};