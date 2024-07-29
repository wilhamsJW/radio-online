'use client'

import { useState, useEffect } from 'react';
import { Stack, Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton } from "@chakra-ui/react";
import { motion } from "framer-motion";
import InputFieldAtom from "../atoms/InputFieldAtom";
import SubmitButton from "../atoms/SubmitButtonAtom";
import RememberMeSwitch from "./RememberMeSwitchMolecule";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import { AiOutlineUser } from 'react-icons/ai';
import { signInWithEmailAndPassword } from '../../lib/firebase';
import { useDispatch } from 'react-redux';
import { setAuthenticatedUser } from '../../store/slices/registerSlice'
import { getAuth, createUserWithEmailAndPassword, updateProfile  } from "firebase/auth";
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

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // ATUAL
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      dispatch(setAuthenticatedUser(true));
      console.log('userCredential no loginFormMolecule', userCredential);
    } catch (error) {
      console.error("Erro ao autenticar:", error);
      setError('Erro desconhecido'); 
      setShowError(true);
    }

    // if (!success) {
    //   setError(message || 'Erro desconhecido');
    //   setShowError(true);
    // }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Cria o usuário com o Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('userCredential cadastro', userCredential);
      dispatch(setNewAuthenticatedUser(true))
      console.log('name:', name);
      

      if (userCredential.user) {
        // Atualiza o perfil do usuário com o nome
        await updateProfile(userCredential.user, {
          displayName: name,
        });
      }

    } catch (error) {
      console.log('error register', error);
      //setError(error.message);
      //setShowError(true);
    }
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
        <RememberMeSwitch isChecked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} color='#E9EDC9'  />
        <SubmitButton isLoading={loading} onClick={handleClick || (() => {})} buttonText={isRegistering ? "Inscrever-se" : "Entrar"} />
      </Stack>
    </form>
  );
};

export default LoginForm;
