import { mdiChevronRight, mdiAccountEditOutline, mdiImagePlusOutline, mdiClose, mdiInformationOutline } from "@mdi/js";
import Icon from "@mdi/react";

import { MainLayout } from "@/components/layouts/MainLayout";
import { withAuth } from '@/components/hoc/WithAuth';

import s from './profile.module.scss';
import { useState } from "react";
import { Avatar } from "@/components/kit/Avatar";
import { ModalPageWindow } from "@/components/kit/ModalPageWindow";

import { observer } from "mobx-react-lite";
import { userInfoStore } from "@/store/userInfoStore";
import { formatPhone } from "@/utils/functions"

import { PhoneForm } from '@/components/shared/profileForms/PhoneForm';
import { NameForm } from '@/components/shared/profileForms/NameForm';
import { BirthDateForm } from "@/components/shared/profileForms/BirthDateForm";
import { Input } from '@/components/kit/Input';
import {EditInfoModal} from "@/components/shared/profileModal/EditInfoModal";
import {EditAvatarModal} from "@/components/shared/profileModal/EditAvatarModal";

const Profile = observer(() => {
  const [editModalOpen, setEditModalOpen] = useState<'info' | 'avatar' | null>(null);
  const { userInfo } = userInfoStore;

  const handleClose = () => setEditModalOpen(null);

  console.log('render Profile page')

  return (
    <MainLayout>
      <div className={s.wrapper}>
        <div className={s.titleWrapper}>
          <h1>Мой профиль</h1>
        </div>
        <hr/>
        <div style={{ padding: '10px 0 10px 0'}}>
          <div className={s.profileWrapper}>
            <div>
              <Avatar size="xxl">
                {userInfo?.name || ''}
              </Avatar>
              <span>{userInfo?.name}</span>
            </div>
            <Icon path={mdiChevronRight} size="36px" className={s.chevronIcon}/>
          </div>
          <div style={{marginTop: '10px'}}>
            <div className={s.btnWrapper} onClick={() => setEditModalOpen('info')}>
                <Icon path={mdiAccountEditOutline} size={1}/>
                <p>Редактировать информацию о себе</p>
            </div>
            <div className={s.btnWrapper} onClick={() => setEditModalOpen('avatar')}>
                <Icon path={mdiImagePlusOutline} size={1}/>
                <p>Добавить фото профиля</p>
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