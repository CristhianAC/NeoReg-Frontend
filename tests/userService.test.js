test('hello world!', () => {
	expect(1 + 1).toBe(2);
});

const { createPersona, updatePersona, deletePersona } = require('../src/userService')

test('crea persona', async () => {
	const data_persona = {
		"primer_nombre": "string",
        "segundo_nombre": "string",
        "apellidos": "string",
        "fecha_nacimiento": "2025-04-14",
        "genero": "MASCULINO",
        "correo": "user@example.com",
        "celular": "string",
        "nro_documento": "string",
        "tipo_documento": "TARJETA_DE_IDENTIDAD"
	}
	fetchMock.mockResponseOnce(JSON.stringify({
		"id":0,
		...data_persona
	}))
	const response = await createPersona(data_persona);
	expect(response).toEqual({
		"id":0,
		...data_persona
	})
	expect(fetch).toHaveBeenCalledWith(
		'http://localhost:8000/api/v1/personas',
		{
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json'
		  },
		  body: JSON.stringify(data_persona)
		}
	  )
})

test('crea persona error', async () => {
	fetchMock.mockResponseOnce('Error', { status: 500 })
	await expect(createPersona({})).rejects.toThrow('Error creando persona')
})

test('actualiza persona', async () => {
	const data_persona = {
		"primer_nombre": "string",
        "segundo_nombre": "string",
        "apellidos": "string",
        "fecha_nacimiento": "2025-04-14",
        "genero": "MASCULINO",
        "correo": "user@example.com",
        "celular": "string",
        "nro_documento": "string",
        "tipo_documento": "TARJETA_DE_IDENTIDAD"
	}
	fetchMock.mockResponseOnce(JSON.stringify({ // mock para la respuesta de createPersona
		id: 0,
		...data_persona
	}));
	await createPersona(data_persona)
	const data_persona_actualizada = {
		"primer_nombre": "Daniel",
		...data_persona
	}
	fetchMock.mockResponseOnce(JSON.stringify({ // mock para la respuesta de updatePersona
		"id":0,
		...data_persona_actualizada
	}))
	const response = await updatePersona(0, data_persona_actualizada);
	expect(response).toEqual({
		"id":0,
		...data_persona_actualizada
	})
	expect(fetch).toHaveBeenCalledWith(
		'http://localhost:8000/api/v1/personas/0',
		{
		  method: 'PUT',
		  headers: {
			'Content-Type': 'application/json'
		  },
		  body: JSON.stringify(data_persona_actualizada)
		}
	  )
})

test('actualiza persona error', async () => {
	fetchMock.mockResponseOnce('Error', { status: 500 })
	await expect(updatePersona({})).rejects.toThrow('Error actualizando persona')
})

test('elimina persona', async () => {
	const data_persona = {
		"primer_nombre": "string",
        "segundo_nombre": "string",
        "apellidos": "string",
        "fecha_nacimiento": "2025-04-14",
        "genero": "MASCULINO",
        "correo": "user@example.com",
        "celular": "string",
        "nro_documento": "string",
        "tipo_documento": "TARJETA_DE_IDENTIDAD"
	}
	fetchMock.mockResponseOnce(JSON.stringify({
		"id":0,
		...data_persona
	}))
	await createPersona(data_persona)
	fetchMock.mockResponseOnce(JSON.stringify({ // mock para la respuesta de deletePersona
		"id":0,
		...data_persona
	}));
	const response = await deletePersona(0, data_persona);
	expect(response).toEqual({
		"id":0,
		...data_persona
	})
	expect(fetch).toHaveBeenCalledWith(
		'http://localhost:8000/api/v1/personas/0',
		{
		  method: 'DELETE',
		  headers: {
			'Content-Type': 'application/json'
		  },
		  body: JSON.stringify(data_persona)
		}
	  )
})

test('elimina persona error', async () => {
	fetchMock.mockResponseOnce('Error', { status: 500 })
	await expect(deletePersona({})).rejects.toThrow('Error eliminando persona')
})