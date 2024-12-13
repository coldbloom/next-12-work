import { makeAutoObservable } from "mobx";

class MenuStore {
  isOpen: boolean = false;

  constructor() {
    makeAutoObservable(this);
  };

  setOpenMenu(isOpenMenu: boolean): void {
    this.isOpen = isOpenMenu;
  };
}

// Именованный экспорт
export const menuStore = new MenuStore();