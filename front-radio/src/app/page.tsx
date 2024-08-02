'use client'

import LoginTemplate from '../components/templates/LoginTemplate'
import { useEffect } from 'react';

export default function LoginPage() {
  useEffect(() => {
    document.body.classList.add('login-page');
    return () => document.body.classList.remove('login-page');
  }, []);
  return <LoginTemplate />
}

