import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Poppins } from 'next/font/google'
 
const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
})
export const metadata = {
  title: "CRUD simples",
  description: "Um site feito para treinar meus conhecimentos.",
  autor: 'Hiago Gabriel Gaonçalves André',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={poppins.className}>
        <header>
          <Header />
        </header>
        <main>
          {children}
        </main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
