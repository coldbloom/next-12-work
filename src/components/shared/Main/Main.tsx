import React, {useState} from 'react';
import {MainForm} from "@/components/shared/MainForm";
import s from './Main.module.scss';
import Link from "next/link";
import {pages} from "@/utils/const";
import {MainLayout} from "@/components/layouts/MainLayout";
import {EditAvatarModal} from "@/components/shared/profileModal/EditAvatarModal";
import {Button} from "@/components/kit/Button";

export const Main = () => {
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  return (
    <MainLayout>
      <MainForm/>
      <div className={s.createTravelWrapper}>
        <Link href={pages.createTrip.link} className={s.createTravelLink}>
          Создать поездку
        </Link>
      </div>
      <input type="file"/>
      {/*<div className={s.createTravelWrapper}>*/}

      {/*</div>*/}
      <Button variant="continue" onClick={() => setOpen(true)}>Добавить фото</Button>
      <EditAvatarModal isOpen={open} onClose={onClose} />
    </MainLayout>
  );
};