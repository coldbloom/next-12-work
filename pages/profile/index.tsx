import { MainLayout } from "@/components/layouts/MainLayout";
import { withAuth } from '@/components/hoc/WithAuth';

import s from './profile.module.scss';
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Avatar } from "@/components/kit/Avatar";
import { AuthContext } from "@/context/AuthContext";
import Icon from "@mdi/react";
import { mdiChevronRight, mdiAccountEditOutline, mdiPlusCircleOutline, mdiImagePlusOutline } from "@mdi/js";
import {ModalPageWindow} from "@/components/kit/ModalPageWindow";

// import 'react-dadata/dist/react-dadata.css';

const Profile = () => {
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const { userInfo } = useContext(AuthContext);

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
                K
              </Avatar>
              <span>{userInfo?.name}</span>
            </div>
            <Icon path={mdiChevronRight} size="36px" className={s.chevronIcon}/>
          </div>
          <div style={{marginTop: '10px'}}>
            <div className={s.btnWrapper} onClick={() => setEditModalOpen(true)}>
              <div>
                <Icon path={mdiAccountEditOutline} size={1}/>
                <p>Редактировать информацию о себе</p>
              </div>
              {/*<Icon path={mdiChevronRight} size="24px" className={s.chevronIcon}/>*/}
            </div>
            <div className={s.btnWrapper}>
              <div>
                <Icon path={mdiImagePlusOutline} size={1}/>
                <p>Добавить фото профиля</p>
              </div>
              {/*<Icon path={mdiChevronRight} size="24px" className={s.chevronIcon}/>*/}
            </div>
          </div>
        </div>
        <hr/>
      </div>
      <ModalPageWindow isOpen={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <div className={s.modalWrapper}>

        </div>
      </ModalPageWindow>
    </MainLayout>
  );
};

export default withAuth(Profile);