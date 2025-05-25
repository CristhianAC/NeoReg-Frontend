import React from 'react';
import WorkerForm from '../components/WorkerForm';
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { fetchWorker } from '../api/workersApi'; // Adjust the import path as necessary
import { createPersona, updatePersona } from '../api/usersApi';
import { normalizeWorker, toApiPayload } from '../utils/mappers'; // Adjust the import path as necessary
import { validateForm } from '../utils/validations';
import { useForm } from 'react-hook-form';
import { getPhotos, deletePhoto, uploadPhoto } from '../api/photosApi';

const PanelPersona = () => {

  const { id } = useParams()
  let personaId = id

  const [defaultValues, setDefaultValues] = useState({});
  const [loading, setLoading] = useState(!!id);
  const navigate = useNavigate();

  const [photoUrl, setPhotoUrl] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoDeleted, setPhotoDeleted] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const data = await fetchWorker(id);
        console.log("Worker data:", data);
        setDefaultValues(normalizeWorker(data));
        const photo_data = await getPhotos(id);
        console.log(photo_data.at(-1).url);
        if(photo_data){
          setPhotoUrl(photo_data.at(-1).url)
        }
        
      } catch (error) {
        console.error("Error fetching worker:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }
  , [id]);
  
  const methods = useForm({ defaultValues });
  const {
    handleSubmit,
    setError,
    register,
    formState: { errors },
    reset
  } = methods;
  useEffect(() => {
  // don't reset to empty on mount
  if (Object.keys(defaultValues).length) {
    reset(defaultValues);
  }
}, [defaultValues, reset]);

  const onSubmit = async (data) => {
    const { isValid, errors: validationErrors } = validateForm(data);

    if (photoFile && photoFile.size > 2 * 1024 * 1024) {
      setError("photo", {
      type: "manual",
      message: "La foto no debe pesar más de 2MB"
    });
    isValid = false;
  }

    if (!isValid) {
      Object.entries(validationErrors).forEach(([field, messages]) => {
        setError(field, {
          type: 'manual',
          message: messages.join('. ')
        });
      });
      return;
    }
    const payload = toApiPayload(data);
    if (id) {
      console.log('Updating worker with id:', id, payload);
      await updatePersona(id, payload);
    } else {
      console.log('Creating new worker', payload);
      const created = await createPersona(payload);
      personaId = created.id;
    }

    if (photoDeleted){
      const photo_data = await getPhotos(id);
      await deletePhoto(id, photo_data.at(-1).filename)
    }

    if (photoFile) {
      await uploadPhoto(personaId, photoFile) // no hay id cuando se crea
    }

    if (id){
      navigate('/home', {
        state: { 
          toast: { severity: 'success', summary: '¡Éxito!', detail: 'Trabajador actualizado' } 
        }
      });
    } else {
      navigate('/home', {
        state: { 
          toast: { severity: 'success', summary: '¡Éxito!', detail: 'Trabajador creado' } 
        }
      })
    }
    // maybe redirect or show a success message here
  };

  if (loading) {
    return <div>Loading worker data…</div>;
  }

  return (
    <div>
      <WorkerForm 
        register={register}
        errors={errors}
        onSubmit={handleSubmit(onSubmit)}
        photoUrl={photoUrl}
        onPhotoChange={setPhotoFile}
        onPhotoDelete={() => {
          setPhotoDeleted(true);
          setPhotoUrl(null);
          setPhotoFile(null);
        }}
      />
    </div>
  );
};

export default PanelPersona;