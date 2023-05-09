import studentData from "../data.js"
import { studentDataFromLocalStorage } from "../utils.js"
import { render } from "../index.js"

const addStudent = document.getElementById("add-student")
const addStudentForm = document.getElementById("add-student-form")
const gridOptions = document.getElementById("grid-options")
let openenedSettings = null

//Event Listeners
document.getElementById("open-add-student-form-btn").addEventListener("click", openAddStudentForm)
document.getElementById("close-add-student-form-btn").addEventListener("click", closeAddStudentForm)
document.getElementById("open-grid-options-btn").addEventListener("click", openOptions)
document.getElementById("close-grid-options-btn").addEventListener("click", closeOptions)

document.getElementById("remove-all-students").addEventListener("click", removeAllStudents)
document.getElementById("reset-points").addEventListener("click", resetStudentPoints)
document.getElementById("order-students").addEventListener("click", sortStudentsAlphabetically)

addStudentForm.addEventListener("submit", handleAddStudent)

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

function removeAllStudents() {
    //TODO: Figure out why this has to be re-declared here!
    let studentDataFromLocalStorage = JSON.parse(localStorage.getItem("studentData")) || studentData
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

// Allows user to click avatar to change it.
function handleAvatarClick(avatarId) {
    const targetStudentObj = studentDataFromLocalStorage.filter((student) => {
        return student.uuid === avatarId;
    })[0]

    if (!targetStudentObj.avatarIndex) {
        targetStudentObj.avatarIndex = 0;
    }

    const avatarIconArr = ["images/sorting-hat.png","images/harry-potter.png","images/hermione.png","images/draco-malfoy.png","images/lord-voldemort.png", "images/ron-weasley.png", "images/albus-dumbledore.png", "images/minerva-mcgonagall.png", "images/dobby.png"]
    targetStudentObj.avatarIndex = (targetStudentObj.avatarIndex + 1) % avatarIconArr.length;
    targetStudentObj.avatar = avatarIconArr[targetStudentObj.avatarIndex];

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
    const className = document.getElementById("class-name")
    const existingStudent = studentDataFromLocalStorage.find(student => student.name === name.value)

    if (existingStudent) {
        alert("A student with the same name already exists!")
        addStudentForm.reset()
        return
    }
        
    const newStudent = {
        name: name.value,
        dob: dob.value,
        className: className.value,
        points: 0,
        avatar: ["images/sorting-hat.png"],
        uuid: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    }

    studentDataFromLocalStorage.push(newStudent)
    localStorage.setItem("studentData", JSON.stringify(studentDataFromLocalStorage))
    render()
    addStudentForm.reset()

    addStudentForm.addEventListener("submit", handleAddStudent)
}

function getSettingsHtml(targetStudentObj) {
    // If a settings container is already open, close it before opening a new one
    if(openenedSettings !==null) {
        openenedSettings.classList.add("display-none")
    }

   // Creates the settings container
   const settingsContainer = document.createElement("div")
   settingsContainer.classList.add("settings-container")
   
   // Creates the remove student button inside the settings container
   const removeStudentBtn = document.createElement("button")
   removeStudentBtn.classList.add("removeStudentBtn")
   removeStudentBtn.innerText = `Remove ${targetStudentObj.name}`

    // Creates the button to close the settings container
   const closeBtn = document.createElement("button")
   closeBtn.classList.add("close-btn")
   closeBtn.classList.add("close-settings-btn")
   closeBtn.classList.add("material-symbols-outlined")
   closeBtn.innerText = "close"

   closeBtn.onclick = () => {
        settingsContainer.classList.add("display-none")
   }

   removeStudentBtn.onclick = () => {
        removeStudentFromData(targetStudentObj);
        settingsContainer.style.display = "none" // Hide the settings container after removing the student
        location.reload() // Reloads the page after student is removed to update studentData
        render()
   }
 
    settingsContainer.appendChild(removeStudentBtn)
    settingsContainer.appendChild(closeBtn)

    // Set the currently open settings container to the new one
    openenedSettings = settingsContainer
    document.body.appendChild(settingsContainer)
}

function removeStudentFromData(targetStudentObj) {
    const index = studentDataFromLocalStorage.indexOf(targetStudentObj)
    studentDataFromLocalStorage.splice(index, 1)
    localStorage.setItem("studentData", JSON.stringify(studentDataFromLocalStorage))
}

function removeStudent(removeId) {
    const targetStudentObj = studentDataFromLocalStorage.find((student) => {
        return student.uuid === removeId
    })

    getSettingsHtml(targetStudentObj);
}

// Displays grid
function getGridHtml() {
    let pointsGridHtml = "" 
    const updatedStudentData = studentDataFromLocalStorage

    if (updatedStudentData.length === 0) { 
        pointsGridHtml = `
        <div class="default-grid">
            <h2 class="default-grid-message"> Add your students!</h2>
            <button class="default-grid-add-student-btn" id="add-student-btn">Add students</button>
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
            <button class="settings-btn material-symbols-outlined" data-remove="${student.uuid}" aria-label="Settings">settings</button>
        </div>`  
    })
    return pointsGridHtml
}

export { openAddStudentForm, handleAvatarClick, handlePointsClick, removeStudent, getGridHtml}