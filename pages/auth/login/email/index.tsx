import { useContext } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { Heading } from "@/components/kit/Heading/Heading";
import { MainLayout } from "@/components/layouts/MainLayout";
import { Input } from "@/components/kit/Input";

import { AuthFooter } from "@/components/shared/AuthFooter";
import { AuthContext } from "@/context/AuthContext";

import s from "../../register/Register.module.scss";

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
          <Heading variant="dark">Войти по email</Heading>
          <p>Войдите в свой аккаунт чтобы бронировать и создавать поездки</p>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
            <Input
              type="text"
              placeholder="Email"
              value={currentValues.email}
              errorText={errors.email?.message}
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
              errorText={errors.password?.message}
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