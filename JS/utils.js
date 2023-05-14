import studentData from "./data.js"
let studentDataFromLocalStorage = JSON.parse(localStorage.getItem("studentData")) || studentData
const toggleHamburger = document.getElementById("hamburger-btn")
const modal = document.querySelectorAll("[data-modal]")

toggleHamburger.addEventListener("click", () => {
  const navList = document.getElementById("nav-list")
  navList.classList.toggle("active")
  toggleHamburger.classList.toggle("active")
})

// Outside click to close modals
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


