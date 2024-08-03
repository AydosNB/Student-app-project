import { getStudentsData } from "./request.js"

const url = "https://students-data-base.onrender.com/users"
const modalOverlay = document.querySelector("#modal-overlay")
const studentForm = document.querySelector("#student-form")
const userImage = document.querySelector("#user-image")
const submitWrapper = document.querySelector("#submit-wrapper")


export function showAction(id) {
    const actionWrapper = document.querySelectorAll(".action-wrapper")
    actionWrapper.forEach(item => {
        const actionCont = item.querySelector(".action-cont")
        const actionBtn = item.querySelector(".action-btn")
        if (actionCont.dataset.id == id) {
            if (actionCont.classList.contains("flex")) {
                actionCont.classList.add("hidden")
                actionCont.classList.remove("flex")
                actionBtn.innerHTML = "<i class='bx bx-dots-horizontal-rounded'></i>"
            } else {
                actionCont.classList.add("flex")
                actionCont.classList.remove("hidden")
                actionBtn.innerHTML = "<i class='bx bx-x' ></i>"
            }
        } else {
            actionCont.classList.add("hidden")
            actionCont.classList.remove("flex")
            actionBtn.innerHTML = "<i class='bx bx-dots-horizontal-rounded'></i>"
        }
    })
}

function setInputValue(student) {
    studentForm.firstname.value = student.firstname
    studentForm.lastname.value = student.lastname
    studentForm.image.value = student.image
    studentForm.email.value = student.email
    studentForm.phoneNumber.value = student.phoneNumber
}



export function showModal(id) {
    if (id) {
        console.log(id)
        fetch(`${url}/${id}`).then(res => res.json()).then(data => {
            setInputValue(data)
            userImage.setAttribute("src", studentForm.image.value)
        })
        const updateSendBtn = document.createElement("div")
        submitWrapper.innerHTML = ""
        updateSendBtn.innerHTML = `
        <button type="button"
            id="send-update"
            class="py-[4px] px-[10px] bg-blue-500 hover:bg-blue-600 active:scale-95 text-white font-bold text-[16px] rounded-sm">
            Update
        </button>`

        updateSendBtn.addEventListener("click", () => {
            const formData = new FormData(studentForm)
            console.log(formData)
            const data = Object.fromEntries(formData.entries())
            fetch(`${url}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(res => getStudentsData(url)).catch(err => console.log(err))
            closeModal()
        })
        submitWrapper.appendChild(updateSendBtn)
    } else {
        submitWrapper.innerHTML = `
        <button type="submit"
            class="py-[4px] px-[10px] bg-blue-500 hover:bg-blue-600 active:scale-95 text-white font-bold text-[16px] rounded-sm">
            + Add student
        </button>
        `
    }
    modalOverlay.classList.add("flex")
    modalOverlay.classList.remove("hidden")
}

export function closeModal() {
    modalOverlay.classList.add("hidden")
    modalOverlay.classList.remove("flex")
    studentForm.reset()
    userImage.setAttribute("src", "https://www.freeiconspng.com/thumbs/person-icon/person-icon-person-icon-17.jpg")
}

modalOverlay.addEventListener("click", (e) => {
    if (e.target.classList.contains("overlay")) {
        closeModal()
    }
})

modalOverlay.querySelector("#modal-close-btn").addEventListener("click", () => {
    closeModal()
})