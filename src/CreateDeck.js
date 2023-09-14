import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "./utils/api/index";

function CreateDeck() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newDeck = await createDeck(formData);
    history.push(`/decks/${newDeck.id}`);
  };

  return (
    <div>
      <h2>Create Deck</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={handleChange}
          value={formData.name}
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          value={formData.description}
        />
        <button type="submit">Submit</button>
        <button onClick={() => history.push("/")}>Cancel</button>
      </form>
    </div>
  );
}

export default CreateDeck;
