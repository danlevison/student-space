import studentData from "./data.js"
let studentDataFromLocalStorage = JSON.parse(localStorage.getItem("studentData")) || studentData
const modal = document.querySelectorAll("[data-modal]")

modal.forEach((modal) => {
    modal.addEventListener("click", e => {
        const dialogDimensions = modal.getBoundingClientRect()
        if (
          e.clientX < dialogDimensions.left ||
          e.clientX > dialogDimensions.right ||
          e.clientY < dialogDimensions.top ||
          e.clientY > dialogDimensions.bottom
        ) {
          modal.close()
        }
      })
})

export { studentDataFromLocalStorage }


