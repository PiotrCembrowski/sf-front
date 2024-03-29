export async function fetchLists() {
    const response = await fetch('http://127.0.0.1:5000/fileslists',{
        method: 'GET',
        credentials: 'include',
    });

    if (!response.ok) {
        const error = new Error('An error occured while fetching the events.');
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const { lists } = await response.json();

    return lists;
}