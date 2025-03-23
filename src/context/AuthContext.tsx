import { createContext, ReactNode, useEffect, useState } from "react";
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

import inMemoryJWT from "@/utils/services/inMemoryJWT";
import showErrorMessage from "@/utils/services/showErrorMessage";
import { FullScreenLoader } from "@/components/shared/FullScreenLoader";
import { useRouter, Router } from "next/router";

import { observer } from "mobx-react-lite";
import { userInfoStore } from "@/store/userInfoStore";

const oauthNow = (authMethod: 'local' | 'google') => {
  localStorage.setItem('isAuthNow', '1'); // Необходимо для открытия меню после авторизации
  localStorage.setItem('lastAuthMethod', authMethod);
};

type ContextProps = {
  handleLogOut: () => void;
  handleSignUp: (data: { login: string; password: string; name: string; }) => Promise<void>;
  handleSignIn: (data: { login: string; password: string }) => Promise<void>;
  handleGoogleSign: (data: { token: string; }) => Promise<void>;
  isUserLogged: boolean;
  isAppReady: boolean;
}

export const AuthContext = createContext<ContextProps>({
  handleLogOut: () => {},
  handleSignUp: async () => {},
  handleSignIn: async () => {},
  handleGoogleSign: async () => {},
  isUserLogged: false,
  isAppReady: false,
});

const resourceClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

resourceClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = inMemoryJWT.getToken();

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export const fetcher = (url: string, params?: Record<string, any>) => resourceClient.get(url, { params }).then(res => res.data);
export const poster = (url: string, data: any) => resourceClient.post(url, data).then(res => res.data);

export const instanceAxios: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // запросы, отправляемые с помощью этого экземпляра Axios, будут отправлять куки (cookies) при кросс-доменных запросах.
});

const AuthProvider = observer(({children}: {children: ReactNode}) => {
  const [isAppReady, setIsAppReady] = useState(false); // отвечает за готовность приложения к работе
  const [isUserLogged, setIsUserLogged] = useState(false); // является ли пользователь авторизованным
  const [isRefreshing, setIsRefreshing] = useState(false);
  const router = useRouter();

  const { userInfo } = userInfoStore;
  console.log('render');

  const handleLogOut = () => {
    instanceAxios.post('/auth/logout')
      .then(() => {
        inMemoryJWT.deleteToken();
        setIsUserLogged(false);

        router.push("/");
      })
      .catch(showErrorMessage);
  };

  const handleSignUp = async (data: { login: string; password: string; name: string; }) => {
    await instanceAxios.post('/auth/sign-up', data)
      .then(res => {
        const { accessToken, accessTokenExpiration } = res.data;

        inMemoryJWT.setToken(accessToken, accessTokenExpiration);
        oauthNow('local');

        setIsUserLogged(true);
        router.push("/");
      })
      .catch(error => showErrorMessage(error));
  };

  const handleSignIn = async (data: { login: string; password: string }) => {
    await instanceAxios.post('/auth/sign-in', data).then(res => {
      const { accessToken, accessTokenExpiration } = res.data;

      inMemoryJWT.setToken(accessToken, accessTokenExpiration);
      oauthNow('local');
      setIsUserLogged(true);

      router.push("/");
    })
    .catch(showErrorMessage);
  };

  const handleGoogleSign = async (data: { token: string }) => {
    setIsAppReady(false);
    await instanceAxios.post('/auth/gmail-login', data).then(res => {
      const { accessToken, accessTokenExpiration } = res.data;

      inMemoryJWT.setToken(accessToken, accessTokenExpiration);
      oauthNow('google');
      setIsUserLogged(true);

      router.push("/")
    })
    .catch(showErrorMessage)
    .finally(() => setIsAppReady(true));
  }

  useEffect(() => {
    // функция для получения информации о пользователе
    const fetchUserInfo = async () => {
      try {
        const data = await fetcher('user-info');
        userInfoStore.setUserInfoStore(data);
      } catch (error) {
        showErrorMessage(error);
      } finally {
        setIsAppReady(true); // для лоадера
      }
    };

    // Если пользователь вышел, обнуляем информацию о нем в памяти приложения
    if (!isUserLogged && userInfo) {
      userInfoStore.setUserInfoStore(null);
    }

    // Если пользователь авторизован, пытаемся получить информацию о нем
    if (isUserLogged && !userInfo) {
      setIsAppReady(false); // для лоадера
      fetchUserInfo();
    }
  }, [isUserLogged, userInfo]);
  //@FIXME проверить баг при запросе на изменение userInfo (edit-запросы в профиле) дублируется ли запрос fetchUserInfo

  useEffect(() => {
    const handleStart = () => setIsAppReady(false);
    const handleComplete = () => setIsAppReady(true);

    Router.events.on('routeChangeStart', handleStart);
    Router.events.on('routeChangeComplete', handleComplete);
    Router.events.on('routeChangeError', handleComplete);

    // Очистка подписок при размонтировании компонента
    return () => {
      Router.events.off('routeChangeStart', handleStart);
      Router.events.off('routeChangeComplete', handleComplete);
      Router.events.off('routeChangeError', handleComplete);
    };
  }, []);

  useEffect(() => {
    const refreshAuthToken = async () => {
      if (isRefreshing) return; // Если уже выполняется запрос на обновление, выходим

      setIsRefreshing(true); // Устанавливаем флаг, что запрос на обновление начат
      try {
        const res = await instanceAxios.post('auth/refresh');
        const { accessToken, accessTokenExpiration } = res.data;
        inMemoryJWT.setToken(accessToken, accessTokenExpiration);
        setIsUserLogged(true);
      } catch (error) {
        setIsUserLogged(false);
      } finally {
        setIsAppReady(true);
        setIsRefreshing(false); // Сбрасываем флаг после завершения
      }
    };

    refreshAuthToken();
  }, []);

  useEffect(() => {
    const handlePersistedLogout = (event: StorageEvent) => {
      if (event.key === process.env.NEXT_PUBLIC_LOGOUT_STORAGE_KEY) {
        inMemoryJWT.deleteToken();
        setIsUserLogged(false);
      }
    };

    // Добавляем обработчик события storage к объекту window. Это означает, что каждый раз, когда происходит событие storage
    // события storage это когда происходит изменение в localStorage или sessionStorage в одном из открытых вкладок или окон браузера. Это событие позволяет различным вкладкам или окнам взаимодействовать друг с другом, когда они используют одно и то же хранилище.
    window.addEventListener("storage", handlePersistedLogout);
    return () => window.removeEventListener("storage", handlePersistedLogout);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        handleLogOut,
        handleSignUp,
        handleSignIn,
        handleGoogleSign,
        isUserLogged,
        isAppReady
      }}
    >
      {isAppReady
        ? children
        : <FullScreenLoader />
      }
    </AuthContext.Provider>
  );
});

export default AuthProvider;