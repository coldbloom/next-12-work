import { observer } from "mobx-react-lite";
import { SubmitHandler, useForm } from "react-hook-form";
import { userInfoStore } from "@/store/userInfoStore";
import { poster } from "@/context/AuthContext";
import { Input } from "@/components/kit/Input";

type NameFormProps = {
  onClose: () => void;
};

type TForm = {
  name: string,
};

export const NameForm = observer(({ onClose }: NameFormProps) => {
  const { userInfo } = userInfoStore;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TForm>({
    defaultValues: { name: userInfo?.name },
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<TForm> = async (data) => {
    const { name } = data;

    if (name !== userInfo?.name) {
      try {
        const res = await poster('user-info/edit', { name });
        if (res.message) {
          userInfoStore.updateUserInfo('name', name as string)
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
      <h1>Введите ваше имя</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="Имя"
          errorText={errors.name?.message}
          autoFocus={true}
          {...register('name', {
            required: 'Имя обязательно'
          })}
        />
        <Input type="submit" value="Изменить" />
      </form>
    </>
  );
});
