import React from 'react';
import s from "./ProfileCard.module.scss";
import {Avatar} from "@/components/kit/Avatar";
import Icon from "@mdi/react";
import {mdiChevronRight} from "@mdi/js";
import {observer} from "mobx-react-lite";
import { userInfoStore } from "@/store/userInfoStore";

export const ProfileCard = observer(() => {
  const { userInfo } = userInfoStore;
  const { name = '', avatarPath, login, phone } = userInfo || {};

  return (
    <div className={s.profileWrapper}>
      <div className={s.content}>
        <Avatar size="xxl" avatarPath={avatarPath}>
          {name}
        </Avatar>
        <div className={s.row}>
          <span>{name}</span>
          <span>{login}</span>
        </div>
      </div>
      <Icon path={mdiChevronRight} size="36px" className={s.chevronIcon}/>
    </div>
  );
});