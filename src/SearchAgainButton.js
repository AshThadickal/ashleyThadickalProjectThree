

const SearchAgainButton = (props) => {
    return (props.searchAgain) ? (
        <button className="searchAgain" onClick={() => {props.setSearchAgain(false); }}><a href="#home">Click to Search Again</a></button>
    ) : ('')
        
    
}

export default SearchAgainButton