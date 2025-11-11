import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
  className?: string;
  text: string;
}

export const ErrorText: React.FC<Props> = ({ className, text }) => {
  return (
    <p className={cn('text-red-500 text-sm mt-2', className)}>{text}</p>
  );
};
