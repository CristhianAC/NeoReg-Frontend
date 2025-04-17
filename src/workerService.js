const { API_base } = require('./config');

async function fetchWorkers(skip = 0, limit = 100) {
    const res = await fetch(`${API_base}/workers/?skip=${skip}&limit=${limit}`);
    if(!res.ok) {
        throw new Error('Error fetching workers');
    }
    return res.json();
}

async function fetchWorker(id) {
    const res = await fetch(`${API_base}/workers/${id}`);
    if(!res.ok) {
        throw new Error('Error fetching worker');
    }
    return res.json();
}

module.exports = { fetchWorkers, fetchWorker };