import React, {forwardRef, HTMLProps} from 'react';
import { MainLayout2 } from "@/components/MainLayout2";
import s from './Login.module.scss';
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string,
  password: string,
}

const defaultValues = {
  email: '',
  password: '',
}

type InputProps = {

} & HTMLProps<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, InputProps>(({ ...props }, ref) => {
  return (
    <div>
      <input ref={ref} {...props} />
      <p>input</p>
    </div>
  );
});

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: formState,
    reset, // Добавляем метод reset
  } = useForm<Inputs>({
    defaultValues: defaultValues,
    mode: "onBlur" // режим валидации ошибок - на onBlur (популярный)
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  }

  return (
    <MainLayout2>
      <div className={s.wrapper}>
        <h1>Войдите в аккаунт чтобы бронировать и создавать поездки</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="rext"
            placeholder="электронная почта"
            {...register("email", {
              required: "Введите логин!",
            })}
            onBlur={() => console.log('onBlur')}
            onFocus={() => console.log('onFocus')}
          />
          <Input
            type="password"
            placeholder="пароль"
            {...register("password", {
              required: "Введите пароль!",
            })}
          />
          <button type="submit">войти</button>
        </form>
      </div>
    </MainLayout2>
  );
};

export default Login;