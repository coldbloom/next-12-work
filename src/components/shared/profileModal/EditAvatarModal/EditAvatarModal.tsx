import { useState, useRef } from 'react';
import s from "../../../../../pages/profile/profile.module.scss";
import Icon from "@mdi/react";
import {mdiClose, mdiImagePlusOutline} from "@mdi/js";
import {ModalPageWindow} from "@/components/kit/ModalPageWindow";
import {observer} from "mobx-react-lite";
import { Input } from "@/components/kit/Input";
import AvatarEditor from 'react-avatar-editor';
import Avatar from 'react-avatar-edit';

type EditAvatarModalProps = {
  isOpen: boolean;
  onClose: () => void;
}

export const EditAvatarModal = observer(({ isOpen, onClose }: EditAvatarModalProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const editorRef = useRef<AvatarEditor | null>(null);
  const [scale, setScale] = useState(1);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError('');

    if (file) {
      // Валидация типа файла
      if (!file.type.startsWith('image/')) {
        setError('Пожалуйста, выберите изображение');
        return;
      }

      // Валидация размера (например, макс. 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Размер файла не должен превышать 5MB');
        return;
      }

      // Создаем превью
      const objectUrl = URL.createObjectURL(file);
      setImage(objectUrl);
      setPreview(objectUrl);

      // Очищаем URL при размонтировании
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  const handleSave = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImage();
      canvas.toBlob((blob) => {
        // Здесь вы можете обработать загруженное изображение (например, отправить на сервер)
        console.log(blob);
      });
    }
  };

  return (
    <ModalPageWindow isOpen={isOpen} onClose={onClose}>
      <div className={s.modalWrapper}>
        <div onClick={onClose} className={s.closeBtn}>
          <Icon path={mdiClose} size="36px"/>
        </div>

        <h1>Фото профиля</h1>

        <div className={s.editAvatarWrapper}>
          {/* Скрытый input */}
          <input
            type="file"
            accept="image/*"
            className={s.hiddenInput}
            id="avatar-upload"
            onChange={handleFileChange}
          />

          {/* Кастомная кнопка */}
          <label
            htmlFor="avatar-upload"
            className={`${s.customButton} ${preview ? s.changeButton : ''}`}
          >
            <Icon path={mdiImagePlusOutline} size={1}/>
            <span>{preview ? 'Изменить фото' : 'Выбрать фото'}</span>
          </label>

          <Input type="submit" value="Сохранить" onClick={handleSave}/>

          {/* Компонент обрезки изображения */}
          {image && (
            <>
              <AvatarEditor
                ref={editorRef}
                image={image}
                width={250}
                height={250}
                border={50}
                borderRadius={125}
                scale={scale}
                rotate={0}
              />
              <div style={{ display: 'flex' }}>
                <button onClick={() => setScale(prev => prev + 0.1)}>+</button>
                <p>{scale}</p>
                <button onClick={() => setScale(prev => prev - 0.1)}>-</button>
              </div>
            </>
          )}
        </div>
      </div>
    </ModalPageWindow>
  );
});

// import {memo, useLayoutEffect} from 'react';
// import {Button} from "@/components/kit/Button";
//
// type WidgetContainerProps = {
//   onClose: () => void;
// };

// export const WidgetContainer = memo(({ onClose }: WidgetContainerProps) => {
//   useLayoutEffect(() => {
//     const widgetContainer = document.getElementById('widgetContainer');
//
//     // Проверяем, существует ли уже скрипт
//     const existingScript = document.querySelector('script[src*="rpabot-prodjai.x5.ru"]');
//
//     if (!existingScript && widgetContainer) {
//       const script = document.createElement('script');
//       script.src = 'https://rpabot-prodjai.x5.ru/embed/embed.js?id=eYpBILCE:c15a24fbd12fcabaca6bd962ef625fd4d8cfc0af';
//       script.async = true;
//
//       // Добавляем скрипт в контейнер
//       widgetContainer.appendChild(script);
//     }
//
//     // Добавляем метод hideMessages в глобальный объект
//     function addExtensionMethods() {
//       if (window.JustWidget) {
//         window.JustWidget.hideMessages = function () {
//           const hiddenMessages = document.getElementsByTagName('hiddenmessage');
//           Array.from(hiddenMessages).forEach(message => {
//             const parentMessage = message.closest('.justwidget--message.justwidget--message_asst');
//             if (parentMessage) {
//               (parentMessage as HTMLElement).style.display = 'none';
//             }
//           });
//         };
//       }
//     }
//
//     // Создаем MutationObserver только если он еще не создан
//     const observer = new MutationObserver(mutationsList => {
//       for (const mutation of mutationsList) {
//         if (mutation.type === 'childList') {
//           const element = document.querySelector('.justwidget--asst') as HTMLDivElement;
//           if (element) {
//             element.click(); // Выполняем клик
//             addExtensionMethods();
//             observer.disconnect(); // Отключаем наблюдатель после клика
//           }
//
//           const button = document.querySelector('.justwidget--headline--buttons');
//           if (button) {
//             button.addEventListener('click', onClose);
//             // Отключаем обработчик при вызове
//             return () => {
//               button.removeEventListener('click', onClose);
//             };
//           }
//         }
//       }
//     });
//
//     // Начинаем наблюдение за изменениями в DOM
//     if (widgetContainer) {
//       observer.observe(widgetContainer, {
//         childList: true, // Следим за добавлением/удалением дочерних элементов
//         subtree: true, // Следим за изменениями во всех вложенных элементах
//       });
//     }
//
//     // Очистка при размонтировании
//     return () => {
//       observer.disconnect(); // Отключаем наблюдатель
//       if (widgetContainer) {
//         const script = widgetContainer.querySelector('script[src*="rpabot-prodjai.x5.ru"]');
//         if (script) {
//           widgetContainer.removeChild(script); // Удаляем скрипт из контейнера
//         }
//       }
//       if (window.JustWidget) {
//         delete window.JustWidget.hideMessages; // Удаляем метод из глобального объекта
//       }
//     };
//   }, [onClose]);
//
//   return <div id="widgetContainer" />;
// });
//
// // Добавляем типы для глобального объекта
// declare global {
//   interface Window {
//     JustWidget?: {
//       hideMessages?: () => void;
//       [key: string]: any;
//     };
//   }
// }




// import { memo, useLayoutEffect, useRef } from 'react';
//
// type WidgetContainerProps = {
//   onClose: () => void;
// };
//
// const SCRIPT_URL = 'https://rpabot-prodjai.x5.ru/embed/embed.js?id=eYpBILCE:c15a24fbd12fcabaca6bd962ef625fd4d8cfc0af';
//
// export const WidgetContainer = ({ onClose }: WidgetContainerProps) => {
//   const widgetContainerRef = useRef<HTMLDivElement | null>(null);
//   const scriptRef = useRef<HTMLScriptElement | null>(null);
//   const observerRef = useRef<MutationObserver | null>(null);
//
//   // Функция для добавления методов расширения
//   const addExtensionMethods = () => {
//     if (window.JustWidget) {
//       window.JustWidget.hideMessages = () => {
//         const hiddenMessages = document.getElementsByTagName('hiddenmessage');
//         Array.from(hiddenMessages).forEach(message => {
//           const parentMessage = message.closest('.justwidget--message.justwidget--message_asst');
//           if (parentMessage) {
//             (parentMessage as HTMLElement).style.display = 'none';
//           }
//         });
//       };
//     }
//   };
//
//   // Создание и добавление скрипта
//   const createAndAppendScript = () => {
//     // Проверяем, существует ли уже скрипт
//     const existingScript = document.querySelector(`script[src="${SCRIPT_URL}"]`);
//     if (existingScript) {
//       console.log('удаляем скрипт из Dom');
//       existingScript.remove();
//     }
//
//     const script = document.createElement('script');
//     script.src = SCRIPT_URL;
//     script.async = true;
//     scriptRef.current = script;
//
//     if (widgetContainerRef.current) {
//       widgetContainerRef.current.appendChild(script);
//     }
//   };
//
//   // Настройка MutationObserver
//   const setupObserver = () => {
//     observerRef.current = new MutationObserver(mutationsList => {
//       for (const mutation of mutationsList) {
//         if (mutation.type === 'childList') {
//           const element = document.querySelector('.justwidget--asst') as HTMLDivElement;
//           if (element) {
//             element.click();
//             addExtensionMethods();
//             observerRef.current?.disconnect();
//           }
//
//           const button = document.querySelector('.justwidget--headline--buttons');
//           if (button) {
//             button.addEventListener('click', onClose);
//           }
//         }
//       }
//     });
//
//     if (widgetContainerRef.current && observerRef.current) {
//       observerRef.current.observe(widgetContainerRef.current, {
//         childList: true,
//         subtree: true,
//       });
//     }
//   };
//
//   useLayoutEffect(() => {
//     // Инициализация
//     createAndAppendScript();
//     setupObserver();
//
//     // Очистка при размонтировании
//     return () => {
//       // Отключаем observer
//       observerRef.current?.disconnect();
//
//       // Удаляем обработчик клика с кнопки
//       const button = document.querySelector('.justwidget--headline--buttons');
//       if (button) {
//         button.removeEventListener('click', onClose);
//       }
//
//       // Удаляем скрипт
//       if (scriptRef.current && scriptRef.current.parentNode) {
//         scriptRef.current.parentNode.removeChild(scriptRef.current);
//       }
//
//       // Очищаем методы из глобального объекта
//       if (window.JustWidget) {
//         delete window.JustWidget.hideMessages;
//       }
//     };
//   }, [onClose]);
//
//   return <div id="widgetContainer" />;
// };
//
// // Добавляем типы для глобального объекта
// declare global {
//   interface Window {
//     JustWidget?: {
//       hideMessages?: () => void;
//       [key: string]: any;
//     };
//   }
// }