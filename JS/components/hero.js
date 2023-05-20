import { studentDataFromLocalStorage } from "../utils.js"

let greeting = ""
const greetingMessage = document.getElementById("greeting-message")
const currentTime = new Date().getHours()
const classNameInput = document.getElementById("class-name-input")
const savedClassName = JSON.parse(localStorage.getItem("className"))

document.getElementById("set-class-name-btn").addEventListener("click", setGreetingHtml)

// Update the greeting message when the page loads
document.addEventListener("DOMContentLoaded", () => {
    if (savedClassName) {
        if (currentTime < 12) {
            greeting = `Good morning, ${savedClassName}!`
        } else {
            greeting = `Good afternoon, ${savedClassName}!`
        }
    } else {
        greeting = "Welcome!"
    }
    
    greetingMessage.innerHTML = greeting;
})

// Update the greeting message and save the class name when the button is clicked
function setGreetingHtml(e) {
    e.preventDefault()
    const className = classNameInput.value

    if (className) {
        if (currentTime < 12) {
            greeting = `Good morning, ${className}!`
        } else {
            greeting = `Good afternoon, ${className}!`
        }
        
        localStorage.setItem("className", JSON.stringify(className))
    } else {
        greeting = "Welcome!"
    }
    
    greetingMessage.innerHTML = greeting
    document.getElementById("set-class-modal").close()
    
}

function displayDate() {
    const currentDate = new Date()
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    }
    const fullDate = currentDate.toLocaleDateString("en-us", options)
    document.getElementById("display-date").innerHTML = fullDate
}

function getBdayHtml() {
    const bdayMsg = document.getElementById("bday-msg")
    const todayDate = new Date()
    const currentMonth = todayDate.getMonth() + 1 // months are 0 based e.g Jan = 0 so have to + 1
    const date = todayDate.getDate()

    studentDataFromLocalStorage.forEach(function(student) {
        const birthday = new Date(student.dob.split(".").reverse())
        const birthMonth = birthday.getMonth() + 1 
        const birthDate = birthday.getDate()
        
        if(currentMonth === birthMonth && date === birthDate) { 
            bdayMsg.innerHTML += `Happy Birthday, ${student.name}! 🎂 `
            bdayMsg.style.display = "block"
        }
    })
}
getBdayHtml()

export { setGreetingHtml, displayDate }