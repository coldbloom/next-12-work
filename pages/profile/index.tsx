import { mdiPlusCircleOutline } from '@mdi/js';
import Icon from '@mdi/react';

import React, {useEffect, useMemo, useState} from 'react';
import {MainForm} from "@/components/shared/MainForm";
import "react-day-picker/style.css";
import s from './profile.module.scss'
import Link from "next/link";
import { pages } from '@/utils/const';

const Profile = () => {

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