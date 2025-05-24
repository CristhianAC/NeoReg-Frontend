import '../assets/form.css'

const WorkerForm = ({ register, errors, onSubmit }) => {

    return (
        <form className="worker-form" onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="primerNombre">Primer nombre</label>
                <input
                    type="text"
                    id="primerNombre"
                    {...register("primerNombre", { required: "Este campo es obligatorio" })}
                />
                {errors.primerNombre && (
                    <p className="error">{errors.primerNombre.message}</p>
                )}
            </div>
            <div className="form-group">
                <label htmlFor="segundoNombre">Segundo nombre</label>
                <input
                    type="text"
                    id="segundoNombre"
                    {...register("segundoNombre")}
                />
                {errors.segundoNombre && (
                    <p className="error">{errors.segundoNombre.message}</p>
                )}
            </div>
            <div className="form-group">
                <label htmlFor="apellidos">Apellidos</label>
                <input
                    type="text"
                    id="apellidos"
                    {...register("apellidos", { required: "Este campo es obligatorio" })}
                />
                {errors.apellidos && (
                    <p className="error">{errors.apellidos.message}</p>
                )}
            </div>
            <div className="form-group">
                <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
                <input
                    type="date"
                    id="fechaNacimiento"
                    {...register("fechaNacimiento", { required: "Este campo es obligatorio" })}
                />
                {errors.fechaNacimiento && (
                    <p className="error">{errors.fechaNacimiento.message}</p>
                )}
            </div>
            <div className="form-group">
                <label htmlFor="genero">Género</label>
                <select
                    id="genero"
                    {...register("genero", { required: "Este campo es obligatorio" })}
                >
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                    <option value="O">No-binario</option>
                    <option value="N">Prefiero no reportar</option>
                </select>
            {errors.genero && (
                    <p className="error">{errors.genero.message}</p>
                )}
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
            {errors.correo && (
                    <p className="error">{errors.correo.message}</p>
                )}
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
            {errors.celular && (
                    <p className="error">{errors.celular.message}</p>
                )}
            </div>
            <div className="form-group">
                <label htmlFor="noDocumento">Número de documento</label>
                <input
                    type="text"
                    id="noDocumento"
                    {...register("noDocumento", { required: "Este campo es obligatorio" })}
                />
            {errors.noDocumento && (
                    <p className="error">{errors.noDocumento.message}</p>
                )}
            </div>
            <div className="form-group">
                <label htmlFor="tipoDocumento">Tipo de documento</label>
                <select
                    id="tipoDocumento"
                    {...register("tipoDocumento", { required: "Este campo es obligatorio" })}
                >
                    <option value="CEDULA">Cédula de ciudadanía</option>
                    <option value="TARJETA_DE_IDENTIDAD">Tarjeta de identidad</option>
                </select>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default WorkerForm;