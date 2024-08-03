import { renderStudents } from "./render.js"

const url = "http://localhost:3000/users"

export async function getStudentsData(url) {
    try {
        const res = await fetch(url)
        const data = await res.json()
        renderStudents(data)
    } catch (err) {
        console.log(err)
    }
}

export function deleteStudent(id) {
    fetch(`${url}/${id}`, {
        method: 'DELETE',
    })
        .then((response) => response.json())
        .then((result) => {
            console.log('Success:', result);
            getStudentsData(url)
        })
        .catch((error) => {
            console.error('Error:', error);
        })
}