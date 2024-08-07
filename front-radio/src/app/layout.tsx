import { Inter } from 'next/font/google';
import './globals.css';
import ChakraProviderWrapper from './chakra-provider';
import ClientProviderRedux from './reduxProvider/reduxProvider';
import ClientQueryProvider from './clientQueryProvider/ClientQueryProvider'
import { metadata } from './metadata';

/**
 * O Next.js 14 ou versão recente não aceita o Provider do Redux diretamente envolvendo
 * outros Providers, há um conflito de ambiente de Server e Client do Next.js. O Redux precisa
 * ser rodado dentro do ambiente Client e esse componente Layout apenas no Server.
 * Para combater esse erro eu criei um provider externo que roda do lado do cliente
 * e apenas chamo ele aqui quando já rodou do lado do cliente e assim consigo rodar ambos
 * sem erros.
 */

const inter = Inter({ subsets: ['latin'] });

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({children }:LayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta
          name="description"
          content={typeof metadata.description === 'string' ? metadata.description : 'Default description'}
        />
        <title>{typeof metadata.title === 'string' ? metadata.title : 'Default Title'}</title>
      </head>
      <body className={inter.className}>
        <ClientQueryProvider>
          <ChakraProviderWrapper>
            <ClientProviderRedux>
              {children}
            </ClientProviderRedux>
          </ChakraProviderWrapper>
        </ClientQueryProvider>
      </body>
    </html>
  );
}
