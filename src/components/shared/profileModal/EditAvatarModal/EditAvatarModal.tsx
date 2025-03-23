import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import s from "../../../../../pages/profile/profile.module.scss";
import Icon from "@mdi/react";
import {mdiClose, mdiImagePlusOutline, mdiAlertCircleOutline} from "@mdi/js";
import { ModalPageWindow } from "@/components/kit/ModalPageWindow";
import { observer } from "mobx-react-lite";
import { AvatarCropper } from "@/components/shared/AvatarCropper";
import { AvatarPreview} from './AvatarPreview';
import { poster } from "@/context/AuthContext";
import { Button } from "@/components/kit/Button";
import { userInfoStore } from "@/store/userInfoStore";

type EditAvatarModalProps = {
  isOpen: boolean;
  onClose: () => void;
}

export const EditAvatarModal = observer(({ isOpen, onClose }: EditAvatarModalProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const [imageFile, setImageFile] = useState<Blob | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const stopCropping = () => setIsCropping(false);

  const onCloseClose = () => {
    onClose();
    // @INFO: таймаут нужен для сброса текущего preview после завершения анимации
    setTimeout(() => {
      setIsCropping(false);
      setPreview(null);
      setImage(null);
    }, 300);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // Валидация размера (например, макс. 5MB)
      // if (file.size > 5 * 1024 * 1024) {
      //   setError('Размер файла не должен превышать 5MB');
      //   return;
      // }
      console.log(file, ' file');

      // Создаем превью
      const objectUrl = URL.createObjectURL(file);
      setImage(objectUrl);
      setIsCropping(true);

      // Очищаем URL при размонтировании
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  const handleSave = async () => {
    console.log(preview, ' этот файл надо отправить на сервер')
    const formdata = new FormData();
    imageFile && formdata.append('avatar', imageFile);
    try {
      setLoading(true);
      const { avatarPath } = await poster('user-info/upload-avatar', formdata);
      userInfoStore.updateUserInfo('avatarPath', avatarPath);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      onCloseClose();
    }
  };

  //@FIXME убрать этот эффект и продебажить его
  useEffect(() => {
    console.log(error, ' error')
  }, [error]);

  return (
    <ModalPageWindow isOpen={isOpen}>
      <div className={s.modalWrapper}>
        <div onClick={onCloseClose} className={s.closeBtn}>
          <Icon path={mdiClose} size="36px"/>
        </div>

        {!isCropping && <AvatarPreview preview={preview} fileInputRef={fileInputRef} />}

        {/* Компонент обрезки изображения */}
        {isCropping && image && (
          <AvatarCropper
            image={image}
            setPreview={setPreview}
            setImageFile={setImageFile}
            stopCropping={stopCropping}
          />
        )}

        <div className={s.editAvatarWrapper}>
          {/* Скрытый input */}
          <input
            type="file"
            accept="image/*"
            className={s.hiddenInput}
            id="avatar-upload"
            onChange={handleFileChange}
            ref={fileInputRef}
          />

          {/* Кастомная кнопка */}
          <label
            htmlFor="avatar-upload"
            className={`${s.customButton} ${preview ? s.changeButton : ''}`}
          >
            <Icon path={mdiImagePlusOutline} size={1}/>
            <span>{preview ? 'Изменить фото' : 'Выбрать фото'}</span>
          </label>

          <Button variant="continue" onClick={handleSave} disabled={!preview} loading={loading}>Сохранить</Button>
        </div>
      </div>
    </ModalPageWindow>
  );
});