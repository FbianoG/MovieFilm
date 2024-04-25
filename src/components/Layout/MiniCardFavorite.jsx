
import './MiniCardFavorite.css'



export default function MiniCardFavorite(props) {
    
    return (
        <div className="miniCard" key={props.data.id}>
            <img src={"https://image.tmdb.org/t/p/w200/" + props.data.backdrop_path} alt={props.data.title} />
            <div className="miniCardData">
                <span>{props.data.title}</span>
                {/* <label>{props.data.overview}</label> */}
            </div>
            <div className="miniCardData">
                <span>Lançamento</span>
                <label>{props.data.release_date.split('-').reverse().join("/")}</label>
            </div>
            <div className="miniCardData">
                <span>Nota</span>
                <label>{props.data.vote_average.toFixed(1)}</label>
            </div>
                <button>Detalhes</button>
        </div>
    )
}