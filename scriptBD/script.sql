create database bancocrudcadastros;
use bancocrudcadastros;

create table funcoes(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    funcao varchar(60),
    dataalteracao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

create table cadastros (
	id int auto_increment NOT NULL primary key,
    nome varchar(100) NOT NULL,
    email varchar(100) NOT NULL,
    telefone varchar(15) NOT NULL,
	funcao INT NULL,
    FOREIGN KEY (funcao) REFERENCES funcoes(id)
);

INSERT INTO funcoes (funcao) VALUE ('Supervisor'), ('Repositor');

INSERT INTO cadastros (nome, email, telefone, funcao) VALUES ('Hiago Gabriel', 'hiagogabriel1132@gmail.com', '(69) 98432-7406', 1), ('Mariana Silva Oliveira', 'mariana.oliveira@clinicamedica.com.br', '(69) 99902-5678', 2), ('Pedro Henrique Santos', 'pedro.santos@clinicamedica.com.br', '(69) 99903-9012', 2), ('Ana Clara Ferreira', 'ana.ferreira@clinicamedica.com.br', '(69) 99904-3456', 2), ('João Miguel Rocha', 'joao.rocha@clinicamedica.com.br', '(69) 99905-7890', 1);

/*Para interessados, este é o script responsável por criar o banco de dados.*/