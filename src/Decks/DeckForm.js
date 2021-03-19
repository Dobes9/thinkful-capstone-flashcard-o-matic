import React, { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { createDeck, updateDeck } from "../utils/api/index";

export default function DeckForm({ selectedDeck, handleCancel }) {
  const history = useHistory();
  const { path, params } = useRouteMatch();
  const { deckId } = params;

  const initialFormData = selectedDeck;

  const [formData, setFormData] = useState({ ...initialFormData });

  const abortController = new AbortController();
  const signal = abortController.signal;

  const handleFormChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async () => {
    path === "/decks/new" ? (
      await createDeck(formData, signal)
    ) : (
      await updateDeck(formData, signal)
    );
  };

  return (
    <form
      onSubmit={() => {
        if (path === "/decks/new") {
          handleSubmit();
          history.push("/");
          setFormData({ ...initialFormData });
        } else {
          handleSubmit();
          history.push(`/decks/${deckId}`);
          setFormData({ ...initialFormData });
        }
      }}
    >
      <div className="mb-3">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleFormChange}
          placeholder="Deck Name"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleFormChange}
            placeholder="Brief description of the deck"
          />
        </label>
      </div>
      <div>
        <button
          className="btn btn-secondary"
          onClick={() => {
            handleCancel();
            setFormData({ ...initialFormData });
          }}
        >
          Cancel
        </button>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}
