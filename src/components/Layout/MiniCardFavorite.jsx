
import './MiniCardFavorite.css'



export default function MiniCardFavorite(props) {
    
    return (
        <div className="miniCard" key={props.movie.id}>
            <img src={"https://image.tmdb.org/t/p/w200/" + props.movie.backdrop_path} alt={props.movie.title} />
            <div className="miniCardData">
                <span>{props.movie.title}</span>
            </div>
            <div className="miniCardData">
                <span>Lançamento</span>
                <label>{props.movie.release_date.split('-').reverse().join("/")}</label>
            </div>
            <div className="miniCardData">
                <span>Nota</span>
                <label>{props.movie.vote_average.toFixed(1)}</label>
            </div>
                <button>Detalhes</button>
        </div>
    )
}