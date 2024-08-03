import { closeModal, showModal } from "./modules/actions.js"
import { getStudentsData } from "./modules/request.js"

const url = "https://students-data-base.onrender.com/users"
const addUserBtn = document.querySelector("#add-user")
const studentForm = document.querySelector("#student-form")
const userImage = document.querySelector("#user-image")
const showImageBtn = document.querySelector("#show-image-btn")

getStudentsData(url)

addUserBtn.addEventListener("click", () => {
    showModal()
})

studentForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data =  Object.fromEntries(formData.entries())
    fetch(url, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(data)
    }).then(res => getStudentsData(url)).catch(err => console.log(err))
    closeModal()
})

showImageBtn.addEventListener("click", () => {
    userImage.setAttribute("src", studentForm.image.value)
})