import studentData from "../data.js"
import { studentDataFromLocalStorage } from "../utils.js"

// Create an empty array to store selected students
let selectedStudents = []
const randomiser = document.getElementById("book-monitor-randomiser")
const bookMonitorBtn = document.getElementById("book-monitor-btn")
const bookMonitorResetBtn = document.getElementById("book-monitor-reset-btn")

// Event listeners
document.getElementById("open-randomiser-btn").addEventListener("click", openRandomiser)
document.getElementById("close-randomiser-btn").addEventListener("click", closeRandomiser)
bookMonitorBtn.addEventListener("click", getBookMonitorHtml)
bookMonitorResetBtn.addEventListener("click", reset)

window.addEventListener("load", displayRandomStudents)

// Functions

function openRandomiser() {
    randomiser.showModal()
}

function closeRandomiser() {
    randomiser.close()
}

// Function to get a random student from the list of students
function getRandomStudent() {
    const studentNameArr = []
    // Loop through each student in the list
    studentDataFromLocalStorage.map((student) => {
        // If the student has not already been selected, add their name to the studentNameArr
        if (!selectedStudents.includes(student.name)) {
            studentNameArr.push(student.name)
        }
    })

    // If there are no more unselected students, return an empty string
    if (studentNameArr.length === 0) {
        return ""
    }

    // Get a random index within the range of unselected students
    const randomIndex = Math.floor(Math.random() * studentNameArr.length)
    // Get the name of the random student
    const randomStudent = studentNameArr[randomIndex]
    
    // Add the selected student to the array of selected students
    selectedStudents.push(randomStudent)
 
    // If all students have been selected, hide the book monitor button and show the reset button
    if(selectedStudents.length  === studentDataFromLocalStorage.length) {
        bookMonitorBtn.style.display = "none"
        bookMonitorResetBtn.style.display = "block"
    }

    // Return the name of the random student
    return randomStudent
}

// Function to display the book monitor with two random students
function getBookMonitorHtml() {
    // Get two random students
    const randomStudent1 = getRandomStudent()
    const randomStudent2 = getRandomStudent()

    // Save the two random students to local storage
    localStorage.setItem("randomStudent1", randomStudent1)
    localStorage.setItem("randomStudent2", randomStudent2)

    // Display the two random students in the book monitor
    document.getElementById("book-monitor-1").innerHTML = randomStudent1
    document.getElementById("book-monitor-2").innerHTML = randomStudent2
}

// Function to display the two random students saved in local storage
function displayRandomStudents() {
    const randomStudent1 = localStorage.getItem("randomStudent1")
    const randomStudent2 = localStorage.getItem("randomStudent2")

    // If there are two random students saved in local storage, display them in the book monitor
    if (randomStudent1 && randomStudent2) {
        document.getElementById("book-monitor-1").innerHTML = randomStudent1
        document.getElementById("book-monitor-2").innerHTML = randomStudent2
    }
}

// Reset function that clears the array of selected students and sets the display of the book monitor buttons and text back to their initial state
function reset() {
    selectedStudents = [] // Clear the array of selected students
    bookMonitorBtn.style.display = "block" 
    bookMonitorResetBtn.style.display = "none"
    document.getElementById("book-monitor-1").innerHTML = "📔" 
    document.getElementById("book-monitor-2").innerHTML = "📔"
  }

export { openRandomiser, closeRandomiser, getRandomStudent }


