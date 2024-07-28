// middleware.js
import { NextResponse } from 'next/server';
import { auth } from '@/lib/firebase';
import { NextRequest } from 'next/server';

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Roteie apenas as páginas que precisam de autenticação
  if (pathname.startsWith('/radio-browser')) {
    const user = await new Promise((resolve) => {
      auth.onAuthStateChanged((user) => resolve(user));
    });

    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/radio-browser/:path*'], // Protege as rotas que precisam de autenticação
};

