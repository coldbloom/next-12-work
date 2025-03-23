import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { observer } from "mobx-react-lite";
import { userInfoStore } from "@/store/userInfoStore";
import { poster } from "@/context/AuthContext";

import InputMask from "react-input-mask";
import { Input } from "@/components/kit/Input";

type TForm = {
  birthDate: string;
}

type BirthDateFormProps = {
  onClose: () => void;
}

export const BirthDateForm = observer(({ onClose }: BirthDateFormProps) => {
  const { userInfo } = userInfoStore;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TForm>({
    defaultValues: { birthDate: userInfo?.birthDate || '' },
    mode: "onTouched",
  });

  const validateDate = (value: string) => {
    // Проверяем, что дата полностью заполнена
    if (value.includes('_')) {
      return 'Введите полную дату';
    }

    const [day, month, year] = value.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    const today = new Date();

    // Проверяем, что дата валидна
    if (
      date.getDate() !== day ||
      date.getMonth() !== month - 1 ||
      date.getFullYear() !== year
    ) {
      return 'Некорректная дата';
    }

    // Проверяем, что дата не в будущем
    if (date > today) {
      return 'Дата не может быть в будущем';
    }

    // Проверяем возраст (например, минимум 14 лет)
    const minAge = 14;
    const maxAge = 100;
    const yearDiff = today.getFullYear() - date.getFullYear();
    const monthDiff = today.getMonth() - date.getMonth();
    const dayDiff = today.getDate() - date.getDate();
    const age = yearDiff - (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? 1 : 0);

    if (age < minAge) {
      return `Минимальный возраст: ${minAge} лет`;
    }

    if (age > maxAge) {
      return `Максимальный возраст: ${maxAge} лет`;
    }

    return true;
  };

  const onSubmit: SubmitHandler<TForm> = async (data) => {
    const { birthDate } = data;

    if (birthDate !== userInfo?.birthDate) {
      try {
        const res = await poster('user-info/edit', { birthDate });
        if (res.message) {
          userInfoStore.updateUserInfo('birthDate', birthDate)
          onClose();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      onClose();
    }
  };

  return (
    <>
      <h1>Введите дату рождения</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="birthDate"
          control={control}
          rules={{ validate: validateDate }}
          render={({ field }) => (
            <InputMask
              mask="99/99/9999"
              maskChar="_"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
            >
              {(inputProps: any) => (
                <Input
                  {...inputProps}
                  placeholder="ДД/ММ/ГГГГ"
                  errorText={errors.birthDate?.message}
                  autoFocus={true}
                />
              )}
            </InputMask>
          )}
        />
        <Input type="submit" value="Изменить" />
      </form>
    </>
  );
});