'use client'

import { useState, useEffect } from 'react';
import { Stack, Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton, useToast } from "@chakra-ui/react";
import { motion } from "framer-motion";
import InputFieldAtom from "../atoms/InputFieldAtom";
import SubmitButton from "../atoms/SubmitButtonAtom";
import RememberMeSwitch from "./RememberMeSwitchMolecule";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import { AiOutlineUser } from 'react-icons/ai';
import { signInWithEmailAndPassword } from '../../lib/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setAuthenticatedUser, setIsLoading } from '../../store/slices/registerSlice'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setNewAuthenticatedUser } from '../../store/slices/registerSlice';


interface LoginFormProps {
  name: string;
  email: string;
  password: string;
  rememberMe: boolean;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setRememberMe: (rememberMe: boolean) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleClick?: () => void;
  loading: boolean;
  isRegistering?: boolean;
}

const MotionAlert = motion(Alert)

const LoginForm: React.FC<LoginFormProps> = ({
  name,
  email,
  password,
  rememberMe,
  setName,
  setEmail,
  setPassword,
  setRememberMe,
  handleClick,
  loading,
  isRegistering
}) => {
  const [error, setError] = useState<string | null>(null);
  const [showError, setShowError] = useState<boolean>(false);
  const dispatch = useDispatch();
  const auth = getAuth();
  const toast = useToast();

  const { isLoading } = useSelector((state: RootState) => ({
    isLoading: state.register.isLoading
  }));

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setIsLoading(true))
    // ATUAL
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      dispatch(setAuthenticatedUser(true));
      dispatch(setIsLoading(false))
    } catch (error: unknown) {
      if (error instanceof Error) {
        const errorString = error.toString()
        const invalidCredential = (/\(auth\/invalid-credential\)/).test(errorString) ? 'E-mail ou senha inválidos' : 'Ops, credencias inválidas ou erro ao tentar fazer login';    
      toast({
        title: `Aviso: ${invalidCredential}`,
        description: "Tente novamente.",
        status: "info",
        duration: 4000,
        isClosable: true,
      })
      }
      
    } finally {
      dispatch(setIsLoading(false))
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Cria o usuário com o Firebase Auth
      dispatch(setIsLoading(true))
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      dispatch(setNewAuthenticatedUser(true))
      dispatch(setIsLoading(false))
      if (userCredential.user) {
        // Atualiza o perfil do usuário com o nome
        await updateProfile(userCredential.user, {
          displayName: name,
        });
      }

    } catch (error: unknown) {
      // Verificar se error é um objeto e possui a propriedade message
      if (error instanceof Error) {
        const errorText = error.message || '';
        // Usar expressão regular para extrair a mensagem de erro
        const match = errorText.match(/Firebase: (.+?) \(/);
        // evite usar let, deve ser revisado isso
        let errorMessage = match ? match[1] : 'An error occurred during registration.';
        if (errorMessage == 'Password should be at least 6 characters') {
          errorMessage = 'Senha deve ter pelo menos 6 caracteres'
        }
        if (errorMessage == 'Error') {
          errorMessage = 'E-mail já cadastrado ou erro durante o registro'
        }
        toast({
          title: `Aviso: ${errorMessage}`,
          description: "",
          status: "info",
          duration: 4000,
          isClosable: true,
        })
      } else {
        toast({
          title: "Um erro desconhecido ocorreu durante o registro.",
          description: "Tente novamente.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    } finally {
      dispatch(setIsLoading(false))
    }
    {/** Pq uso o finally? Pq ele é executado após o bloco try e catch, independentemente de um erro ter ocorrido ou não. É ideal para código que deve sempre ser executado, como a limpeza de recursos ou, neste caso, a atualização do estado de carregamento. */ }
  };

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => setShowError(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showError]);

  return (
          <form onSubmit={isRegistering ? handleRegister : handleLogin}>
            <Stack spacing={4}>
              {error && showError && (
                <MotionAlert
                  status="error"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <AlertIcon />
                  <AlertTitle mr={2}>Erro!</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                  <CloseButton position="absolute" right="8px" top="8px" onClick={() => setShowError(false)} />
                </MotionAlert>
              )}
              {isRegistering && <InputFieldAtom id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" color='#E9EDC9' leftIcon={<AiOutlineUser color="gray.300" />} />}
              <InputFieldAtom id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Seu email" color='#E9EDC9' leftIcon={<EmailIcon color="gray.300" />} />
              <InputFieldAtom id="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" color='#E9EDC9' leftIcon={<LockIcon color="gray.300" />} />
              <RememberMeSwitch isChecked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} color='#E9EDC9' />
              <SubmitButton isLoading={loading} onClick={handleClick || (() => { })} buttonText={isRegistering ? "Inscrever-se" : "Entrar"} />
            </Stack>
          </form>
  );
};

export default LoginForm;
