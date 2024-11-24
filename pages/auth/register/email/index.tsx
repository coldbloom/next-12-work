import React from 'react';
import s from "../Register.module.scss";
import { HeadingText } from "@/components/kit/HeadingText/HeadingText";
import { MainLayout2 } from "@/components/MainLayout2";
import { Input } from "@/components/kit/Input";

import { useForm, SubmitHandler } from "react-hook-form";
import AuthFooter from "@/components/shared/AuthFooter";

type Inputs = {
  name: string,
  email: string,
  password: string,
  // confirmPassword: string,
};

const defaultValues = {
  name: '',
  email: '',
  password: '',
  // confirmPassword: '',
}

const Email = () => {
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
    console.log(data);
  }

  return (
    <MainLayout2>
      <div className={s.wrapper}>
        <div className={s.contentContainer}>
          <HeadingText variant="dark">Регистрация</HeadingText>
          <p>Создайте аккаунт чтобы бронировать и создавать поездки</p>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
            <Input
              type="text"
              placeholder="Имя"
              value={currentValues.name}
              error={errors.name?.message}
              {...register('name', { required: 'Имя обязательно' })}
            />
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
            {/*<Input*/}
            {/*  type="password"*/}
            {/*  placeholder="подтвердите пароль"*/}
            {/*  value={currentValues.confirmPassword}*/}
            {/*  error={errors.confirmPassword?.message}*/}
            {/*  {...register('confirmPassword', {*/}
            {/*    required: 'Подтвердите пароль',*/}
            {/*    validate: (value) =>*/}
            {/*      value === currentValues.password || 'Пароли не совпадают'*/}
            {/*  })}*/}
            {/*  {...register('confirmPassword')}*/}
            {/*/>*/}

            <input type="submit" value="Создать учётную запись" className={s.submitButton}/>
          </form>
        </div>

        <AuthFooter />
      </div>
    </MainLayout2>
  );
};

export default Email;