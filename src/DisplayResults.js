// DisplayResults.js

const DisplayResults = (props) => {
    return(
        <div className="resultsContainer">
            <img src={props.href} alt={props.title}/>
            <h2>Title: {props.title}</h2>
            <p>Description: {props.description}</p>
            <button id={props.title} value={props.title}>Like/UnLike</button>
        </div>
    )
}

export default DisplayResults