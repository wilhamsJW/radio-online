import { Divider as ChakraDivider, DividerProps } from '@chakra-ui/react';

const Divider: React.FC<DividerProps> = (props) => {
  return <ChakraDivider borderColor="gray.400" {...props} />;
};

export default Divider;
