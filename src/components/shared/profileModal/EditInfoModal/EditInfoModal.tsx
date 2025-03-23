import { useState } from 'react';
import s from "../../../../../pages/profile/profile.module.scss";
import Icon from "@mdi/react";
import {mdiClose} from "@mdi/js";
import {formatPhone} from "@/utils/functions";
import {ModalPageWindow} from "@/components/kit/ModalPageWindow";
import {NameForm} from "@/components/shared/profileForms/NameForm";
import {BirthDateForm} from "@/components/shared/profileForms/BirthDateForm";
import {PhoneForm} from "@/components/shared/profileForms/PhoneForm";
import { userInfoStore } from "@/store/userInfoStore";
import { observer } from "mobx-react-lite";

type EditInfoModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const EditInfoModal = observer(({ isOpen, onClose }: EditInfoModalProps) => {
  const [editFieldModalOpen, setEditFieldModalOpen] = useState<number>(0);
  const {userInfo} = userInfoStore;

  const handleCloseClose = () => setEditFieldModalOpen(0);

  return (
    <ModalPageWindow isOpen={isOpen} onClose={onClose}>
      <div className={s.modalWrapper}>
        <div onClick={onClose} className={s.closeBtn}>
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
  );
});