import React, { useEffect, useState } from "react";
import { getVisits, deleteVisit } from "../api";

function VisitList() {
  const [visits, setVisits] = useState([]);

  const fetchVisits = async () => {
    try {
      const data = await getVisits();
      setVisits(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteVisit(id);
      fetchVisits(); // refresh list
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVisits();
  }, []);

  return (
    <ul>
      {visits.map((visit) => (
        <li key={visit.id}>
          {visit.name} - {visit.purpose}
          <button onClick={() => handleDelete(visit.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default VisitList;
