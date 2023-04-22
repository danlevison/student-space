import studentData from "../data.js"
import { render } from "../index.js"

const addStudentForm = document.getElementById("add-student-form")
const studentDataFromLocalStorage = JSON.parse(localStorage.getItem("studentData")) || studentData;
let openenedSettings = null

//Event Listeners 
document.getElementById("add-student-btn").addEventListener("click", openAddStudentForm)
document.getElementById("close-add-student-form-btn").addEventListener("click", closeAddStudentForm)
addStudentForm.addEventListener("submit", addStudent)

// Functions
function openAddStudentForm() {
    document.getElementById("add-student-form").classList.remove("display-none")
    document.getElementById("points-grid").style.opacity = 0.4

    // Close other tools
    document.getElementById("timer").classList.add("display-none")
    document.getElementById("book-monitor-randomiser").classList.add("display-none")
    document.getElementById("todo-list").classList.remove("open")
    
}

function closeAddStudentForm() {
    document.getElementById("add-student-form").classList.add("display-none")
    document.getElementById("points-grid").style.opacity = 1
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
function addStudent() {
    const name = document.getElementById("name")
    const dob = document.getElementById("dob")
    const className = document.getElementById("class-name")

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
}

// Removes student from studentData //TODO: Consider splitting this function up into html creation and removeStudent
function removeStudent(removeId) {
    const targetStudentObj = studentDataFromLocalStorage.find((student) => {
        return student.uuid === removeId
    })

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
        const index = studentDataFromLocalStorage.indexOf(targetStudentObj)
        studentDataFromLocalStorage.splice(index, 1)
        localStorage.setItem("studentData", JSON.stringify(studentDataFromLocalStorage))
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

// Gets the points system html
function getStudentHtml() {
    let pointsGridHtml = "" 
    const updatedStudentData = studentDataFromLocalStorage

    updatedStudentData.forEach((student) => {
        pointsGridHtml += `
        <div data-student="${student.uuid}" class="student-div">
            ${student.name} 
            <div class="student-avatar">
                <img src="${student.avatar}" class="student-avatar-img" data-avatar="${student.uuid}">
            </div>
            <i class="fa-solid fa-award points-icon-btn" data-point="${student.uuid}"></i>
            <p id="student-points" class="student-points">${student.points}</p>
            <button class="settings-btn material-symbols-outlined" data-remove="${student.uuid}">settings</button>
        </div>`  
    })
    return pointsGridHtml
}

export { handleAvatarClick, handlePointsClick, removeStudent, getStudentHtml}