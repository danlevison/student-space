import studentData from "../data.js"
import { render } from "./index.js"

const studentDataFromLocalStorage = JSON.parse(localStorage.getItem("studentData")) || studentData;

// allows user to click avatar to change it.
function handleAvatarClick(avatarId) {
    const targetStudentObj = studentDataFromLocalStorage.filter((student) => {
        return student.uuid === avatarId;
    })[0];

    if (!targetStudentObj.avatarIndex) {
        targetStudentObj.avatarIndex = 0;
    }

    const avatarIconArr = ["images/icon1.jpg", "images/icon2.jpg", "images/icon3.jpg"];
    targetStudentObj.avatarIndex = (targetStudentObj.avatarIndex + 1) % avatarIconArr.length;
    targetStudentObj.avatar = avatarIconArr[targetStudentObj.avatarIndex];

    localStorage.setItem("studentData", JSON.stringify(studentDataFromLocalStorage))

    render();
}

// increments points when icon is clicked
function handlePointsClick(pointsId) {
    const targetStudentObj = studentDataFromLocalStorage.filter((student) => {
        return student.uuid === pointsId
    })[0]
    targetStudentObj.points++
    const pointsAudio = new Audio("./audio/points.mp3")
    pointsAudio.play() 

    if (targetStudentObj.points === 11) {
        targetStudentObj.points = 0
    }
    
    localStorage.setItem("studentData", JSON.stringify(studentDataFromLocalStorage))

    render()
}

// gets the points system html
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
        </div>`  
    })
    return pointsGridHtml
}

export { handleAvatarClick, handlePointsClick, getStudentHtml}