import studentData from "../data.js"

let selectedStudents = []
const bookMonitorBtn = document.getElementById("book-monitor-btn")
const bookMonitorResetBtn = document.getElementById("book-monitor-reset-btn")
const studentDataFromLocalStorage = JSON.parse(localStorage.getItem("studentData")) || studentData;
console.log(studentDataFromLocalStorage)

// Event listeners
document.getElementById("open-randomiser-btn").addEventListener("click", openRandomiser)
document.getElementById("close-randomiser-btn").addEventListener("click", closeRandomiser)
bookMonitorBtn.addEventListener("click", getBookMonitorHtml)
bookMonitorResetBtn.addEventListener("click", reset)


window.addEventListener("load", displayRandomStudents)

// Functions
function openRandomiser() {
    document.getElementById("book-monitor-randomiser").classList.remove("display-none")
    document.getElementById("points-grid").style.opacity = 0.4

    // Close other tools
    document.getElementById("timer").classList.add("display-none")
    document.getElementById("todo-list").classList.remove("open")
    document.getElementById("add-student-form").classList.add("display-none")
}

function closeRandomiser() {
    document.getElementById("book-monitor-randomiser").classList.add("display-none")
    document.getElementById("points-grid").style.opacity = 1
}

function getRandomStudent() {
    const studentNameArr = []
    studentDataFromLocalStorage.map((student) => {
        if (!selectedStudents.includes(student.name)) {
            studentNameArr.push(student.name)
        }
    })

    const randomIndex = Math.floor(Math.random() * studentNameArr.length)
    const randomStudent = studentNameArr[randomIndex]
    
    selectedStudents.push(randomStudent)
    if(selectedStudents.length === studentDataFromLocalStorage.length) {
        bookMonitorBtn.style.display = "none"
        bookMonitorResetBtn.style.display = "block"
    }

    return randomStudent
}

function getBookMonitorHtml() {
    const randomStudent1 = getRandomStudent()
    const randomStudent2 = getRandomStudent()

    // Save to local storage
    localStorage.setItem("randomStudent1", randomStudent1)
    localStorage.setItem("randomStudent2", randomStudent2)

    document.getElementById("book-monitor-1").innerHTML = randomStudent1 + " 📚"
    document.getElementById("book-monitor-2").innerHTML = randomStudent2 + " 📚"
}

function displayRandomStudents() {
    const randomStudent1 = localStorage.getItem("randomStudent1")
    const randomStudent2 = localStorage.getItem("randomStudent2")

    if (randomStudent1 && randomStudent2) {
        document.getElementById("book-monitor-1").innerHTML = randomStudent1 + " 📚"
        document.getElementById("book-monitor-2").innerHTML = randomStudent2 + " 📚"
    }
}

function reset () {
    selectedStudents = []
    bookMonitorBtn.style.display = "block"
    bookMonitorResetBtn.style.display = "none"
    document.getElementById("book-monitor-1").innerHTML = "📔"
    document.getElementById("book-monitor-2").innerHTML = "📔"
}


export { openRandomiser, closeRandomiser, getRandomStudent }

