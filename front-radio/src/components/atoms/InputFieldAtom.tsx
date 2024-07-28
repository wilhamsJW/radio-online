'use client'

import React from 'react';
import { FormControl, FormLabel, Input, InputGroup, InputLeftElement, InputRightElement, Icon } from '@chakra-ui/react';

interface InputFieldProps {
  id?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  borderColor?: string;
  _focus?: any;
  borderRadius?: string;
  color?: string
}

const InputField: React.FC<InputFieldProps> = ({ id, type, value, onChange, placeholder, leftIcon, rightIcon, borderColor, _focus, borderRadius, color }) => {
  const renderedLeftIcon = leftIcon ? (
    <InputLeftElement pointerEvents="none">
      {React.cloneElement(leftIcon, { color: 'gray.300' })}
    </InputLeftElement>
  ) : null;

  const renderedRightIcon = rightIcon ? (
    <InputRightElement>
      {React.cloneElement(rightIcon, { color: 'gray.300', cursor: 'pointer' })}
    </InputRightElement>
  ) : null;

  return (
    <FormControl id={id} isRequired={!!id}>
      {id && <FormLabel color={color}>{id.charAt(0).toUpperCase() + id.slice(1)}</FormLabel>}
      <InputGroup>
        {renderedLeftIcon}
        <Input
          type={type}
          value={value}
          onChange={onChange}
          focusBorderColor="teal.400"
          placeholder={placeholder}
          borderColor={borderColor}
          _focus={_focus}
          borderRadius={borderRadius}
          color={color}
        />
        {renderedRightIcon}
      </InputGroup>
    </FormControl>
  );
};

export default InputField;
