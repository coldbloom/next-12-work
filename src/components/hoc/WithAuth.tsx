import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from "@/context/AuthContext";

export const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  return (props: P) => {
    const { isUserLogged } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
      if (!isUserLogged) {
        router.replace('/auth/login');
      }
    }, [isUserLogged, router]);

    return isUserLogged ? <WrappedComponent {...props} /> : null; // Возвращаем null, пока идет перенаправление
  };
};