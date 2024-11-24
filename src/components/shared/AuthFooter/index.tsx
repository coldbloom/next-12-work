import Link from "next/link";
import s from './AuthFooter.module.scss';

const AuthFooter = () => {

  return (
    <div className={s.footer}>
      Уже есть учётная запись? <Link href="/auth/login" className={s.link}>Войти</Link>
    </div>
  );
};

export default AuthFooter;