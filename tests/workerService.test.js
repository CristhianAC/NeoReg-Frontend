const { fetchWorkers, fetchWorker } = require('../src/workerService')

test('fetch workers', async () => {
    const mock_workers = [
        {
            primer_nombre: "string",
            segundo_nombre: "string",
            apellidos: "string",
            fecha_nacimiento: "2025-04-17",
            genero: "MASCULINO",
            correo: "string",
            celular: "string",
            nro_documento: "string",
            tipo_documento: "TARJETA_DE_IDENTIDAD",
            id: 0
        }
    ]
    fetchMock.mockResponseOnce(JSON.stringify(mock_workers))
    const response = await fetchWorkers()
    expect(response).toEqual(mock_workers)
    expect(fetch).toHaveBeenCalledWith(
        'http://localhost:8000/api/v1/workers/?skip=0&limit=100'
    )
})

test('error fetching workers', async () => {    
    fetchMock.mockResponseOnce('Error', { status: 500 })
    await expect(fetchWorkers()).rejects.toThrow('Error fetching workers')
})

test('fetch workers with params', async () => {
    const mock_workers = [
        {
            primer_nombre: "string",
            segundo_nombre: "string",
            apellidos: "string",
            fecha_nacimiento: "2025-04-17",
            genero: "MASCULINO",
            correo: "string",
            celular: "string",
            nro_documento: "string",
            tipo_documento: "TARJETA_DE_IDENTIDAD",
            id: 0
        }
    ]
    fetchMock.mockResponseOnce(JSON.stringify(mock_workers))
    const response = await fetchWorkers(10, 20)
    expect(response).toEqual(mock_workers)
    expect(fetch).toHaveBeenCalledWith(
        'http://localhost:8000/api/v1/workers/?skip=10&limit=20'
    )
})

test('error fetching workers with params', async () => {    
    fetchMock.mockResponseOnce('Error', { status: 500 })
    await expect(fetchWorkers(10, 20)).rejects.toThrow('Error fetching workers')
})

test('fetch workers with skip', async () => {
    const mock_workers = [
        {
            primer_nombre: "string",
            segundo_nombre: "string",
            apellidos: "string",
            fecha_nacimiento: "2025-04-17",
            genero: "MASCULINO",
            correo: "string",
            celular: "string",
            nro_documento: "string",
            tipo_documento: "TARJETA_DE_IDENTIDAD",
            id: 0
        }
    ]
    fetchMock.mockResponseOnce(JSON.stringify(mock_workers))
    const response = await fetchWorkers(10)
    expect(response).toEqual(mock_workers)
    expect(fetch).toHaveBeenCalledWith(
        'http://localhost:8000/api/v1/workers/?skip=10&limit=100'
    )
})

test('error fetching workers with skip', async () => {
    fetchMock.mockResponseOnce('Error', { status: 500 })
    await expect(fetchWorkers(10)).rejects.toThrow('Error fetching workers')
})

test('fetch workers with limit', async () => {
    const mock_workers = [
        {
            primer_nombre: "string",
            segundo_nombre: "string",
            apellidos: "string",
            fecha_nacimiento: "2025-04-17",
            genero: "MASCULINO",
            correo: "string",
            celular: "string",
            nro_documento: "string",
            tipo_documento: "TARJETA_DE_IDENTIDAD",
            id: 0
        }
    ]
    fetchMock.mockResponseOnce(JSON.stringify(mock_workers))
    const response = await fetchWorkers(0, 10)
    expect(response).toEqual(mock_workers)
    expect(fetch).toHaveBeenCalledWith(
        'http://localhost:8000/api/v1/workers/?skip=0&limit=10'
    )
})

test('error fetching workers with limit', async () => {
    fetchMock.mockResponseOnce('Error', { status: 500 })
    await expect(fetchWorkers(0, 10)).rejects.toThrow('Error fetching workers')
})

test('fetch worker', async () => {
    const mock_worker = {
        primer_nombre: "string",
        segundo_nombre: "string",
        apellidos: "string",
        fecha_nacimiento: "2025-04-17",
        genero: "MASCULINO",
        correo: "string",
        celular: "string",
        nro_documento: "string",
        tipo_documento: "TARJETA_DE_IDENTIDAD",
        id: 0
    }
    fetchMock.mockResponseOnce(JSON.stringify(mock_worker))
    const response = await fetchWorker(0)
    expect(response).toEqual(mock_worker)
    expect(fetch).toHaveBeenCalledWith(
        'http://localhost:8000/api/v1/workers/0'
    )
})

test('error fetching worker', async () => {
    fetchMock.mockResponseOnce('Error', { status: 500 })
    await expect(fetchWorker(0)).rejects.toThrow('Error fetching worker')
})

test('error fetching worker with invalid id', async () => {
    fetchMock.mockResponseOnce('Error', { status: 500 })
    await expect(fetchWorker('invalid_id')).rejects.toThrow('Error fetching worker')
})

test('error fetching worker with negative id', async () => {
    fetchMock.mockResponseOnce('Error', { status: 500 })
    await expect(fetchWorker(-1)).rejects.toThrow('Error fetching worker')
})