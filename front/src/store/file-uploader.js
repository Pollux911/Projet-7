//import axios from "axios";

export async function uploadFile(file/*, url*/) {
    let formData = new FormData()
    formData.append('attachement', file.file)

    /*file.status = 'loading'
    let response = await fetch(url, { method: 'POST', body: formData }) //add headers

    file.status = response.ok*/
    for (let value of formData.values()) {
        console.log(value);
    }
    return formData
}

export function uploadFiles(files/*, url*/) {
    return Promise.all(files.map((file) => uploadFile(file/*, url*/)))
}

export default function createUploader(url) {
    return {
        uploadFile: function (file) {
            return uploadFile(file, url)
        },
        uploadFiles: function (files) {
            return uploadFiles(files, url)
        }
    }
}

