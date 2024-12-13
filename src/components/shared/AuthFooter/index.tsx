import Link from "next/link";
import s from './AuthFooter.module.scss';

type AuthFooterProps = {
  variant: 'login' | 'register';
};

const AuthFooter = ({ variant }: AuthFooterProps) => {

  return (
    <div className={s.footer}>
      {variant === 'login' ? (
        <>
          Уже есть учётная запись? <Link href="/auth/login" className={s.link}>Войти</Link>
        </>
      ) : (
        <>
          Нет учётной записи? <Link href="/auth/register" className={s.link}>Зарегистрироваться</Link>
        </>
      )}
    </div>
  );
};

export default AuthFooter;