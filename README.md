# MovieFilm

## Descrição

O "MovieFilm" é um site desenvolvido em React que permite aos usuários visualizar informações detalhadas sobre filmes, incluindo avaliações, trailers, detalhes sobre os atores e muito mais. O site integra a API do The Movie Database (TMDb) junto a uma API própria para funcionalidades adicionais como gestão de favoritos e listas personalizadas.

## Estrutura de Arquivos

- **/pages**: Componentes que correspondem às rotas do aplicativo.
- **/components/shared**: Componentes compartilhados como Header e Footer.
- **/components/common**: Componentes comuns como botões e títulos.
- **/components/layout**: Componentes para layouts complexos como listas de filmes.
- **/api**: Funções para chamadas de API.

## Recursos e Funcionalidades

- **Pesquisa de filmes**: Busca por nome ou categoria.
- **Gerenciamento de Listas**: Funcionalidades para adicionar filmes aos favoritos e à lista de "assistir depois".
- **Interatividade Social**: Compatibilidade de listas de favoritos entre usuários.

## Tecnologias Utilizadas

- **React**: Framework usado para construir a interface do usuário.
- **CSS Puro**: Para estilização dos componentes.
- **React Router**: Gerenciamento das rotas dentro da aplicação.

## Instruções de Instalação

1. Clone o repositório: `https://github.com/FbianoG/MovieFilm.git`
2. Instale as dependências: npm install
3. Inicie o aplicativo: npm run dev

## Gerenciamento de Estado

O estado é gerenciado usando o `useState` do React para manter a simplicidade e eficácia do gerenciamento de estados locais.

## Integração com API

- **API do TMDb**: Utilizada para obter informações sobre filmes, atores e trailers.
- **API própria**: Gerencia autenticação de usuários, configurações e listas personalizadas.

## Tratamento de Erros

Os erros das chamadas de API são tratados e notificados aos usuários através de mensagens de toast, garantindo uma boa experiência de usuário mesmo em casos de falhas.

## Contribuições

Contribuições são bem-vindas! Para contribuir, por favor entre em contato com [fbiano.machado@gmail.com].

## Contato

Para mais informações, dúvidas ou sugestões, por favor entre em contato através de [fbiano.machado@gmail.com].

