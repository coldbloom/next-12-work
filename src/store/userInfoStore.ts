import { makeAutoObservable, action } from 'mobx';

type UserInfo = {
  id: number;
  login: string;
  name: string;
  phone: null | string;
  birthDate: null | string;
  avatarPath: null | string;
};

class UserInfoStore {
  userInfo: UserInfo | null = null;

  constructor() {
    makeAutoObservable(this, {
      updateUserInfo: action.bound // автоматически привязывает контекст
    });
  };

  setUserInfoStore(userInfo: UserInfo | null): void {
    this.userInfo = userInfo;
  };

  /**
   * Обновляет конкретное поле userInfo со строгой типизацией.
   * @param key Ключ поля для обновления.
   * @param value Новое значение поля.
   */
  updateUserInfo<K extends keyof UserInfo>(key: K, value: UserInfo[K]): void {
    if (this.userInfo) {
      this.userInfo[key] = value;
    } else {
      console.warn(`Cannot update ${key}: userInfo is null`);
    }
  }
}

// именованный импорт
export const userInfoStore = new UserInfoStore();