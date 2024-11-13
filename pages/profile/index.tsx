import Link from "next/link";

import { MainLayout2 } from "@/components/MainLayout2";
import { MainForm } from "@/components/shared/MainForm";
import { pages } from '@/utils/const';
import { TelegramLoginButton } from '@/components/kit/TelegramLoginButton';

import s from './profile.module.scss'

const Profile = () => {

  const handleBot = (user: any) => {
    console.log(user);
  }

  return (
    <MainLayout2>
      <MainForm />
      <div className={s.createTravelWrapper}>
        <Link href={pages.createTrip.link} className={s.createTravelLink}>
          Создать поездку
        </Link>
      </div>
      <div className={s.createTravelWrapper}>
        <TelegramLoginButton
          botName="auth-get-there-bot"
          buttonSize="large"
          cornerRadius={3}
          usePic={false}
          dataOnauth={handleBot}
        />
      </div>
    </MainLayout2>
  );
};

export default Profile;