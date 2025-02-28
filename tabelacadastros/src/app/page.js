'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from "react";

export default function Home() {

  return (
    <div className={styles.containerHome}>
      <div className={styles.containerText}>
        <h3>
          Apresentação
        </h3>
        <p>Eu sou Hiago Gabriel, estudo no IFRO <span>Campus</span> Vilhena e faço o curso de tecnico em informática integrado ao ensino médio. Criei esse site para aprimorar meus conhecimentos e reforçar oque aprendi no ano leitivo de 2024.</p>
      </div>
      <div className={styles.containerText}>
        <h3>Qual o intuito desse site?</h3>
        <p>
          A funcionalidade desse site é para aprimorar meus conhecimentos no front-end, utilizando React, Next.js e Lucide React para fortalecer a estilização, e no back-end, como o desenvolvimento de uma API e banco de dados. E tambem eu adicionei alguns detalhes por ele.
        </p>
      </div>
      <div className={styles.containerText}>
        <h3>Quais são as funcionalidades?</h3>
        <p>
          A funcionalidade do site consiste em um CRUD de 2 tabelas no banco de dados, junto com a API. As tabelas são cadastro e funcionários, respectivamente.
        </p>
        <p>
          CRUD é um acrônimo para Create (criar), Read (ler), Update (atualizar) e Delete (excluir). Esses são os quatro métodos básicos de operações em um banco de dados. A API deste site suporta os seguintes métodos HTTP:
        </p>
        <ul>
          <li><strong>POST</strong>: Utilizado para criar um novo registro.</li>
          <li><strong>GET</strong>: Utilizado para ler ou recuperar dados.</li>
          <li><strong>PUT</strong>: Utilizado para atualizar um registro existente.</li>
          <li><strong>PATCH</strong>: Utilizado para atualizar parcialmente um registro existente.</li>
          <li><strong>DELETE</strong>: Utilizado para excluir um registro.</li>
        </ul>
      </div>
    </div>
  );
}
