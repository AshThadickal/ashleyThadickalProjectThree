// InputForm.js

const InputForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <label htmlFor="search">Search for Space:</label>
            <input type="text" id="search" onChange={props.handleInput} value={props.userInput} />
            <button>Search</button>
        </form>
    )
}

export default InputForm;