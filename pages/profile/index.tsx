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

const Profile = observer(() => {
  const [editModalOpen, setEditModalOpen] = useState<'info' | 'avatar' | null>(null);
  const [editFieldModalOpen, setEditFieldModalOpen] = useState<number>(0);
  const {userInfo} = userInfoStore;

  const handleClose = () => setEditModalOpen(null);
  const handleCloseClose = () => setEditFieldModalOpen(0);

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
      <ModalPageWindow isOpen={editModalOpen === 'info'} onClose={handleClose}>
        <div className={s.modalWrapper}>
          <div onClick={handleClose} className={s.closeBtn}>
            <Icon path={mdiClose} size="36px"/>
          </div>

          <h1>Информация о себе</h1>

          <div className={s.inputBtn} onClick={() => setEditFieldModalOpen(1)}>
            <span>Имя</span>
            <span>{userInfo?.name}</span>
          </div>
          <div className={s.inputBtn} onClick={() => setEditFieldModalOpen(2)}>
            <span>Дата рождения</span>
            <span>{userInfo?.birthDate || 'Не указано'}</span>
          </div>
          <div className={s.inputBtn} onClick={() => setEditFieldModalOpen(3)}>
            <span>Номер телефона</span>
            <span>{formatPhone(userInfo?.phone) || 'Не указано'}</span>
          </div>
        </div>
        <ModalPageWindow isOpen={!!editFieldModalOpen} onClose={handleCloseClose}>
          <div className={s.modalWrapper}>
            <div onClick={handleCloseClose} className={s.closeBtn}>
              <Icon path={mdiClose} size="36px"/>
            </div>
            { editFieldModalOpen === 1 && <NameForm onClose={handleCloseClose} /> }
            { editFieldModalOpen === 2 && <BirthDateForm onClose={handleCloseClose} /> }
            { editFieldModalOpen === 3 && <PhoneForm onClose={handleCloseClose} /> }
          </div>
        </ModalPageWindow>
      </ModalPageWindow>
      <ModalPageWindow isOpen={editModalOpen === 'avatar'} onClose={handleClose}>
        <div className={s.modalWrapper}>
          <div onClick={handleClose} className={s.closeBtn}>
            <Icon path={mdiClose} size="36px"/>

            <h1>Фото профиля</h1>

            <input type="file" />
          </div>
        </div>
      </ModalPageWindow>
    </MainLayout>
  );
});

export default withAuth(Profile);