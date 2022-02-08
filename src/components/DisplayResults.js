// DisplayResults.js

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

const DisplayResults = (props) => {
    return(
        <section className="results">
            <img src={props.href} alt={props.title}/>
            <h2>Title: {props.title}</h2>
            <p>Description: {props.description}</p>
            <button onClick={() => props.handleLike(props.id)} id={props.buttonId}  >
                <span className={props.activeLike ? 'unliked' : null}>
                    <FontAwesomeIcon icon={faHeart} />
                    </span>{!props.activeLike ? ' Click to Like' : ' Click to Remove Like'}</button>
        </section>
    )
}

export default DisplayResults