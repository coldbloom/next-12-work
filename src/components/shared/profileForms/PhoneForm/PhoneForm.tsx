import {observer} from "mobx-react-lite";
import { userInfoStore } from "@/store/userInfoStore";
import {formatPhone} from "@/utils/functions";
import {SubmitHandler, useForm} from "react-hook-form";
import {poster} from "@/context/AuthContext";
import React from "react";
import {Input} from "@/components/kit/Input";
import Icon from "@mdi/react";
import {mdiInformationOutline} from "@mdi/js";
import InputMask from 'react-input-mask';

import s from './PhoneForm.module.scss';

type TForm = {
  phone: string,
};

type PhoneFormProps = {
  onClose: () => void;
};

export const PhoneForm = observer(({ onClose }: PhoneFormProps) => {
  const { userInfo, updateUserInfo } = userInfoStore;
  const formatedPhone = formatPhone(userInfo?.phone);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TForm>({
    defaultValues: { phone: formatedPhone || '+7 ' },
    mode: "onTouched",
  });

  const currentValues = watch();

  const onSubmit: SubmitHandler<TForm> = async (data) => {
    if (currentValues.phone !== formatedPhone) {
      const phone = data.phone.replace(/ /g, '');
      try {
        const res = await poster('user-info/edit', { phone });

        if (res.message) {
          updateUserInfo('phone', phone);
          onClose();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      onClose();
    }
  };

  console.log('render');
  return (
    <>
      <h1>Введите номер телефона</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputMask
          mask="+7 999 999 99 99"
          maskChar=" "
          value={currentValues.phone}
          {...register('phone', {
            required: 'Номер телефона обязателен',
            pattern: {
              value: /^\+7\s\d{3}\s\d{3}\s\d{2}\s\d{2}$/,
              message: 'Неверный формат номера телефона'
            },
          })}
        >
          {(inputProps: any) => (
            <Input
              {...inputProps}
              type="tel"
              placeholder="+7 *** *** ** **"
              errorText={errors.phone?.message}
              autoFocus={true}
            />
          )}
        </InputMask>
        <Input type="submit" value="Изменить" />
      </form>
      <div className={s.infoWrapper}>
        <div>
          <Icon path={mdiInformationOutline} size="16px" />
        </div>
        <p>Ваш номер телефона будет виден другим пользователям и может быть использован для связи с вами</p>
      </div>
    </>
  )
});