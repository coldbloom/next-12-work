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

  className?: string;
  style?: CSSProperties;
};

export const ModalPageWindow = ({
  children,
  isOpen,
  onClose,
  exitActiveFast = false,
  className,
  style = {}
}: ModalPageWindowProps) => {
  const container = usePortalContainer('modal-window');

  useEffect(() => {
    if (document) {
      document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    }
  }, [isOpen]);

  return (
    container &&
    createPortal(
      <>
        {isOpen && <div className={s.backdrop} onClick={onClose ?? onClose} />}
        <CSSTransition
          in={isOpen}
          timeout={300}
          unmountOnExit
          classNames={{
            enter: s['slide-in-enter'],
            enterActive: s['slide-in-enter-active'],
            exit: s['slide-out'],
            exitActive: exitActiveFast ? s['side-out-active-fast'] : s['slide-out-active'],
          }}
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