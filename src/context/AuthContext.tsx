import { createContext, ReactNode, useEffect, useState } from "react";
import axios, {AxiosInstance, InternalAxiosRequestConfig} from "axios";

import inMemoryJWT from "@/utils/services/inMemoryJWT";
import showErrorMessage from "@/utils/services/showErrorMessage";
import { Loader } from "@/components/kit/Loader";
import { useRouter, Router } from "next/router";
import useSWR from "swr";

const fetcher = (url: string) => resourceClient.get(url).then(res => res.data);
const oauthNow = (authMethod: 'local' | 'google') => {
  localStorage.setItem('isAuthNow', '1'); // Необходимо для открытия меню после авторизации
  localStorage.setItem('lastAuthMethod', authMethod);
};

type UserInfo = {
  id: number;
  login: string;
  name: string;
  phone: null | string;
}

type ContextProps = {
  data: string | null; // Заменить на тип данных, который вы ожидаете хранить в контексте
  userInfo: UserInfo | null;
  handleFetchProtected: () => void;
  handleLogOut: () => void;
  handleSignUp: (data: { login: string; password: string; name: string; }) => Promise<void>;
  handleSignIn: (data: { login: string; password: string }) => Promise<void>;
  handleGoogleSign: (data: { token: string; }) => Promise<void>;
  isUserLogged: boolean;
  isAppReady: boolean;
}

export const AuthContext = createContext<ContextProps>({
  data: null,
  userInfo: null,
  handleFetchProtected: () => {},
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

export const instanceAxios: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // запросы, отправляемые с помощью этого экземпляра Axios, будут отправлять куки (cookies) при кросс-доменных запросах.
});

const AuthProvider = ({children}: {children: ReactNode}) => {
  const [isAppReady, setIsAppReady] = useState(false); // отвечает за готовность приложения к работе
  const [isUserLogged, setIsUserLogged] = useState(false); // является ли пользователь авторизованным
  const [data, setData] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const router = useRouter();
  console.log('render');

  const handleFetchProtected = () => {
    resourceClient.get("/resource/protected")
      .then(res => setData(res.data))
      .catch(showErrorMessage);
  };

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
    await instanceAxios.post('/auth/gmail-login', data).then(res => {
      const { accessToken, accessTokenExpiration } = res.data;

      inMemoryJWT.setToken(accessToken, accessTokenExpiration);
      oauthNow('google');
      setIsUserLogged(true);

      router.push("/")
    })
    .catch(showErrorMessage);
  }

  useEffect(() => {
    // функция для получения информации о пользователе
    const fetchUserInfo = async () => {
      try {
        const data = await fetcher('user-info');
        setUserInfo(data);
      } catch (error) {
        showErrorMessage(error);
      } finally {
        setIsAppReady(true); // для лоадера
      }
    };

    // Если пользователь вышел, обнуляем информацию о нем в памяти приложения
    if (!isUserLogged && userInfo) {
      setUserInfo(null);
    }

    // Если пользователь авторизован, пытаемся получить информацию о нем
    if (isUserLogged && !userInfo) {
      setIsAppReady(false); // для лоадера
      fetchUserInfo();
    }
  }, [isUserLogged, userInfo]);

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

    window.addEventListener("storage", handlePersistedLogout);
    return () => window.removeEventListener("storage", handlePersistedLogout);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        data,
        userInfo,
        handleFetchProtected,
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
        : <Loader style={{ marginLeft: '50%', marginTop: '100%', transform: 'translate(-50%, -50%)'}} />
      }
    </AuthContext.Provider>
  );
};

export default AuthProvider;