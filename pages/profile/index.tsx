import { mdiPlusCircleOutline } from '@mdi/js';
import Icon from '@mdi/react';

import {useState} from 'react';
import {MainForm} from "@/components/shared/MainForm";
import s from './profile.module.scss'
import Link from "next/link";
import { pages } from '@/utils/const';

const Profile = () => {
  const [date, setDate] = useState(new Date())

  return (
    <div>
      <h1>Профиль</h1>
      <MainForm />
      <div className={s.createTravelWrapper}>
        <Link href={pages.createTrip.link} className={s.createTravelLink}>
          Создать поездку
        </Link>
      </div>
    </div>
  );
};

export default Profile;