import React from 'react';
import WorkerForm from '../components/WorkerForm';
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { fetchWorker } from '../api/workersApi'; // Adjust the import path as necessary
import { createPersona, updatePersona } from '../api/usersApi';

function normalizeWorker(data) {
  return {
    primerNombre:    data.primer_nombre,
    segundoNombre:   data.segundo_nombre,
    apellidos:       data.apellidos,
    fechaNacimiento: data.fecha_nacimiento,      // date inputs want YYYY-MM-DD
    genero:          // map the backend enum into your form’s options
      data.genero === "MASCULINO" ? "M"
    : data.genero === "FEMENINO"  ? "F"
    :                                "O",
    correo:     data.correo,
    celular:    data.celular,
    noDocumento:data.nro_documento,
    tipoDocumento:
      data.tipo_documento === "CEDULA" ? "CC"
    : data.tipo_documento === "CE"     ? "CE"
    : /*etc*/                          "PA",
  };
}

const PanelPersona = () => {

  const { id } = useParams()

  const [defaultValues, setDefaultValues] = useState({});
  const [loading, setLoading] = useState(!!id);

  // const defaultValues = id ?  {"primerNombre" : "Juan"} : {}; // tomar de la API si existe el id

  // const handleSubmit = (data) => {
  //   if(id){
  //     console.log("Updating worker with id:", id);
  //   } else {
  //     console.log("Creating new worker");
  //   }
  //   // call createWorker(data) or updateWorker(id, data)
  // };
  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const data = await fetchWorker(id);
        console.log("Worker data:", data);
        setDefaultValues(normalizeWorker(data));
      } catch (error) {
        console.error("Error fetching worker:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }
  , [id]);
  
  const handleSubmit = async (data) => {
    if (id) {
      console.log('Updating worker with id:', id, data);
      await updatePersona(id, data);
    } else {
      console.log('Creating new worker', data);
      await createPersona(data);
    }
    // maybe redirect or show a success message here
  };

  if (loading) {
    return <div>Loading worker data…</div>;
  }

  return (
    <div>
      <h1>Worker Form</h1>
      <div>
        {id ? (
          <h2>Editing Worker with ID: {id}</h2>
        ) : (
          <h2>Creating New Worker</h2>
        )}
      </div>
      <WorkerForm 
      defaultValues={defaultValues}
      onSubmit={handleSubmit} />
    </div>
  );
};

export default PanelPersona;