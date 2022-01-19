// InputForm.js

const InputForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <label htmlFor="search">Enter your search for a fantastic voyage through:</label>
            <input type="text" id="search" onChange={props.handleInput} value={props.userInput} />
            <button onClick={() => props.setSearchAgain(true)}>Search</button>
        </form>
    )
}

export default InputForm;