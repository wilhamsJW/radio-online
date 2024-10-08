'use cliente'

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setRegistering } from '../../store/slices/registerSlice';
import { useRouter } from 'next/navigation';
import { setNewAuthenticatedUser, setAuthenticatedUser } from '../../store/slices/registerSlice';
import { Action } from 'redux';
import { Heading, Divider, Spinner, useDisclosure } from '@chakra-ui/react';
import SocialLoginButtons from '../molecules/SocialLoginButtonsMolecule'
import HeadingAtom from '../atoms/HeadingAtom'
import MotionMolecule from '../molecules/MotionMolecule'
import LoginForm from '../molecules/LoginFormMolecule'
import ModalMolecule from '../molecules/ModalMolecule'

type AuthenticatedUserType = (payload: boolean) => Action;
type NewAuthenticatedType = (payload: boolean) => Action;

export default function LoginBox() {

  const dispatch = useDispatch();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { isAuthenticated, isRegistering, isNewAuthenticated, isLoading } = useSelector((state: RootState) => ({
    isAuthenticated: state.register.isAuthenticated,
    isRegistering: state.register.isRegistering,
    isNewAuthenticated: state.register.isNewAuthenticated,
    isLoading: state.register.isLoading
  }));

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  //Redirect após login
  useEffect(() => {
    if (isAuthenticated) {
      handleAuthentication(setAuthenticatedUser, setNewAuthenticatedUser);
    }
  }, [isAuthenticated, router, dispatch]);

  // Redirect dinâmico para login e cadastro com Redux
  const handleAuthentication = (
    setAuthenticatedUser: AuthenticatedUserType,
    setNewAuthenticatedUser: NewAuthenticatedType
  ) => {
    router.push('/radio-browser');
    dispatch(setAuthenticatedUser(false));
    dispatch(setNewAuthenticatedUser(false));
  };

  //Redirect após cadastro
  useEffect(() => {
    if (isNewAuthenticated) {
      handleAuthentication(setAuthenticatedUser, setNewAuthenticatedUser);
    }
  }, [isNewAuthenticated, router, dispatch]);

  const resetFields = () => {
    setName('');
    setEmail('');
    setPassword('');
    setRememberMe(false);
  };

  const handleRegisterClick = () => {
    dispatch(setRegistering(!isRegistering));
    resetFields();
  };

  return (
    <>
      <Heading as="h2" size="xl" mb={6} textAlign="center" color="#FFFFFF">
        {isRegistering ? 'Cadastro' : 'Login'}
      </Heading>
      {!isRegistering && <SocialLoginButtons />}
      <Divider borderColor="gray.400" my={7} />
      {!isRegistering && <><HeadingAtom mt="1" size="md" textAlign="center" color="#FFFFFF">
          <MotionMolecule>
            <Heading
              as="span"
              size="md"
              color="#FFFFFF"
              textDecoration="none"
            >
              Não tem uma conta?{' '}
            </Heading><br />
            <Heading
              as="span"
              size="md"
              color="#FFFFFF"
              textDecoration="underline"
              cursor="pointer"
              onClick={handleRegisterClick}
            >
              Inscrever-se
            </Heading>
          </MotionMolecule>
        </HeadingAtom>
        <Divider borderColor="gray.400" my={7} /></>}
      {!isLoading ? (
        <LoginForm
          name={name}
          email={email}
          password={password}
          rememberMe={rememberMe}
          setName={setName}
          setEmail={setEmail}
          setPassword={setPassword}
          setRememberMe={setRememberMe}
          handleSubmit={handleSubmit}
          loading={loading}
          isRegistering={isRegistering}
        />
      ) : (
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
      )}
      {!isRegistering && (
        <HeadingAtom
          onClick={onOpen}
          mt="4"
          text="Esqueceu sua senha?"
          size="xs"
          textAlign="center"
          color="teal.100"
          textDecoration="underline"
          cursor="pointer"
        />
      )}
      {!isRegistering && <Divider borderColor="gray.400" />}
      {isRegistering && (
        <HeadingAtom mt="10" size="md" textAlign="center" color="#FFFFFF">
          <MotionMolecule>
            <Heading
              as="span"
              size="md"
              color="#FFFFFF"
              textDecoration="none"
              cursor="pointer"
              onClick={handleRegisterClick}
            >
              Voltar ao Login
            </Heading>
          </MotionMolecule>
        </HeadingAtom>
      )}
      <ModalMolecule isOpen={isOpen} onClose={onClose} />
    </>

  )
}