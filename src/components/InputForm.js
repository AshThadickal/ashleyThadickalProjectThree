// InputForm.js

const InputForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <label htmlFor='search'>What planet do you want to view?</label>
            <input type='text' id='search' onChange={props.handleInput} value={props.userInput} />
            <button onClick={() => props.setSearchAgain(true)}>Search</button>
        </form>
    )
}

export default InputForm;