import {mdiArrowLeftCircle} from "@mdi/js";
import Icon from "@mdi/react";

import {useRouter} from "next/router";
import s from './GoBackBtn.module.scss';

export const GoBackBtn = () => {
  const router = useRouter();
  const handleGoBack = () => router.back();

  return (
    <div onClick={handleGoBack} className={s.goBackWrapper} tabIndex={0}>
      <Icon path={mdiArrowLeftCircle} size="36px"/>
    </div>
  );
};