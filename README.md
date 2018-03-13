# Orbita - API REST Solar

## Recursos utilizados no desenvolvimento:

- NodeJs;
- Express.Js ~ v.4.0;
- MongoDB;
- Mongoose ~4.x;
- NPM;

## Testando a Aplicação no Postman:

Caso queira testar as API's criadas no projeto, primeiro baixe o [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop).
Depois de realizar o download do Postman, basta agora realizar os passos abaiaxo para 
poder testar cada API criada!

Se preferir, basta baixar este aquivo [aqui](https://github.com/juliosalina/orbita_apirest/blob/master/Solar_API_Rest.postman_collection.json) e importe o mesmo no Postman para já obter todas as chamadas criadas.

  ROTA                          |     HTTP(Verbo)   |      Descrição                           | 
--------------------------------| ----------------- | -----------------------------------------| 
/api/v1/users                   |       GET         | Lista todos os usuários                  |
/api/v1/users/:userId           |       GET         | Lista um usuário pelo ID                 | 
/api/v1/users                   |       POST        | Cria um novo usuário                     | 
/api/v1/users/authenticate      |       POST        | Autêntica um usuário (Nome & Password)   | 
/api/v1/users/:userId           |       PUT         | Atualiza um usuário pelo ID              | 
/api/v1/users/:userId           |       DELETE      | Deleta um usuário pelo ID                | 
/api/v1/solar                   |       GET         | Lista todos os dados                     |
/api/v1/solar/:solarId          |       GET         | Lista um dado pelo ID                    | 
/api/v1/solar                   |       POST        | Cria um novo dado                        | 
/api/v1/solar/:solarId          |       PUT         | Atualiza um dado pelo ID                 | 
/api/v1/solar/:solarId          |       DELETE      | Deleta um dado pelo ID                   | 

## Informações importantes

Para testar as APIs em sua totalidade, crie um usuário através da API '/api/v1/users' método POST, posteriormente autentique esse usuário com a API '/api/v1/users/authenticate' método POST, isso lhe retornará um TOKEN válido para acesso total das APIs '/api/v1/solar'. 

Ao criar um usuário, a API cria um hash criptografado do password escolhido, para maior segurança. Ao utilizar a API de autenticação para gerar o TOKEN, deve se utilizar o password normalmente, que a API faz a engenharia reversa do hash (password do cadastro) para comparar com o password informado no body da requisição.

Em cada TOKEN é salvo o nome do usuário, bem como o estado (CA...) do seu cadastro, isso fará com que ao realizar uma busca pela API '/api/v1/solar', os resultados sejam apenas do mesmo estado do cadastro do usuário, limitados em 20 itens por busca para teste.

## Testes Unitários

Recomendo utilizar o [MochaJs](https://mochajs.org/) para realizar os testes unitários da API, pretendo fazer um update nesse projeto em breve com os testes de todas as rotas.

## Executar Localmente

Caso você deseja executar o projeto na sua máquina local, basta seguir os passos abaixo:

Você deve simplesmente clonar o repositório do projeto na sua máquina e instalar as dependências.

### Pre-Requisitos

Antes de instalar as dependências no projeto, você precisa já ter instalado na sua máquina:

* **NodeJs**: Caso não tenha, basta realizar o download [Aqui](https://nodejs.org/en/)
* **MongoDB**: Caso não tenha, basta realizar o download [Aqui](https://docs.mongodb.com/manual/installation/)

### Instalando as Dependências

Abre o terminal e digite a path onde clonou o repositório do projeto:

```
cd "C:\Users\NomeDoComputador\Documents\..."
```

Quando estiver na pasta do projeto (raiz), basta digitar no terminal a seguinte instrução:

```
npm install
```

Esse comando irá criar uma nova pasta em seu projeto, como descrito abaixo:

* `node_modules` - que contêm os packages do npm que precisará para o projeto.

### Executando a Aplicação

Primeiramente, vamos rodar o MongoDB! No terminal onde está aberto o projeto (raiz), basta rodar o seguinte comando:

```
mongod
```

Isso iniciará o seu servidor MongoDB, assim o nosso server poderá se conectar a instância do MongoDB.

Bom, agora abra um novo terminal onde está aberto o projeto (raiz), e vamos importar o arquivo solar_data.json no seu MongoDB local, rodando o seguinte comando:

```
mongoimport --db SolarDB --collection solars --file solar_data.json --jsonArray
```

Agora abra novamente um novo terminal onde está aberto o projeto (raiz), e vamos iniciar o server para o projeto ser executado localmente, com o seguinte comando:

```
nodemon server.js
```

Agora, abra a página da aplicação em `http://localhost:3000/`. E pronto a aplicação será executada de maneira local na sua máquina.

Que a força esteja com você! :)
