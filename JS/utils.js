import studentData from "./data.js"
let studentDataFromLocalStorage = JSON.parse(localStorage.getItem("studentData")) || studentData
const overlay = document.getElementById('overlay');

function showOverlay() {
  overlay.style.display = "block"
  overlay.style.pointerEvents = "auto"
}

function hideOverlay() {
  overlay.style.display = "none"
  overlay.style.pointerEvents = "none"
}

export {studentDataFromLocalStorage, showOverlay, hideOverlay}


