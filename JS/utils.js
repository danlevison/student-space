import studentData from "./data.js"
let studentDataFromLocalStorage = JSON.parse(localStorage.getItem("studentData")) || studentData


export { studentDataFromLocalStorage }


