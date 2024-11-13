// import React, { useEffect } from 'react';
// import { MainForm } from "@/components/shared/MainForm";
// import * as VKID from '@vkid/sdk';
// import { useRouter } from 'next/router';
//
// const FindJob = () => {
//   const router = useRouter();
//
//   useEffect(() => {
//     // Инициализируем VK ID только на клиенте
//     if (typeof window !== 'undefined') {
//       try {
//         // Инициализация конфига
//         VKID.Config.init({
//           app: 52663570,
//           redirectUrl: 'http://localhost:80',
//           state: 'dj29fnsadjsd82',
//           codeVerifier: 'FGH767Gd65',
//           scope: 'email phone',
//         });
//
//         // Создание экземпляра кнопки
//         const oneTap = new VKID.OneTap();
//
//         // Получение контейнера
//         const container = document.getElementById('VkIdSdkOneTap');
//
//         if (container) {
//           // Отрисовка кнопки
//           oneTap.render({
//             container: container,
//             scheme: VKID.Scheme.LIGHT,
//             lang: VKID.Languages.RUS,
//             callbacks: {
//               onAuth: handleAuth,
//               onError: handleError
//             }
//           });
//         }
//       } catch (error) {
//         console.error('VK ID initialization error:', error);
//       }
//     }
//
//     // Очистка при размонтировании
//     return () => {
//       const container = document.getElementById('VkIdSdkOneTap');
//       if (container) {
//         container.innerHTML = '';
//       }
//     };
//   }, []);
//
//   // Обработчик успешной авторизации
//   const handleAuth = async (payload: any) => {
//     try {
//       console.log('Auth successful:', payload);
//
//       // Отправляем данные на бэкенд
//       const response = await fetch('/api/auth/vk-callback', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ payload }),
//       });
//
//       const data = await response.json();
//
//       if (data.success) {
//         router.push('/dashboard'); // Редирект после успешной авторизации
//       }
//     } catch (error) {
//       console.error('Auth error:', error);
//     }
//   };
//
//   // Обработчик ошибок
//   const handleError = (error: any) => {
//     console.error('VK ID error:', error);
//   };
//
//   return (
//     <div className="find-job-container">
//       <h1>Найти работу</h1>
//       <MainForm />
//       <div id="VkIdSdkOneTap" className="vk-auth-button" />
//     </div>
//   );
// };
//
// export default FindJob;

import React, { useEffect } from 'react';
import { MainForm } from "@/components/shared/MainForm";
import * as VKID from '@vkid/sdk';
import { useRouter } from 'next/router';

const FindJob = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        // Инициализация конфига
        VKID.Config.init({
          app: 52663570,
          redirectUrl: 'http://localhost:80/',
          state: 'dj29fnsadjsd82',
          codeVerifier: 'FGH767Gd65',
          scope: 'email phone',
        });

        const oneTap = new VKID.OneTap();
        const container = document.getElementById('VkIdSdkOneTap');

        if (container) {
          oneTap.render({
            container: container,
            scheme: VKID.Scheme.LIGHT,
            lang: VKID.Languages.RUS,
            callbacks: {
              onAuth: handleAuth,
              onError: handleError,
              onClose: () => console.log('VK Auth widget closed'),
              onOpen: () => console.log('VK Auth widget opened'),
              onDestroy: () => console.log('VK Auth widget destroyed')
            }
          });

          // Добавляем слушатель для отладки
          window.addEventListener('message', (event) => {
            if (event.data.type && event.data.type.startsWith('vk-connect')) {
              console.log('VK Connect event:', event.data);
            }
          });
        }
      } catch (error) {
        console.error('VK ID initialization error:', error);
      }
    }

    return () => {
      const container = document.getElementById('VkIdSdkOneTap');
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  const handleAuth = async (payload: any) => {
    try {
      console.log('Auth payload received:', payload);

      // Проверяем структуру payload
      if (!payload || !payload.token) {
        console.error('Invalid payload structure:', payload);
        return;
      }

      const response = await fetch('/api/auth/vk-callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include', // Важно для работы с куками
        body: JSON.stringify({
          payload,
          timestamp: Date.now()
        }),
      });

      console.log('Server response status:', response.status);
      const data = await response.json();
      console.log('Server response data:', data);

      if (data.success) {
        router.push('/dashboard');
      } else {
        throw new Error(data.error || 'Authentication failed');
      }
    } catch (error) {
      console.error('Auth error details:', error);
    }
  };

  const handleError = (error: any) => {
    console.error('VK ID error details:', {
      message: error.message,
      code: error.code,
      type: error.type
    });
  };

  return (
    <div className="find-job-container">
      <h1>Найти работу</h1>
      <MainForm />
      <div
        id="VkIdSdkOneTap"
        className="vk-auth-button"
        style={{ minHeight: '50px', margin: '20px 0' }}
      />
    </div>
  );
};

export default FindJob;