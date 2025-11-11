import React from 'react';
import { RequiredSymbol } from '../required-symbol';
import { Input } from '@/components/ui';
import { ErrorText } from '../error-text';
import { ClearButton } from '../clear-button';
import { useFormContext } from 'react-hook-form';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormInput: React.FC<Props> = ({ className, label, required, name, ...props }) => {
  const {
        register,
        formState: { errors },
        watch,
        setValue
      } = useFormContext(); 
  
      const value = watch(name);
      const error = errors[name]?.message as string;
  return (
    <div className={className}>
        {label && (
            <p className='font-medium mb-2'>{label} {required && <RequiredSymbol/>}</p>
        )}

        <div className='relative'>
            <Input className='h-12 text-md pr-10' {...register(name)} {...props} />
            
            {value && (
                <ClearButton onClick={() => setValue(name, '', { shouldValidate: true })} />
            )}
            

        </div>

        {error && (
            <ErrorText text={error} />
        )}
      
    </div>
  );
};
