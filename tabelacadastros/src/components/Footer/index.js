import styles from './footer.module.css'

export default function Footer() {
    return (
        <div className={styles.containerFooter}>
            <div className={styles.containerMyContats}>
                <h2>Redes sociais</h2>
                <ul className={styles.listMyConstats}>
                    <li className={styles.optionContat}><a className={styles.ancoraContat} href="https://github.com/hiagogabrielga" target='_blank'>GitHub</a></li>
                    <li className={styles.optionContat}><a className={styles.ancoraContat} href="https://www.instagram.com/hiago.gabriel.940098/" target='_blank'>Instagem</a></li>
                    <li className={styles.optionContat}><a className={styles.ancoraContat} href="https://www.linkedin.com/in/hiago-gabriel-94a687336/" target='_blank'>Linkedin</a></li>
                </ul>
            </div>
            <div className={styles.copyright}>
                <h3>hiagogabrielga 2025 &copy;</h3>
            </div>
        </div>
    )
}