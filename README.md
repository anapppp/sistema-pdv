# Desafio Módulo 5 - Api para PDV

Este é o resultado do último desafio do curso de Desenvolvimento de Software com foco em Backend da [Cubos Academy](https://cubos.academy/cursos/desenvolvimento-de-software). 

Este projeto foi desenvolvido com uma equipe de 5 maravilhosas integrantes, sem as quais o projeto não seria possível. 

Equipe: 
- [Ana Paula Kelm Soares](https://github.com/anapppp)
- [Bruna SaNog](https://github.com/brunasanog)
- [Flavia Bilibio](https://github.com/flavia-bilibio)
- [Paula Borges](https://github.com/paulagmborges)
- [Thamiris de Oliveira Corrêa](https://github.com/ThamyCorrea)


## Descrição 
API para um PDV (Ponto de venda ou Frente de Caixa) para um sistema de comércio eletrônico.

---

<details>
<summary>Banco de dados</summary>
<br>
A forma escolhida para persistir os dados foi armazenar o banco de dados no <a href="https://www.elephantsql.com/">ElephantSQL</a>. O banco de dados foi criado usando PostgreSQL, as querys podem ser obtidas no arquivo <a href="./dump.sql">dump.sql</a>.
</details>

---

<details>
<summary>Endpoints</summary>

##### Relação de endpoints: 
<div style="margin-left: 2rem;" >
<details>
<summary>Usuários</summary>

#### `POST` `/usuario`

- Cadastra um novo usuário no sistema.
- Campos obrigatórios:
    - nome
    - email (único)
    - senha
- Entrada pelo body da requisição, em formato json. 

Exemplo:

```json
{
	"nome": "ana",
	"email": "ana2@gmail.com",
	"senha": "123"
}
```

#### `POST` `/login`

- Login no sistema de usuário cadastrado.
- Entrada dos dados pelo body da requisição, em formato json. 

Exemplo:

```json
{
	"email": "ana2@gmail.com",
	"senha": "123"
}
```
> Um token será retornado no body, e será utilizado para acessar as demais rotas via Bearer Token.


#### `GET` `/usuario`

- Permite o usuário logado a visualizar os dados do seu próprio perfil
- Os dados do usuário apresentados são referentes ao token de autenticação fornecido no Bearer Token.


#### `PUT` `/usuario`

- Atualiza as informações do próprio usuário logado.
- Entrada dos dados pelo body da requisição, em formato json. 
- Referente ao usuário cujo token de autenticação foi fornecido no Bearer Token.

Exemplo:

```json
{
	"nome": "ana paula",
	"email": "ana2@gmail.com",
	"senha": "123"
}
```
<br>
</details>

<details>
<summary>Produtos</summary>

#### `GET` `/categoria`

- Listar todas as categorias de produtos cadastradas.
- As categorias cadastradas são as seguintes: 
    - 1 - Informática
    - 2 - Celulares
    - 3 - Beleza e Perfumaria
    - 4 - Mercado
    - 5 - Livros e Papelaria
    - 6 - Brinquedos
    - 7 - Moda
    - 8 - Bebê
    - 9 - Games

#### `POST` `/produto`

- Permite o usuário logado cadastrar um novo produto no sistema.
- Campos obrigatórios:
    - descricao
    - quantidade_estoque
    - valor (em centavos)
    - categoria_id ( valor do id da [categoria](#get-categoria)).
- Entrada dos dados pelo body da requisição, em formato json. 

Exemplo:

```json
{
	"descricao": "Notebok Dell",
	"quantidade_estoque": 59,
	"valor": "599990",
	"categoria_id": 1,
    "produto_imagem": null
}
```

O campo **produto_imagem** é opcional. Caso queira inserir uma imagem, a melhor forma é por Multipart. Exemplo:

![](https://github.com/anapppp/desafio-backend-modulo-05-sistema-pdv-b2b-ifood-t09/assets/70073296/b844c71c-3f85-4e00-a534-173aa9a1e60d)

#### `PUT` `/produto/:id`

- Permite o usuário logado atualizar as informações de um produto cadastrado.
- Campos obrigatórios:
    -   descricao
    -   quantidade_estoque
    -   valor (em centavos)
    -   categoria_id ( valor do id da [categoria](#get-categoria)).
- Entrada dos dados pelo body da requisição, em formato json. 

Exemplo:

```json
{
	"descricao": "Notebook Inspiron 15",
	"quantidade_estoque": 59,
	"valor": "234800",
	"categoria_id": 1
}
```

#### `GET` `/produto`

- Lista para o usuário logado todos os produtos cadastrados.
- Permite um parâmetro do tipo query **categoria_id** que filtra os produtos por categoria (veja [aqui](#get-categoria)).
- Caso nenhum valor de **categoria_id** seja fornecido, todos os produtos serão listados.
- Saida pelo body em formato json.


#### `GET` `/produto/:id`

- Apresenta ao usuário os detalhes de um produto cadastrado em específico, identificado pelo parâmetro de rota **id**.  


#### `DELETE` `/produto/:id`

- Exclui o produto cadastrado, identificado pelo parâmetro de rota **id**.  

<br>
</details>


<details>
<summary>Clientes</summary>
<br>

#### `POST` `/cliente`

- Permite o usuário logado cadastrar um novo cliente no sistema.
- Campos obrigatórios:
    - nome
    - email (único)
    - cpf (único)

- Entrada dos dados pelo body da requisição, em formato json. 

Exemplo:

```json
{
	"nome": "Márcia Gonçalves",
	"email": "marcia.goncalves@gmail.com",
	"cpf": 46925587631
}
```

```json
{
    "nome": "Fernando de Souza",
    "email": "fernandinho@gmail.com",
    "cpf": "56123963785",
    "cep": "12345678",
    "rua": "Rua das Flores",
    "numero": 561,
    "bairro": "Centro",
    "cidade": "Curitiba",
    "estado": "PR"
}
```

#### `PUT` `/cliente/:id`

- Atualiza os dados de um cliente cadastrado, identificado pelo parâmetro de rota **id**.
- Campos obrigatórios:
    - nome
    - email (único)
    - cpf (único)
- Entrada dos dados pelo body da requisição, em formato json. 

Exemplo:

```json
{
    "nome": "Fernando Souza",
    "email": "fernando.souza@gmail.com",
    "cpf": "56123963785",
    "cep": "12345678",
    "rua": "Rua das Flores",
    "numero": 561,
    "bairro": "Centro",
    "cidade": "Curitiba",
    "estado": "PR"
}
```

#### `GET` `/cliente`

- Listar todos os clientes cadastrados.

>

#### `GET` `/cliente/:id`

- Retorna os detalhes de um dos clientes cadastrados.  
- Cliente identificado pelo parâmetro de rota *id*

<br>
</details>

<details>
<summary>Pedidos</summary>
<br>

#### `POST` `/pedido`

- Cadastra um novo pedido no sistema.
- Cada pedido deverá conter ao menos um produto vinculado.
- A concluir um pedido, um e-mail é enviado para o cliente.
- Campos obrigatórios:
    -   cliente_id
    -   pedido_produtos
        -   produto_id
        -   quantidade_produto
- Entrada dos dados pelo body da requisição, em formato json.

Exemplo:

```json
{
    "cliente_id": 1,
    "observacao": "Em caso de ausência recomendo deixar com algum vizinho",
    "pedido_produtos": [
        {
            "produto_id": 1,
            "quantidade_produto": 10
        },
        {
            "produto_id": 2,
            "quantidade_produto": 20
        }
    ]
}
```

#### `GET` `/pedido`

- Lista todos os pedidos cadastrados.
- Permite o uso de um parâmetro do tipo query **cliente_id** o qual filtra os edidos por clientes.
- Caso o **cliente_id** não seja informado, todos os pedidos cadastrados são retornados.
- Resposta pelo body em formato json

</details>
</div>

</details>

---
<details>
<summary>Como usar</summary>

### Opção 1: local host

1. Clone o repositório:

```
git@github.com:anapppp/desafio-backend-modulo-05-sistema-pdv-b2b-ifood-t09.git
```
2. Instale as dependências no diretório clonado
```
npm install
```
3. Crie um banco de dados local usando o arquivo [dump.sql](./dump.sql)
4. Insira as variáveis de ambiente em um arquivo .env seguindo o modelo [.env.example](./.env.example).
5. Execute no terminal
```
node .\src\index.js
```
 
5. Acesse os [endpoints](#relação-de-endpoints) conforme descrito.

### Opção 2: deploy

Acesse os endpoints usando o seguinte link:
- https://creepy-calf-peplum.cyclic.app/

#### Insomnia
Para facilitar o acesso a API você pode usar o [Insomnia](https://insomnia.rest/). São dispnibilizados nesse repositório os arquivos [Insomnia_localhost](./Insomnia_localhost.json) e [Insomnia_deploy ](./Insomnia_deploy.json), os quais podem ser importados no Insomnia para acesso respectivamente via localhost e deploy.

</details>

## Agradecimentos

À [Cubos Academy](https://cubos.academy/) por proporcionar essa expriência incrível, e por trabalhar a favor da diversidade e da inclusão. 

Um agradecimento especial à professora [Jess Medeiros](https://www.linkedin.com/in/jessicamedeirospocarli/), que nos mentorou e tirou nossas dúvidas durante todo o processo, à gesrora de relacionamentos da nossa turma [Rapha Morais](https://www.linkedin.com/in/raphaelamorais1995/), que acompanhou nossa turma; e ao professor [Guido Cerqueira](https://www.linkedin.com/in/guidocerqueira/), que nos ajudou com sua didática em suas aulas gravadas. 

E finalmente, à Ifood, pela concessão da bolsa através do programa [Potência Tech](https://potenciatech.com.br/).