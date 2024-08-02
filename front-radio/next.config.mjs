/** @type {import('next').NextConfig} */
const nextConfig = {
  productionSourceMaps: true, // Gera arquivos de mapa de origem em produção
  reactStrictMode: true, // Ativa o modo estrito do React
  swcMinify: true, // Ativa a minificação com SWC
};

export default nextConfig;
