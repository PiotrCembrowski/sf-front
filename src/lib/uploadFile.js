export async function uploadFile(attachment){
    console.log(attachment)
    const response = await fetch('http://127.0.0.1:8080/files/upload', {
        method: 'POST',
        body: attachment.target.files[0],
        credentials: "include"
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