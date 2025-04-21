import React from 'react';
import WorkerForm from '../components/WorkerForm';
import { useParams } from 'react-router-dom'

const PanelPersona = () => {

  const { id } = useParams()

  const defaultValues = id ?  {"primerNombre" : "Juan"} : {};

  const handleSubmit = (data) => {
    if(id){
      console.log("Updating worker with id:", id);
    } else {
      console.log("Creating new worker");
    }
    // call createWorker(data) or updateWorker(id, data)
  };

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