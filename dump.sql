CREATE DATABASE pdv;

CREATE TABLE IF NOT EXISTS usuarios (
  	id serial primary key,
  	nome text,
  	email text unique not null,
  	senha text not null
);

CREATE TABLE IF NOT EXISTS categorias (
  id serial primary key,
  descricao text not null
);

CREATE TABLE IF NOT EXISTS produtos (
  id serial primary key,
  descricao text not null,
  quantidade_estoque integer not null,
  valor integer not null,
  categoria_id integer references categorias(id) not null
);

CREATE TABLE IF NOT EXISTS clientes (
  id serial primary key,
  nome text not null,
  email text unique not null,
  cpf varchar(11) unique not null,
  cep varchar(8),
  rua text,
  numero integer,
  bairro text,
  cidade text,
  estado text
);

CREATE TABLE IF NOT EXISTS pedidos (
id serial primary key,
cliente_id integer references clientes(id) not null,
observacao text,
valor_total integer
);

CREATE TABLE IF NOT EXISTS pedido_produtos (
id serial primary key,
pedido_id integer references pedidos(id) not null,
produto_id integer references produtos(id) not null,
quantidade_produto integer not null,
valor_produto integer not null
);

ALTER TABLE produtos ADD COLUMN produto_imagem text;

/* --- inserts --- */

insert into categorias (descricao)
values
  ('Informática'),
  ('Celular'),
  ('Beleza e Perfumaria'),
  ('Mercado'),
  ('Livros e Papelaria'),
  ('Brinquedos'),
  ('Moda'),
  ('Bebê'),
  ('Games');

insert into produtos (descricao, quantidade_estoque, valor, categoria_id)
values
('Mouse Oex', 50, 8000, 1),
('iPhone 13', 30, 394899, 2),
('Natura Lumina Shampoo Antiqueda', 40, 4490, 3);

insert into clientes (nome, email, cpf, cep, rua, numero, bairro, cidade, estado)
values
('Denise Almeida', 'denise.almeida@hotmail.com', '26864596184',null,null,null,null,null,null),
('Fernando de Souza', 'fernandinho@gmail.com', '56123963785', '12345678','Rua das Flores', 561, 'Centro', 'Curitiba', 'PR' );