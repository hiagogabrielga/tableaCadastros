create database bancocrudcadastros;
use bancocrudcadastros;

create table funcoes(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
funcao varchar(60));

create table cadastros (
	id int auto_increment NOT NULL primary key,
    nome varchar(100) NOT NULL,
    email varchar(100) NOT NULL,
    telefone varchar(15) NOT NULL,
	funcao INT,
    FOREIGN KEY (funcao) REFERENCES funcoes(id)
);

INSERT INTO funcoes (funcao) VALUE ('Supervisor');

INSERT INTO cadastros (nome, email, telefone, funcao) VALUES ('Hiago Gabriel', 'hiagogabriel1132@gmail.com', '(69) 98432-7406', 1);

/*Para interessados, esté é o script responsável por criar o banco de dados.*/