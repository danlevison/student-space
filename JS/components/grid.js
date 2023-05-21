import { studentDataFromLocalStorage } from "../utils.js"
import { render } from "../index.js"

const addStudent = document.getElementById("add-student")
const addStudentForm = document.getElementById("add-student-form")
const gridOptions = document.getElementById("grid-options")
const setClassModal = document.getElementById("set-class-modal")
const studentSettingsModal = document.getElementById("student-settings-modal")
const removeStudentBtn = document.getElementById("removeStudentBtn")

//Event Listeners
document.getElementById("open-add-student-form-btn").addEventListener("click", openAddStudentForm)
document.getElementById("close-add-student-form-btn").addEventListener("click", closeAddStudentForm)
document.getElementById("open-grid-options-btn").addEventListener("click", openOptions)
document.getElementById("close-grid-options-btn").addEventListener("click", closeOptions)
document.getElementById("close-set-class-btn").addEventListener("click", closeSetClassName)
document.getElementById("close-student-settings-btn").addEventListener("click", closeStudentSettings)

document.getElementById("remove-all-students").addEventListener("click", removeAllStudents)
document.getElementById("reset-points").addEventListener("click", resetStudentPoints)
document.getElementById("order-students").addEventListener("click", sortStudentsAlphabetically)

addStudentForm.addEventListener("submit", handleAddStudent)
removeStudentBtn.addEventListener("click", handleRemoveStudent)

function openOptions() {
    gridOptions.showModal()
}

function closeOptions() {
    gridOptions.close()
}

function openAddStudentForm() {
    if (!addStudent.hasAttribute("open")) {
        addStudent.showModal() 
    }
    document.getElementById("name").focus()
}

function closeAddStudentForm() {
    addStudent.close()
}

function openSetClassName() {
    setClassModal.showModal()    
    document.getElementById("class-name-input").focus()
}

function closeSetClassName() {
    setClassModal.close()
}

function openStudentSettings() {
    studentSettingsModal.showModal()
}

function closeStudentSettings() {
    studentSettingsModal.close()
}

function removeAllStudents() {
    //TODO: Figure out why this has to be re-declared here!
    let studentDataFromLocalStorage = JSON.parse(localStorage.getItem("studentData")) || []
    studentDataFromLocalStorage = []
    localStorage.setItem("studentData", JSON.stringify(studentDataFromLocalStorage))
    location.reload()
}

function resetStudentPoints() {
    studentDataFromLocalStorage.forEach(student => {
        student.points = 0
    })
    render()
    localStorage.setItem("studentData", JSON.stringify(studentDataFromLocalStorage))
    closeOptions()
}

function sortStudentsAlphabetically() {
    studentDataFromLocalStorage.sort((a, b) => a.name.localeCompare(b.name))
    render()
    localStorage.setItem("studentData", JSON.stringify(studentDataFromLocalStorage))
    closeOptions()
}

function handleRemoveStudent() {
    const targetStudentId = removeStudentBtn.getAttribute("data-student-id")

    // Filter for the target student object with the passed-in ID
    const targetStudentObj = studentDataFromLocalStorage.find((student) => {
        return student.uuid === targetStudentId
    })

    if (targetStudentObj) {
        // Remove the target student object from the array
        const index = studentDataFromLocalStorage.indexOf(targetStudentObj)
        if (index > -1) {
            studentDataFromLocalStorage.splice(index, 1)

            // Update local storage with the new array without the target student object
            localStorage.setItem("studentData", JSON.stringify(studentDataFromLocalStorage))
            location.reload()
        }
    }
}

// Remove a student based on their ID
function removeStudent(removeId) {
    // Filter for the target student object with the passed-in ID
    const targetStudentObj = studentDataFromLocalStorage.find((student) => {
        return student.uuid === removeId
    })

    removeStudentBtn.innerHTML = `Remove ${targetStudentObj.name}`
    removeStudentBtn.setAttribute("data-student-id", removeId)
}

// Allows user to click avatar to change it.
function handleAvatarClick(avatarId) {
    const targetStudentObj = studentDataFromLocalStorage.filter((student) => {
        return student.uuid === avatarId
    })[0]

    if (!targetStudentObj.avatarIndex) {
        targetStudentObj.avatarIndex = 0
    }

    const avatarIconArr = ["images/sorting-hat.png","images/harry-potter.png","images/hermione.png","images/draco-malfoy.png","images/lord-voldemort.png", "images/ron-weasley.png", "images/albus-dumbledore.png", "images/minerva-mcgonagall.png", "images/dobby.png"]
    targetStudentObj.avatarIndex = (targetStudentObj.avatarIndex + 1) % avatarIconArr.length
    targetStudentObj.avatar = avatarIconArr[targetStudentObj.avatarIndex]

    localStorage.setItem("studentData", JSON.stringify(studentDataFromLocalStorage))

    render()
}

// Increments points when icon is clicked
function handlePointsClick(pointsId) {
    const targetStudentObj = studentDataFromLocalStorage.filter((student) => {
        return student.uuid === pointsId
    })[0]
    targetStudentObj.points++
    const pointsAudio = new Audio("./audio/points.mp3")
    pointsAudio.play() 

    if (targetStudentObj.points === 51) {
        targetStudentObj.points = 0
    }
    
    localStorage.setItem("studentData", JSON.stringify(studentDataFromLocalStorage))

    render()
}

// Adds a new student through a form submit
function handleAddStudent(e) {
    if(studentDataFromLocalStorage.length > 0) {
        e.preventDefault()
    }

    const name = document.getElementById("name")
    const dob = document.getElementById("dob")
    const existingStudent = studentDataFromLocalStorage.find(student => student.name === name.value)

    if (existingStudent) {
        alert("A student with the same name already exists!")
        addStudentForm.reset()
        return
    }
        
    const newStudent = {
        name: name.value,
        dob: dob.value,
        points: 0,
        avatar: ["images/sorting-hat.png"],
        uuid: crypto.randomUUID()
    }

    studentDataFromLocalStorage.push(newStudent)
    localStorage.setItem("studentData", JSON.stringify(studentDataFromLocalStorage))
    render()
    addStudentForm.reset()

    addStudentForm.addEventListener("submit", handleAddStudent)
}

// Displays grid
function getGridHtml() {
    let pointsGridHtml = "" 
    const updatedStudentData = studentDataFromLocalStorage

    if (updatedStudentData.length === 0) { 
        pointsGridHtml = `
        <div class="default-grid">
            <h2 class="default-grid-message">Get Started!</h2>
            <div class="default-grid-btn-container">
                <button class="default-grid-set-class-btn" id="set-class-btn">Set class name</button>
                <button class="default-grid-add-student-btn" id="add-student-btn">Add students</button>
            </div>
        </div>`
        return pointsGridHtml
    }

    updatedStudentData.forEach((student) => {
        pointsGridHtml += `
        <div data-student="${student.uuid}" class="student-div">
            <h2 class="student-name">${student.name}</h2> 
            <div class="student-avatar">
                <img src="${student.avatar}" class="student-avatar-img" data-avatar="${student.uuid}" alt="Student avatar" aria-label="Student avatar">
            </div>
            <button class="fa-solid fa-award points-icon-btn" data-point="${student.uuid}" aria-label="Award points"></button>
            <p id="student-points" class="student-points">${student.points}</p>
            <button id="settings-btn" class="settings-btn material-symbols-outlined" data-settings="${student.uuid}" aria-label="Settings">settings</button>
        </div>`  
    })
    return pointsGridHtml
}

export { openSetClassName, openAddStudentForm, openStudentSettings, removeStudent, handleAvatarClick, handlePointsClick, getGridHtml}