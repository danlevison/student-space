import studentData from "../data.js"

const toggleHamburger = document.getElementById("hamburger-btn")

toggleHamburger.addEventListener("click", () => {
    const navList = document.getElementById("nav-list")
    navList.classList.toggle("active")
    toggleHamburger.classList.toggle("active")
})

// sets greeting message depending on hour of day
function setGreetingHtml() {
    let greeting = ""
    const currentTime = new Date().getHours()
    studentData.forEach((student) => {
        if(currentTime < 12) {
            greeting = `Good morning, ${student.className}!`
        } else {
            greeting = `Good afternoon, ${student.className}!`
        }
    })
    document.getElementById("greeting-message").innerHTML = greeting

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

    studentData.forEach(function(student) {
        const birthday = new Date(student.dob.split(".").reverse())
        const birthMonth = birthday.getMonth() + 1 
        const birthDate = birthday.getDate()
        
        if(currentMonth === birthMonth && date === birthDate) { 
            bdayMsg.innerHTML += `Happy Birthday ${student.name}! `
            bdayMsg.style.display = "block"
            student.avatar = "../images/bdayAvatar.png" //TODO: fix avatar not showing + update to better bday avatar
        }
    })
}

export { setGreetingHtml, displayDate, getBdayHtml}