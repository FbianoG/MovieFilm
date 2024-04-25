import './Footer.css'



export default function Footer() {

    return (
        <footer>
            <div className="logo">MovieFilm</div>
            <div className="footerDescription">
            Com acesso direto à extensa base de dados do The Movie Database (TMDb), nosso site oferece informações detalhadas e atualizadas sobre uma ampla gama de filmes, de blockbusters recém-lançados a preciosidades clássicas.
            </div>
            <nav>
                <a href='https://github.com/FbianoG' target='_blank'>GitHub</a>
                <a href='https://fbianog.github.io/Fg.portfolio/' target='_blank'>Portifólio</a>
                <a href='https://www.linkedin.com/in/fbianog/' target='_blank'>Linkedin</a>
                <a href='https://www.instagram.com/fbiano.1/' target='_blank'>Instagram</a>
            </nav>
            <div className="footerCreateBy">
                Por: Fabiano Gonçalves | abr/24
            </div>
        </footer>
    )
}