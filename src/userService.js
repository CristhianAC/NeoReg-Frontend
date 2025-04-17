const { API_base } = require('./config');

async function createPersona(data_persona){
    const res = await fetch(`${API_base}/personas`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data_persona)
    });
    if (!res.ok) {
        throw new Error('Error creando persona');
    }
    return res.json();
}

async function updatePersona(id, data_persona){
    const res = await fetch(`${API_base}/personas/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data_persona)
    });
    if (!res.ok) {
        throw new Error('Error actualizando persona');
    }
    return res.json();
}

async function deletePersona(id, data_persona){
    const res = await fetch(`${API_base}/personas/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data_persona)
    });
    if (!res.ok) {
        throw new Error('Error eliminando persona');
    }
    return res.json();
}

module.exports = { createPersona, updatePersona, deletePersona };