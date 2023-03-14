import studentData from "../data.js"

let selectedStudents = []
const bookMonitorBtn = document.getElementById("book-monitor-btn")
const bookMonitorResetBtn = document.getElementById("book-monitor-reset-btn")

// Event listeners
document.getElementById("open-randomiser-btn").addEventListener("click", openRandomiser)
document.getElementById("close-randomiser-btn").addEventListener("click", closeRandomiser)
bookMonitorBtn.addEventListener("click", getBookMonitorHtml)
bookMonitorResetBtn.addEventListener("click", reset)

// Functions
function openRandomiser() {
    document.getElementById("book-monitor-randomiser").classList.remove("display-none")
    document.getElementById("points-grid").style.opacity = 0.6
}

function closeRandomiser() {
    document.getElementById("book-monitor-randomiser").classList.add("display-none")
    document.getElementById("points-grid").style.opacity = 1
}

function getRandomStudent() {
    console.log("clicked")
    const studentNameArr = []
    studentData.map((student) => {
        if (!selectedStudents.includes(student.name)) {
            studentNameArr.push(student.name)
        }
    })

    const randomIndex = Math.floor(Math.random() * studentNameArr.length)
    const randomStudent = studentNameArr[randomIndex]
    
    selectedStudents.push(randomStudent)
    if(selectedStudents.length === 30) {
        bookMonitorBtn.style.display = "none"
        bookMonitorResetBtn.style.display = "block"
    }

    return randomStudent
}

function getBookMonitorHtml() {
    document.getElementById("book-monitor-1").innerHTML = getRandomStudent() + " 📚"
    document.getElementById("book-monitor-2").innerHTML = getRandomStudent() + " 📚"
}

function reset () {
    selectedStudents = []
    bookMonitorBtn.style.display = "block"
    bookMonitorResetBtn.style.display = "none"
    document.getElementById("book-monitor-1").innerHTML = "📔"
    document.getElementById("book-monitor-2").innerHTML = "📔"
}

export { openRandomiser, closeRandomiser, getRandomStudent }

