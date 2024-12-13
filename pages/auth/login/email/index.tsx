import { useContext } from 'react';
import s from "../../register/Register.module.scss";
import { HeadingText } from "@/components/kit/HeadingText/HeadingText";
import { MainLayout } from "src/components/layouts/MainLayout";
import { Input } from "@/components/kit/Input";

import { useForm, SubmitHandler } from "react-hook-form";
import AuthFooter from "@/components/shared/AuthFooter";
import { AuthContext } from "@/context/AuthContext";

type Inputs = {
  email: string,
  password: string,
};

const defaultValues = {
  email: '',
  password: '',
}

const LoginEmail = () => {
  const { handleSignIn } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset, // Добавляем метод reset
  } = useForm<Inputs>({
    defaultValues: defaultValues,
    mode: "onBlur" // режим валидации ошибок - на onBlur (популярный)
  })

  // Use watch to get current values
  const currentValues = watch();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await handleSignIn({ login: data.email, password: data.password });
  };

  return (
    <MainLayout>
      <div className={s.wrapper}>
        <div className={s.contentContainer}>
          <HeadingText variant="dark">Войти по email</HeadingText>
          <p>Войдите в свой аккаунт чтобы бронировать и создавать поездки</p>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
            <Input
              type="text"
              placeholder="Email"
              value={currentValues.email}
              error={errors.email?.message}
              {...register('email', {
                required: 'Email обязателен',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Некорректный email адрес'
                }
              })}
            />
            <Input
              type="password"
              placeholder="Пароль"
              value={currentValues.password}
              error={errors.password?.message}
              {...register('password', {
                required: 'Пароль обязателен',
                minLength: {
                  value: 6,
                  message: 'Пароль должен содержать минимум 6 символов'
                }
              })}
            />

            <input type="submit" value="Войти" className={s.submitButton}/>
          </form>
        </div>

        <AuthFooter variant="register" />
      </div>
    </MainLayout>
  );
};

export default LoginEmail;