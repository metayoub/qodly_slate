import { forwardRef, PropsWithChildren, Ref, RefObject } from 'react';
import cn from 'classnames';

interface BaseProps {
  className: string;
  [key: string]: unknown;
}
type OrNull<T> = T | null;

const Button = forwardRef(
  (
    {
      className,
      active,
      reversed,
      ...props
    }: PropsWithChildren<
      {
        active: boolean;
        reversed: boolean;
      } & BaseProps
    >,
    ref: Ref<OrNull<HTMLSpanElement>>,
  ) => (
    <span
      {...props}
      ref={ref as RefObject<HTMLSpanElement>}
      className={cn(className, 'cursor-pointer text-xl w-8 h-8 flex items-center justify-left', {
        'text-gray-300': !active,
      })}
    />
  ),
);

// css`color: ${reversed ? (active ? 'white' : '#aaa') : active ? 'black' : '#ccc'};`

export default Button;
