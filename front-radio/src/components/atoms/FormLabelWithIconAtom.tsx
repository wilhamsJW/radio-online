import { FormControl, FormLabel, Switch } from "@chakra-ui/react";
import { useSelector } from 'react-redux';

interface FormLabelWithIconProps {
  isChecked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isRegistering: boolean;
  color?: string
}

interface FormLabelWithIconContainerProps {
  isChecked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  color?: string
}

const FormLabelWithIcon: React.FC<FormLabelWithIconProps> = ({ isChecked, onChange, isRegistering, color }) => (
  <>
    {!isRegistering && <FormControl display="flex" alignItems="center" mt={4}>
      <Switch
        id="remember-me"
        isChecked={isChecked}
        colorScheme="teal"
        onChange={onChange}
      />
      <FormLabel htmlFor="remember-me" fontSize="sm" ml={3} mb="1" color={color}>
        Lembrar de mim
      </FormLabel>
    </FormControl>}
  </>

);

const FormLabelWithIconContainer: React.FC<FormLabelWithIconContainerProps> = ({ isChecked, onChange, color }) => {
  const isRegistering = useSelector((state: any) => state.register.isRegistering);
  
  return <FormLabelWithIcon isChecked={isChecked} onChange={onChange} isRegistering={isRegistering} color={color} />; 
}
export default FormLabelWithIconContainer;