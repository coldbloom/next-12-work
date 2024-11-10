import React, {CSSProperties, ReactNode, useEffect} from 'react';
import { CSSTransition } from 'react-transition-group';
import { usePortalContainer } from '@/utils/hooks/usePortalContainer';
import { createPortal } from 'react-dom';

import cn from 'classnames';
import s from './ModalPageWindow.module.scss';

type ModalPageWindowProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose?: () => void;
  exitActiveFast?: boolean;
  slidePosition?: 'x' | 'y';

  className?: string;
  backdropClassName?: string;
  style?: CSSProperties;
};

export const ModalPageWindow = ({
  children,
  isOpen,
  onClose,
  exitActiveFast = false,
  slidePosition = 'y',
  className,
  backdropClassName,
  style = {}
}: ModalPageWindowProps) => {
  const container = usePortalContainer('modal-window');

  const transitionClasses = slidePosition === 'x'
    ? {
      enter: s['slide-in-enter-x'],
      enterActive: s['slide-in-enter-active-x'],
      exit: s['slide-out-x'],
      exitActive: exitActiveFast ? s['side-out-active-fast-x'] : s['slide-out-active-x']
    }
    : {
      enter: s['slide-in-enter'],
      enterActive: s['slide-in-enter-active'],
      exit: s['slide-out'],
      exitActive: exitActiveFast ? s['side-out-active-fast'] : s['slide-out-active']
    };

  useEffect(() => {
    const handleBodyOverflow = () => {
      document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    };

    handleBodyOverflow();

    return () => {
      document.body.style.overflow = 'auto'; // Reset on component unmount
    };
  }, [isOpen]);

  return (
    container &&
    createPortal(
      <>
        {isOpen && <div className={cn(s.backdrop, backdropClassName)} onClick={onClose ?? onClose} />}
        <CSSTransition
          in={isOpen}
          timeout={300}
          unmountOnExit
          classNames={transitionClasses}
        >
          <div className={cn(s.modal, className)} style={{ ...style }}>
            {children}
          </div>
        </CSSTransition>
      </>,
      container
    )
  );
};