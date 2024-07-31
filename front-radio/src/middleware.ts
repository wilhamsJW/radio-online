// middleware.ts (ou middleware.js se você não estiver usando TypeScript)
import { NextResponse, NextRequest } from 'next/server';
import { auth } from '@/lib/firebase';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Verifique se a página requer autenticação
  if (pathname.startsWith('/radi')) {
    // Obtenha o usuário autenticado
    const user = auth.currentUser;

    // Se não houver um usuário autenticado, redirecione para a página inicial
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/radi/:path*'], // Protege as rotas que precisam de autenticação
};
