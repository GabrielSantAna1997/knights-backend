
## Backend Inicialização
- Este projeto está diretamente conectado ao knights-frontend.

- Para iniciar este projeto, é necessário executar o comando `npm install` para instalar as dependências necessárias.

```javascript
npm install
```

- É crucial que este projeto seja executado na porta 3000, já que as requisições do frontend são direcionadas para localhost/3000. Não foi implementado um sistema de variáveis de ambiente neste projeto por enquanto.

- Se desejar alterar a porta do frontend, é necessário efetuar a liberação correspondente no arquivo `app.js` linha `15`.


- Além disso, é necessário adicionar a `URL` configuração de conexão ao banco de dados MongoDB na aplicação Node.js, no arquivo `src/config/dbConnect.js` linha `5`.


- Se desejar utilizar minha conexão ao banco de dados, por favor, entre em contato para que eu possa inserir seu endereço IP nas configurações de `Network Access` da cloud MongoDB.

- Caso todas as configurações mencionadas não sejam realizadas, não será possível utilizar o projeto corretamente.

```javascript
nodemon server.js
```

## Organização dos arquivos

- A configuração do banco de dados está localizada em `src/config/dbConnect.js.` (A URL configurada no banco foi utilizada para testes e não está operacional. Será necessário criar uma nova URL ou solicitar acesso ao desenvolvedor.")

- Foi desenvolvida uma estrutura de controladores (controllers) e modelos (models). Os controladores estão localizados em `src/controllers` e os modelos em `/src/models`.

- Foi implementado um sistema de roteamento das rotas em `src/routes`.

- Foi desenvolvido um middleware que poderá ser utilizado na comunicação entre o projeto frontend e backend. No entanto, sua implementação ainda não está em uso, sendo planejada para a próxima versão do projeto.

## Testes Unitários

- Foram desenvolvidos vários testes unitários para o projeto.

- Os testes unitários estão localizados no diretório src/controllers/tests. Além disso, foi realizada uma configuração nos arquivos jest.config.cjs e babel.config.json para permitir a importação por módulo nos testes unitários.

  ``` import express from 'express'; ```

 - Isso garante que os testes possam ser executados com sucesso.

- Para executá-los, é necessário utilizar o seguinte comando:

```javascript
npm test
```
