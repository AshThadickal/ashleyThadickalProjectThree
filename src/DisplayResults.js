// DisplayResults.js

const DisplayResults = (props) => {
    return(
        
            <div className="results">
                <img src={props.href} alt={props.title}/>
                <h2>Title: {props.title}</h2>
                <p>Description: {props.description}</p>
                <button onClick={() => props.handleLike(props.id)} id={props.buttonId} className={props.activeLiked ? 'liked' : null} >{!props.activeLike ? 'Click to Like' : 'Click to Remove Like'}</button>
            </div>
        
    )
}

export default DisplayResults