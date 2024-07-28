'use client'

import React from 'react';
import { Heading } from '@chakra-ui/react';

interface CustomHeadingProps {
  text?: any;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
  color?: string;
  children?: React.ReactNode;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  textDecoration?: string;
  cursor?: string;
  mt?: string;
  pt?: string;
  pl?: string;
  title?: string;
  onClick?: () => void; // Adicionando a propriedade onClick
}

const HeadingAtom: React.FC<CustomHeadingProps> = ({ text, size = 'md', color = 'black', children, textAlign = 'left', textDecoration, cursor, mt, onClick, pt, pl, title }) => {
  return (
    <Heading as="h3" size={size} mb={4} color={color} textAlign={textAlign} textDecoration={textDecoration} cursor={cursor} mt={mt} onClick={onClick} pt={pt} pl={pl} title={title}>
      {text}
      {children}
    </Heading>
  );
};

export default HeadingAtom;
