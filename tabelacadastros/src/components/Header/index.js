import styles from './header.module.css'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
    return (
        <div className={styles.containerHeader}>
            <div className={styles.campImgHeader}>
                <Image src='/images/logoPessoal.png' width={35} height={70} alt='Logo Pessoal' />
            </div>
            <div className={styles.campOptionsHeader}>
                <nav className={styles.campNav}>
                    <ul className={styles.listNav}>
                        <li className={styles.optionListNav}><Link href='/' className={styles.linkNav}>Home</Link></li>
                        <li className={styles.optionListNav}><Link href='#' className={styles.linkNav}>Cadastros</Link>
                            <ul className={styles.campSubMenu}>
                                <li className={styles.optionListNavSubMenu}><Link href='/visualizarUsuarios' className={styles.linkNavSubMenu}>Listar cadastros</Link></li>
                                <li className={styles.optionListNavSubMenu}><Link href='/visualizarUsuarios' className={styles.linkNavSubMenu}>Adicionar cadastros</Link></li>
                                <li className={styles.optionListNavSubMenu}><Link href='/visualizarUsuarios' className={styles.linkNavSubMenu}>Editar cadastros</Link></li>
                            </ul>
                        </li>
                        <li className={styles.optionListNav}><Link href='#' className={styles.linkNav}>Funcões</Link>
                            <ul className={styles.campSubMenu}>
                                <li className={styles.optionListNavSubMenu}><Link href='/visualizarFuncoes' className={styles.linkNavSubMenu}>Listar funções</Link></li>
                                <li className={styles.optionListNavSubMenu}><Link href='/visualizarUsuarios' className={styles.linkNavSubMenu}>Adicionar funções</Link></li>
                                <li className={styles.optionListNavSubMenu}><Link href='/visualizarUsuarios' className={styles.linkNavSubMenu}>Editar funções</Link></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}