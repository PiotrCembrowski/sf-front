export async function postFile(file) {
    const response = await fetch('https://sf-gsbk.onrender.com/files', {
        method: 'POST',
        body: JSON.stringify(file),
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    if (!response.ok) {
        const error = new Error('An error occured while creating the event');
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const { files } = await response.json();

    return files;
}