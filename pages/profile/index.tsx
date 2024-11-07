import Link from "next/link";

import { MainLayout2 } from "@/components/MainLayout2";
import { MainForm } from "@/components/shared/MainForm";
import { pages } from '@/utils/const';

import s from './profile.module.scss'

const Profile = () => {

  return (
    <MainLayout2>
      <MainForm />
      <div className={s.createTravelWrapper}>
        <Link href={pages.createTrip.link} className={s.createTravelLink}>
          Создать поездку
        </Link>
      </div>
    </MainLayout2>
  );
};

export default Profile;