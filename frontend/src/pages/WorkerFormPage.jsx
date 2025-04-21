import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function WorkerFormPage() {
  const params = useParams();

  const [id, setId] = useState(0);

  useEffect(() => {
    if (params.id) {
      setId(params.id);
    } else {
      setId(0);
    }
  }, [params.id]);

  return (
    <div>
      <h1>Worker {id !== 0 ? `#${id}` : ""}</h1>
    </div>
  );
}

export default WorkerFormPage;
