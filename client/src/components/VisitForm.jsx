import React, { useState } from "react";
import { addVisit } from "../api";

function VisitForm({ onVisitAdded }) {
  const [name, setName] = useState("");
  const [purpose, setPurpose] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newVisit = await addVisit({ name, purpose });
      onVisitAdded(newVisit); // refresh visit list
      setName("");
      setPurpose("");
    } catch (err) {
      console.error(err);
      alert("Error adding visit");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Visitor Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Purpose"
        value={purpose}
        onChange={(e) => setPurpose(e.target.value)}
      />
      <button type="submit">Add Visit</button>
    </form>
  );
}

export default VisitForm;
