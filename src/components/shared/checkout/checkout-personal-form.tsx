import { FormInput } from '@/components/shared/form-components';
import React from 'react';
import { WhiteBlock } from '../white-block';


interface Props {
  className?: string;
}

export const CheckoutPersonalForm: React.FC<Props> = ({ className }) => {
    
  
    return (
    <WhiteBlock title="2. Personal details">
      <div className="grid grid-cols-2 gap-5">
        <FormInput placeholder="Name" className="text-base" name="firstName" />
        <FormInput
          placeholder="Last name"
          className="text-base"
          name="lastName"
        />
        <FormInput placeholder="E-Mail" className="text-base" name="email" />
        <FormInput placeholder="Phone" className="text-base" name="phone" />
      </div>
    </WhiteBlock>
  );
};
