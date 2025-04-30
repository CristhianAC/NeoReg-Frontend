import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
function Table() {
  /*
  {
  "primer_nombre": "David",
  "segundo_nombre": "",
  "apellidos": "Hernandez Mosquera",
  "fecha_nacimiento": "2009-09-05",
  "genero": "MASCULINO",
  "correo": "dasher@proton.com",
  "celular": "3546679656",
  "nro_documento": "9087678",
  "tipo_documento": "CEDULA"}

  */
  // ejemplo, el arreglo realmente debe salir de la API
  const people = [
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
  ];
  const columns = people.length > 0 ? Object.keys(people[0]) : [];
  return (
    <div className="card">
      <DataTable value={people} tableStyle={{ minWidth: "50rem" }}>
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
