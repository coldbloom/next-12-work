import { MainForm } from "@/components/shared/MainForm";
import { pages } from "@/utils/const";

import Link from "next/link";
import s from './Main.module.scss';

export const Main = () => {
  return (
    <main>
      <MainForm/>

      <Link href={pages.createTrip.link} className={s.createTravelLink}>
        Создать поездку
      </Link>
    </main>
  );
};