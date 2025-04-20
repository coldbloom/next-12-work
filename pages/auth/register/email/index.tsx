import { useContext } from 'react';
import { Input } from "@/components/kit/Input";
import { Button } from "@/components/kit/Button";
import { AuthContext } from "@/context/AuthContext";

import { useForm, SubmitHandler } from "react-hook-form";
import { AuthLayout } from "@/components/layouts/AuthLayout";

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
    mode: "onChange" // режим валидации ошибок - на onBlur (популярный)
  })

  // Use watch to get current values
  const currentValues = watch();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await handleSignUp({ login: data.email, password: data.password, name: data.name });
  }

  return (
    <AuthLayout
      title="Регистрация"
      description="Создайте аккаунт чтобы бронировать и создавать поездки"
      variant="login"
      withGoBack={true}
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{ minWidth: '300px' }}>
        <Input
          type="text"
          placeholder="Имя"
          value={currentValues.name}
          errorText={errors.name?.message}
          {...register('name', {required: 'Имя обязательно'})}
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

        <Button type="submit" style={{ width: '100%', margin: 0 }}>Создать учётную запись</Button>
      </form>
    </AuthLayout>
  );
};

export default RegisterEmail;