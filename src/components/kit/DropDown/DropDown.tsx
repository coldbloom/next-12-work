import React, { Children, cloneElement, ReactNode, RefCallback, ReactElement, useRef, useState, useEffect } from 'react';
import s from './DropDown.module.scss'

type DropDownProps = {
  anchor: (ref: RefCallback<HTMLElement>) => ReactElement;
  open?: boolean;
  onClose?: () => void;
  children: ReactNode;
}

export const DropDown = ({ anchor, open, onClose, children }: DropDownProps) => {
  const anchorRef = useRef<HTMLElement | null>(null);
  const [isOpen, setIsOpen] = useState(open || false);

  // Обработчик клика вне области и обновление состояния
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      console.log('закрывашка')
      if (anchorRef.current && !anchorRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        if (onClose) onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Обновление состояния `isOpen` при изменении пропса `open`
  useEffect(() => {
    setIsOpen(open || false);
  }, [open]);

  // Проверка дочерних элементов на соответствие DropDownItem
  const items = Children.toArray(children).filter(child => {
    return React.isValidElement<DropDownItemProps>(child) && child.type === DropDownItem;
  });

  return (
    <>
      {/* Якорный элемент */}
      {anchor((node) => {
        anchorRef.current = node;
      })}

      {/* Выпадающее меню */}
      {isOpen && anchorRef.current && (
        <div
          className={s.dropdownMenu}
        >
          {items.map(child => {
            const item = child as ReactElement<DropDownItemProps>;
            return cloneElement(item, {
              onClick: () => {
                item.props.onClick && item.props.onClick();
              }
            });
          })}
        </div>
      )}
    </>
  );
};

type DropDownItemProps = {
  children: ReactNode;
  key: string;
  onClick?: () => void;
};

export const DropDownItem = ({ children, onClick }: DropDownItemProps) => {
  return (
    <div className={s.item} onClick={onClick}>
      {children}
    </div>
  );
};

DropDown.Item = DropDownItem;


{/*{Children.map(children, (child, i) =>*/}
{/*  cloneElement(child as React.ReactElement<DropDownItemProps>, {*/}
{/*    ...(child as ReactElement<DropDownItemProps>).props,*/}
{/*    key: `dropdown-action-item-${i}`,*/}
{/*    onClick: () => console.log(i),*/}
{/*  })*/}
{/*)}*/}

