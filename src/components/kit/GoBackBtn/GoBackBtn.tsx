import {mdiArrowLeftCircle} from "@mdi/js";
import Icon from "@mdi/react";

import {useRouter} from "next/router";
import s from './GoBackBtn.module.scss';

type GoBackBtnProps = {
  onClick?: () => void;
};

export const GoBackBtn = ({ onClick }: GoBackBtnProps) => {
  const { back } = useRouter();

  return (
    <div onClick={onClick || back} className={s.goBackWrapper} tabIndex={0}>
      <Icon path={mdiArrowLeftCircle} size="36px" />
    </div>
  );
};