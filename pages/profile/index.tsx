import Link from "next/link";

import { MainLayout } from "src/components/layouts/MainLayout";
import { MainForm } from "@/components/shared/MainForm";
import { pages } from '@/utils/const';

import s from './profile.module.scss'

const Profile = () => {

  const handleBot = (user: any) => {
    console.log(user);
  }

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

export default Profile;