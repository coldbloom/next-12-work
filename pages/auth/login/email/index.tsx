import { useContext } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/kit/Input";
import { Button } from "@/components/kit/Button";

import { AuthContext } from "@/context/AuthContext";
import { AuthLayout } from "@/components/layouts/AuthLayout";

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
    mode: "onChange" // режим валидации ошибок - на onBlur (популярный)
  })

  // Use watch to get current values
  const currentValues = watch();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await handleSignIn({ login: data.email, password: data.password });
  };

  return (
    <AuthLayout
      title="Войти по email"
      description="Войдите в свой аккаунт чтобы бронировать и создавать поездки"
      variant="register"
      withGoBack={true}
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{ minWidth: '300px' }}>
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
        <Button type="submit" style={{ width: '100%', margin: 0 }}>Войти</Button>
      </form>
    </AuthLayout>
  );
};

export default LoginEmail;