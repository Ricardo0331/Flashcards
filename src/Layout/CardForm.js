import React from 'react';


function CardForm(props) {
    console.log(props);
    const {handleSubmit, card, handleChange, handleDone, doneButtonName} = props;
    return (
        <form onSubmit={handleSubmit}>
        <label htmlFor="front">Front</label>
        <textarea id="front" name="front" value={card.front} onChange={handleChange} />
        <label htmlFor="back">Back</label>
        <textarea id="back" name="back" value={card.back} onChange={handleChange} />
        <button type="submit">Save</button>
        <button type="button" onClick={handleDone}>{doneButtonName}</button> 
      </form>
    )
}





export default CardForm;