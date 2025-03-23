import { PropsWithChildren, FC } from "react";

import cn from "classnames";
import s from './LayoutContainer.module.scss';

type LayoutContainerProps = {
  className?: string;
} & PropsWithChildren;

export const LayoutContainer: FC<LayoutContainerProps> = ({ children, className }) => {
  return (
    <div className={cn(s.container, className)}>
      {children}
    </div>
  );
};