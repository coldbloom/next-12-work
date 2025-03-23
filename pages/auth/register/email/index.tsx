import { useContext } from 'react';
import s from "../Register.module.scss";
import { Heading } from "@/components/kit/Heading/Heading";
import { MainLayout } from "src/components/layouts/MainLayout";
import { Input } from "@/components/kit/Input";
import { AuthContext } from "@/context/AuthContext";

import { useForm, SubmitHandler } from "react-hook-form";
import { AuthFooter } from "@/components/shared/AuthFooter";

type Inputs = {
  name: string,
  email: string,
  password: string,
};

const defaultValues = {
  name: '',
  email: '',
  password: '',
}

const RegisterEmail = () => {
  const { handleSignUp } = useContext(AuthContext);

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
    await handleSignUp({ login: data.email, password: data.password, name: data.name });
  }

  return (
    <MainLayout>
      <div className={s.wrapper}>
        <div className={s.contentContainer}>
          <Heading variant="dark">Регистрация</Heading>
          <p>Создайте аккаунт чтобы бронировать и создавать поездки</p>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
            <Input
              type="text"
              placeholder="Имя"
              value={currentValues.name}
              errorText={errors.name?.message}
              {...register('name', { required: 'Имя обязательно' })}
            />
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

            <input type="submit" value="Создать учётную запись" className={s.submitButton}/>
          </form>
        </div>

        <AuthFooter variant="login" />
      </div>
    </MainLayout>
  );
};

export default RegisterEmail;