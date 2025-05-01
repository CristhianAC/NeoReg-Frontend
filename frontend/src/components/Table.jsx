import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect } from "react";
import { getWorkers } from "../api/workersApi";
function Table() {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    async function loadWorkers() {
      const res = await getWorkers();
      console.log("res", res);
      setWorkers(res);
    }
    loadWorkers();
  }, []);
  /* const people = [
    {
      primer_nombre: "David",
      segundo_nombre: "",
      apellidos: "Hernandez Mosquera",
      fecha_nacimiento: "2009-09-05",
      genero: "MASCULINO",
      correo: "dasher@proton.com",
      celular: "3546679656",
      nro_documento: "9087678",
      tipo_documento: "CEDULA",
    },
  ]; */

  const columns = workers.length > 0 ? Object.keys(workers[0]) : [];
  return (
    <div>
      <DataTable value={workers} tableStyle={{ minWidth: "50rem" }}>
        {columns.map((col) => (
          <Column
            key={col}
            field={col}
            header={col
              .split("_")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          />
        ))}
      </DataTable>
    </div>
  );
}

export default Table;
