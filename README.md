# Radio Browser Challenge

## Case

As pessoas estão com saudades de voltar nos tempos antigos e uma das melhores maneiras de solucionar esse problema é trazer a rádio de volta.
Sua tarefa para esse case será desenvolver uma aplicação que consuma uma API de rádio para que os usuários possam desfrutar e relembrar desse tempo, seguindo os requisitos propostos neste desafio.

# Radio Browser Challenge

## Introdução

Em um mundo cada vez mais digital, muitos de nós sentimos falta das antigas estações de rádio que acompanhavam nossos dias. Este projeto visa trazer de volta essa experiência, permitindo aos usuários explorar, adicionar e gerenciar suas rádios favoritas de maneira intuitiva e moderna. Desenvolvi uma aplicação que consome a API de rádio para oferecer uma experiência rica e escalável, utilizando as melhores práticas e tecnologias atuais.

## Tecnologias Utilizadas

- **Framework:** Next.js 14.2.5
- **Linguagem:** JavaScript (React)
- **Gerenciamento de Estado:** @reduxjs/toolkit, react-query
- **Estilização:** @chakra-ui/react, @emotion/react, @emotion/styled
- **Testes:** @testing-library/react
- **Autenticação:** Firebase
- **Outras Tecnologias:** framer-motion (para animações), react-icons

## Funcionalidades Implementadas

### Requisitos Obrigatórios

1. **Gerenciamento de Rádios:**
   - Adicionar rádios à lista de favoritos.
   - Visualizar lista de rádios adicionadas.
   - Remover rádios da lista de favoritos.
   - Editar informações da rádio selecionada.
   - Ouvir a rádio selecionada ao clicar em play.
   - Parar de ouvir a rádio ao clicar em stop.
   - Pesquisar rádios por nome, país ou idioma com paginação mostrando 10 rádios por vez.

2. **Persistência de Dados:**
   - Salvamento das informações para garantir que as rádios favoritas permaneçam disponíveis quando o usuário retornar à aplicação.

3. **Design Responsivo:**
   - Layout adaptado para dispositivos móveis e desktops, seguindo as boas práticas de UX e UI.

### Funcionalidades Extras (DIFERENCIAIS)

- **Testes Unitários:** Foram implementados testes para garantir a robustez da aplicação. (EM DOIS ARQUIVOS)
- **Publicação:** O projeto foi publicado em [Vercel](https://radio-online-v91w.vercel.app/) para acesso e visualização.

## Funcionalidades Adicionais

- **Autenticação com Firebase:** Permite um login seguro e a personalização da experiência do usuário.
- **Modo Dark e Light:** Oferece uma alternância entre temas claro e escuro para maior conforto visual.
- **Menu Mobile:** Implementação de um menu em drawer para uma navegação fluída em dispositivos móveis.
- **Experiência do Usuário (UX):** Tela intuitiva com mensagens informativas sobre o que está acontecendo no sistema.
- **Botão Mobile para Adicionar Músicas:** Facilita a adição de novas rádios diretamente pelo menu mobile.

## Paginação

**React Query** permite que você faça requisições de dados e gerencie o estado da aplicação de forma declarativa. Para a paginação, ele oferece uma abordagem simplificada que inclui:

1. **Cache de Dados:** React Query armazena em cache as respostas das requisições, o que reduz o número de chamadas à API e melhora a performance geral. Quando você navega entre páginas, os dados já carregados permanecem no cache e são reutilizados, evitando recarregamentos desnecessários.

2. **Sincronização Automática:** Com React Query, você pode configurar a sincronização automática dos dados, garantindo que sua aplicação esteja sempre atualizada com as informações mais recentes. Isso é especialmente útil para páginas que podem ser atualizadas com novos dados regularmente.

3. **Paginação e Fetching de Dados:** Utilizamos React Query para buscar dados paginados da API de forma eficiente. O React Query permite que você defina parâmetros de consulta para buscar apenas a página atual de dados. A abordagem inclui:
   - **Definir Query Keys:** Para cada página de dados, utilizamos uma chave única que inclui o número da página, garantindo que as requisições sejam feitas de forma adequada.
   - **Funções de Fetching:** Criamos funções que fazem as requisições à API com base na página atual e nos parâmetros de pesquisa.


## Imagens do Projeto

### Tela para Mobile

![Tela para Mobile](./assets/main-mobile-menu.png)

### Menu Mobile

![Menu Mobile](./assets/mobile-menu-radio.png)

### Tela para Desktop

![Tela para Desktop](./assets/desktop-radio.png)

## Instalação e Uso

1. **Clone o Repositório:**

   ```bash
   git clone https://github.com/seuusuario/radio-browser-challenge.git
   cd radio-browser-challenge
   npm install
   npm run dev e seja feliz :)

   ## Melhorias Propostas para o Projeto

### Melhorias de Funcionalidade

0. **Designer parttners e Clean Arcqui:** Pretendo adicionar um conceito ainda maior de padrões de projeto
que não conseguir atender tudo em vista do tempo, mas deixo aqui os conceitos q uso no meu dia a dia:

## 1. **Component-Based Pattern**
   - **Descrição:** Envolve a construção da interface em componentes reutilizáveis e modulares. Cada componente é responsável por uma parte específica da UI.
## 2. **Container/Presentational Pattern**
   - **Descrição:** Separa a lógica de negócios da apresentação da UI. Containers gerenciam o estado e a lógica, enquanto os componentes de apresentação se concentram apenas na renderização.   
## 3. **Observer Pattern**
   - **Descrição:** Permite que objetos (observadores) se inscrevam para receber atualizações de outro objeto (sujeito) quando ocorre uma mudança.
## 4. **Factory Pattern**
   - **Descrição:** Cria objetos sem especificar a classe exata do objeto que será criado. Ideal para criar componentes ou serviços com base em configurações dinâmicas.
## 5. **Decorator Pattern**
   - **Descrição:** Adiciona funcionalidades a um objeto de forma dinâmica sem alterar o objeto original. Útil para adicionar comportamentos adicionais a componentes.
   - **Ferramentas:** Higher-Order Components (HOCs).
## 6. **Strategy Pattern**
   - **Descrição:** Permite que um algoritmo varie independentemente dos clientes que o utilizam. Ideal para aplicar diferentes lógicas de comportamento em componentes.
   - **Ferramentas:** Hooks personalizados.

   Esse seriam os que mais uso no React mas tbm tenho conceitos de SOLID que aplico no front.
s

1. **Autenticação e Autorização Avançadas:**
   - **Autenticação de Múltiplos Fatores (MFA):** Adicione uma camada extra de segurança com autenticação de múltiplos fatores.
   - **Controle de Acesso Baseado em Funções (RBAC):** Implemente controle de acesso granular para diferentes tipos de usuários (administradores, usuários regulares, etc.).

2. **Notificações e Alertas:**
   - **Notificações em Tempo Real:** Utilize WebSockets ou serviços como Firebase Cloud Messaging (FCM) para enviar notificações em tempo real aos usuários.
   - **Alertas Personalizados:** Permita que os usuários configurem alertas personalizados baseados em suas preferências.

3. **Integração com Serviços Externos:**
   - **Integração com Redes Sociais:** Permita que os usuários se conectem e compartilhem informações através de redes sociais.
   - **API de Música:** Considere integrar APIs de música adicionais para expandir as opções disponíveis para os usuários.

4. **Melhoria na Experiência do Usuário (UX):**
   - **Interface de Usuário (UI) Intuitiva:** Melhore a interface com elementos interativos e animações que proporcionem uma navegação mais fluida.
   - **Design Responsivo Avançado:** Assegure que o design seja altamente responsivo e funcione bem em diferentes dispositivos e tamanhos de tela.

5. **Gerenciamento de Estado Global:**
   - **Otimização com Redux Toolkit:** Utilize Redux Toolkit para gerenciar o estado global de forma eficiente e escalável.

### Melhorias de Tecnologia

1. **Escalabilidade e Desempenho:**
   - **Server-Side Rendering (SSR):** Utilize SSR com Next.js para melhorar o desempenho e a indexação em motores de busca.
   - **Otimização de Performance:** Implemente técnicas de otimização como lazy loading e code splitting para melhorar o tempo de carregamento da aplicação.

2. **Testes e Qualidade de Código:**
   - **Testes Automatizados:** Expanda os testes automatizados com cobertura adicional usando Jest e React Testing Library.
   - **Integração Contínua e Deploy Contínuo (CI/CD):** Configure pipelines de CI/CD para automatizar testes e deploys, garantindo uma entrega contínua e segura.

3. **Infraestrutura e DevOps:**
   - **Dockerização:** Crie contêineres Docker para garantir que seu ambiente de desenvolvimento seja consistente com o ambiente de produção.
   - **Escalabilidade na Nuvem:** Utilize plataformas como Kubernetes para orquestrar e escalar containers conforme a demanda.

4. **Documentação e Manutenção:**
   - **Documentação Abrangente:** Mantenha uma documentação detalhada sobre a arquitetura, APIs, e processos de desenvolvimento.
   - **Manutenção e Suporte:** Estabeleça um plano de manutenção regular e suporte para garantir a saúde contínua da aplicação.

5. **Monitoramento e Logging:**
   - **Monitoramento de Desempenho:** Utilize ferramentas de monitoramento como New Relic ou Datadog para acompanhar o desempenho e detectar problemas proativamente.
   - **Sistema de Logging:** Implemente um sistema de logging eficiente para rastrear erros e eventos importantes na aplicação.

Essas melhorias ajudarão a tornar o seu projeto mais robusto, escalável e preparado para o futuro, garantindo uma melhor experiência para os usuários e uma manutenção mais fácil.

