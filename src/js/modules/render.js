import {showAction, showModal} from "./actions.js"
import { deleteStudent } from "./request.js";
const studentContent = document.querySelector("#student-content")

export function renderStudents(array) {
    studentContent.innerHTML = ""
    array.forEach((student, index) => {
        const studentEl = document.createElement("tr")
        studentEl.innerHTML = `
            <td>${index + 1}</td>
            <td>
                <div class="flex justify-start items-center gap-1">
                    <div>
                        <img class="min-w-[35px] max-w-[35px] min-h-[35px] max-h-[35px] md:min-w-[40px] md:max-w-[40px] md:min-h-[40px] md:max-h-[40px] border-[2px] p-[2px] border-blue-400 rounded-full object-cover" src="${student.image}" alt="">
                    </div>
                    <div class="flex flex-col lg:flex-row gap-1">
                        <span>${student.firstname}</span>
                        <span>${student.lastname}</span>
                    </div>
                </div>
            </td>
            <td>
                ${student.email}
            </td>
            <td>
                +${student.phoneNumber}
            </td>
            <td>
                <div class="action-wrapper relative flex justify-center items-center">
                    <button class="action-btn text-[20px] w-[30px] h-[30px] md:w-[35px] md:h-[35px] bg-gray-50 border-[1px] rounded-full shadow-sm flex justify-center items-center hover:bg-gray-100 active:scale-95">
                        <i class='bx bx-dots-horizontal-rounded'></i>
                    </button>
                    <div data-id="${student.id}" class="action-cont hidden absolute bottom-[0] z-10 translate-y-[100%] flex-col bg-white p-[5px] rounded-sm border-[1px] justify-center items-center gap-1">
                        <button class="update-btn py-[5px] w-full px-[10px] flex justify-start items-center gap-1 rounded-sm bg-blue-500 hover:bg-blue-600 active:scale-95 text-white font-semibold">
                            <i class='bx bxs-edit-alt' ></i>
                            <span>Edit</span>
                        </button>
                        <button class="delete-btn py-[5px] w-full flex justify-start items-center gap-1 px-[10px] rounded-sm bg-red-500 hover:bg-red-600 active:scale-95 text-white font-semibold">
                            <i class='bx bxs-trash' ></i>
                            <span>Delete</span>
                        </button>
                    </div>
                </div>
            </td>
        `
        const actionBtn = studentEl.querySelector(".action-btn")
        const deleteBtn = studentEl.querySelector(".delete-btn")
        const updateBnt = studentEl.querySelector(".update-btn")
        actionBtn.addEventListener("click", () => showAction(student.id))
        deleteBtn.addEventListener("click", () => deleteStudent(student.id))
        updateBnt.addEventListener("click", () => {showModal(student.id)})
        studentContent.appendChild(studentEl)
    });
}