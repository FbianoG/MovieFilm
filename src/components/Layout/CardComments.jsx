import './CardComments.css';


export default function CardComments(props) {

    return (
        <div className="cardComments">
            <img src={"https://image.tmdb.org/t/p/w200/" + props.comment.author_details.avatar_path} alt={props.comment.author_details.name} />

            <div className="cardCommentsData">
                <div className="cardCommentTitle">
                    <h3>{props.comment.author_details.username}</h3>
                    <span>{props.comment.created_at.slice(0, 10).split('-').reverse().join('/')}</span>
                </div>

                <p>{props.comment.content}</p>
            </div>
        </div>
    )
}