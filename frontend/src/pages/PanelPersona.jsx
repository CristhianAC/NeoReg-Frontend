import React from 'react';
import WorkerForm from '../components/WorkerForm';
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { fetchWorker } from '../api/workersApi'; // Adjust the import path as necessary
import { createPersona, updatePersona } from '../api/usersApi';
import { normalizeWorker, toApiPayload } from '../utils/mappers'; // Adjust the import path as necessary
import { validateForm } from '../utils/validations';
import { useForm } from 'react-hook-form';

const PanelPersona = () => {

  const { id } = useParams()

  const [defaultValues, setDefaultValues] = useState({});
  const [loading, setLoading] = useState(!!id);
  const navigate = useNavigate();

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
      navigate('/home', {
        state: { 
          toast: { severity: 'success', summary: '¡Éxito!', detail: 'Trabajador actualizado' } 
        }
      });
    } else {
      console.log('Creating new worker', payload);
      await createPersona(payload);
      navigate('/home', {
        state: { 
          toast: { severity: 'success', summary: '¡Éxito!', detail: 'Trabajador creado' } 
        }
      });
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
      />
    </div>
  );
};

export default PanelPersona;