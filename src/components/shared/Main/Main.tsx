import { MainLayout } from "@/components/layouts/MainLayout";
import { MainForm } from "@/components/shared/MainForm";
import { pages } from "@/utils/const";

import Link from "next/link";
import s from './Main.module.scss';

export const Main = () => {
  return (
    <MainLayout>
      <MainForm />
      <div className={s.createTravelWrapper}>
        <Link href={pages.createTrip.link} className={s.createTravelLink}>
          Создать поездку
        </Link>
      </div>
      <h1>fff1</h1>
    </MainLayout>
  );
};