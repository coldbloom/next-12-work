import React from 'react';
import {MainForm} from "@/components/shared/MainForm";
import s from './Main.module.scss';
import Link from "next/link";
import {pages} from "@/utils/const";
import {MainLayout} from "@/components/layouts/MainLayout";

export const Main = () => {
  return (
    <MainLayout>
      <MainForm />
      <div className={s.createTravelWrapper}>
        <Link href={pages.createTrip.link} className={s.createTravelLink}>
          Создать поездку
        </Link>
      </div>
      <div className={s.createTravelWrapper}>

      </div>
    </MainLayout>
  );
};