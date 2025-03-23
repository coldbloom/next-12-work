import { mdiAccountEditOutline, mdiImagePlusOutline, mdiImageEditOutline } from "@mdi/js";
import Icon from "@mdi/react";

import { MainLayout } from "@/components/layouts/MainLayout";
import { withAuth } from '@/components/hoc/WithAuth';

import s from './profile.module.scss';
import { useState } from "react";
import { ProfileCard } from "@/components/shared/ProfileCard";

import { observer } from "mobx-react-lite";
import { userInfoStore } from "@/store/userInfoStore";

import {EditInfoModal} from "@/components/shared/profileModal/EditInfoModal";
import {EditAvatarModal} from "@/components/shared/profileModal/EditAvatarModal";

const Profile = observer(() => {
  const [editModalOpen, setEditModalOpen] = useState<'info' | 'avatar' | null>(null);
  const { userInfo } = userInfoStore;
  const { avatarPath } = userInfo || {};

  const handleClose = () => setEditModalOpen(null);

  return (
    <MainLayout>
      <div className={s.wrapper}>
        <div className={s.titleWrapper}>
          <h1>Мой профиль</h1>
        </div>
        <hr/>
        <div style={{ padding: '10px 0 10px 0'}}>
          <ProfileCard />
          <div style={{marginTop: '10px'}}>
            <div className={s.btnWrapper} onClick={() => setEditModalOpen('info')}>
                <Icon path={mdiAccountEditOutline} size={1}/>
                <p>Редактировать информацию о себе</p>
            </div>
            <div className={s.btnWrapper} onClick={() => setEditModalOpen('avatar')}>
                <Icon path={avatarPath ? mdiImageEditOutline : mdiImagePlusOutline} size={1}/>
                <p>{avatarPath ? 'Изменить фото профиля' : 'Добавить фото профиля'}</p>
            </div>
          </div>
        </div>
        <hr/>
      </div>
      <EditInfoModal isOpen={editModalOpen === 'info'} onClose={handleClose} />
      <EditAvatarModal isOpen={editModalOpen === 'avatar'} onClose={handleClose} />
    </MainLayout>
  );
});

export default withAuth(Profile);