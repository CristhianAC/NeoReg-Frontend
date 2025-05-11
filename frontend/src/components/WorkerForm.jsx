import { useForm } from 'react-hook-form';

const WorkerForm = ({ defaultValues = {}, onSubmit }) => {
    const { register, handleSubmit } = useForm({ defaultValues });

    return (
        <form className="worker-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label htmlFor="primerNombre">Primer nombre</label>
                <input
                    type="text"
                    id="primerNombre"
                    {...register("primerNombre", { required: "Este campo es obligatorio" })}
                />
            </div>
            <div className="form-group">
                <label htmlFor="segundoNombre">Segundo nombre</label>
                <input
                    type="text"
                    id="segundoNombre"
                    {...register("segundoNombre")}
                />
            </div>
            <div className="form-group">
                <label htmlFor="apellidos">Apellidos</label>
                <input
                    type="text"
                    id="apellidos"
                    {...register("apellidos", { required: "Este campo es obligatorio" })}
                />
            </div>
            <div className="form-group">
                <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
                <input
                    type="date"
                    id="fechaNacimiento"
                    {...register("fechaNacimiento", { required: "Este campo es obligatorio" })}
                />
            </div>
            <div className="form-group">
                <label htmlFor="genero">Género</label>
                <select
                    id="genero"
                    {...register("genero", { required: "Este campo es obligatorio" })}
                >
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                    <option value="O">Otro</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="correo">Correo electrónico</label>
                <input
                    type="email"
                    id="correo"
                    {...register("correo", {
                        required: "Este campo es obligatorio"
                    })}
                />
            </div>
            <div className="form-group">
                <label htmlFor="celular">Número de celular</label>
                <input
                    type="tel"
                    id="celular"
                    {...register("celular", {
                        required: "Este campo es obligatorio"
                    })}
                />
            </div>
            <div className="form-group">
                <label htmlFor="noDocumento">Número de documento</label>
                <input
                    type="text"
                    id="noDocumento"
                    {...register("noDocumento", { required: "Este campo es obligatorio" })}
                />
            </div>
            <div className="form-group">
                <label htmlFor="tipoDocumento">Tipo de documento</label>
                <select
                    id="tipoDocumento"
                    {...register("tipoDocumento", { required: "Este campo es obligatorio" })}
                >
                    <option value="CEDULA">Cédula de Ciudadanía</option>
                    <option value="CEDULA_DE_EXTRANJERIA">Cédula de Extranjería</option>
                    <option value="PASAPORTE">Pasaporte</option>
                </select>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default WorkerForm;